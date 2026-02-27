import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function searchUnsplash(query: string): Promise<any | null> {
  const key = Deno.env.get("UNSPLASH_ACCESS_KEY");
  if (!key) return null;
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const img = data.results?.[0];
    if (!img) return null;
    return {
      url: img.urls?.regular || img.urls?.small,
      alt: img.alt_description || query,
      photographer: img.user?.name,
      photographer_url: img.user?.links?.html,
      download_location: img.links?.download_location,
    };
  } catch {
    return null;
  }
}

function cleanAndParseJSON(raw: string): Record<string, any> {
  // Strip markdown code fences if present
  let cleaned = raw.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }
  // Remove any leading/trailing non-JSON characters
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No valid JSON object found in AI response");
  }
  cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  return JSON.parse(cleaned);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Unauthorized");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!roleData || !["admin", "super_admin"].includes(roleData.role)) {
      throw new Error("Admin access required");
    }

    const body = await req.json();
    const { prompt, category, focus_keyword, include_bengali, use_unsplash } = body;

    if (!prompt) throw new Error("Prompt is required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a professional SEO travel blog writer for Sova Tour and Travels, a travel agency based in West Bengal, India.`;

    const userPrompt = `Generate a detailed 1500+ word travel blog about: ${prompt}${focus_keyword ? `\nFocus keyword: ${focus_keyword}` : ""}

Return ONLY valid JSON in this exact format (no explanation, no markdown fences, no backticks outside JSON):

{
  "title": "Blog post title",
  "excerpt": "2-3 sentence plain text summary",
  "html_content": "Full HTML content string",
  ${include_bengali !== false ? '"html_content_bn": "Bengali HTML content string (300-500 words)",' : ""}
  "category": "${category || "Travel Tips"}",
  "meta_title": "Under 60 characters",
  "meta_description": "Under 160 characters",
  "og_title": "Open Graph title",
  "og_description": "Open Graph description",
  "focus_keyword": "${focus_keyword || ""}"
}

STRICT RULES for html_content (and html_content_bn):
- Must contain ONLY clean semantic HTML tags
- Use <h2> for main section headings and <h3> for subsections — NEVER use <h1>
- Every paragraph MUST be wrapped in <p> tags
- Use <ul><li> for bullet lists and <ol><li> for numbered lists
- Use <strong> for bold and <em> for italic
- For any cost/price breakdown, use <table><thead><tr><th></th></tr></thead><tbody><tr><td></td></tr></tbody></table>
- Include a FAQ section at the end with <h2>Frequently Asked Questions</h2> and each question as <h3> followed by <p> answer
- Do NOT output line breaks or newlines as content structure — always use proper HTML block elements
- Do NOT use markdown syntax like **, ##, -, or backticks anywhere inside html_content
- Do NOT include meta labels, JSON keys, or field names inside the html_content
- Do NOT wrap the JSON in markdown code fences`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "AI rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI generation failed");
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Strict JSON parsing with cleanup
    let blogDraft: Record<string, any>;
    try {
      blogDraft = cleanAndParseJSON(rawContent);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw content:", rawContent.substring(0, 500));
      throw new Error("AI returned invalid JSON. Please try again.");
    }

    // Validate required fields
    if (!blogDraft.title || !blogDraft.html_content) {
      throw new Error("AI response missing required fields (title or html_content)");
    }

    // Map html_content to content for database compatibility
    blogDraft.content = blogDraft.html_content;
    delete blogDraft.html_content;

    if (blogDraft.html_content_bn) {
      blogDraft.content_bn_html = blogDraft.html_content_bn;
      delete blogDraft.html_content_bn;
    }

    // Generate unique slug
    const baseSlug = blogDraft.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { data: existing } = await supabase.from("blog_posts").select("slug").like("slug", `${baseSlug}%`);
    let slug = baseSlug;
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`;
    }
    blogDraft.slug = slug;

    // Fetch featured image
    let featuredImage = null;
    if (use_unsplash !== false) {
      featuredImage = await searchUnsplash(focus_keyword || prompt);
    }

    return new Response(
      JSON.stringify({ blog: blogDraft, image: featuredImage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-blog error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: msg === "Unauthorized" || msg === "Admin access required" ? 403 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
