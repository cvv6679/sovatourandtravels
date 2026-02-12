import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function searchUnsplash(query: string, count = 5): Promise<any[]> {
  const key = Deno.env.get("UNSPLASH_ACCESS_KEY");
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((img: any) => ({
      url: img.urls?.regular || img.urls?.small,
      alt: img.alt_description || query,
      photographer: img.user?.name,
      photographer_url: img.user?.links?.html,
      download_location: img.links?.download_location,
    }));
  } catch {
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Verify admin auth
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
    const { prompt, category, hotel_type, start_city, duration_days, target_price, use_unsplash } = body;

    if (!prompt) throw new Error("Prompt is required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a professional Indian tour package creator for Sova Tour and Travels, based in West Bengal.
Generate a complete tour package JSON based on the user's request.

IMPORTANT RULES:
- Prices must be realistic for the Indian market (budget tours: ₹5000-15000, deluxe: ₹15000-40000, premium: ₹40000+)
- Itinerary must be detailed day-by-day with realistic activities
- Include realistic inclusions/exclusions for Indian tour packages
- Best season must be accurate for the destination
- Transport should mention realistic options (Train, Flight, Private Cab, etc.)

Return ONLY valid JSON with this exact structure:
{
  "title": "string",
  "destination": "string",
  "category": "${category || 'Domestic'}",
  "duration_days": ${duration_days || 5},
  "start_city": "${start_city || 'Kolkata'}",
  "original_price_inr": number,
  "discounted_price_inr": number,
  "best_season": "string",
  "hotel_type": "${hotel_type || 'Budget'}",
  "transport": "string",
  "overview": "string (2-3 paragraphs)",
  "inclusions": ["string array"],
  "exclusions": ["string array"],
  "itinerary": [
    { "day_number": 1, "title": "string", "description": "string (detailed paragraph)" }
  ]
}`;

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
          { role: "user", content: `Create a tour package: ${prompt}${target_price ? `. Target price range around ₹${target_price}` : ""}` },
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
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Extract JSON from potential markdown code blocks
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) content = jsonMatch[1];
    
    const tourDraft = JSON.parse(content.trim());

    // Generate slug
    const baseSlug = tourDraft.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
    // Check slug uniqueness
    const { data: existing } = await supabase.from("tours").select("slug").like("slug", `${baseSlug}%`);
    let slug = baseSlug;
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`;
    }
    tourDraft.slug = slug;

    // Fetch Unsplash images if enabled
    let heroImage = null;
    let galleryImages: any[] = [];
    
    if (use_unsplash !== false) {
      const destination = tourDraft.destination || prompt;
      const [heroResults, galleryResults] = await Promise.all([
        searchUnsplash(`${destination} tourism landscape`, 1),
        searchUnsplash(`${destination} travel India`, 4),
      ]);
      heroImage = heroResults[0] || null;
      galleryImages = galleryResults;
    }

    return new Response(
      JSON.stringify({
        tour: tourDraft,
        images: {
          hero: heroImage,
          gallery: galleryImages,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-tour error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: msg === "Unauthorized" || msg === "Admin access required" ? 403 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
