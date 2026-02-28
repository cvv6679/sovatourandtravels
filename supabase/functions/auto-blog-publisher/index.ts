import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const apiKey = req.headers.get("x-api-key");
    const expectedKey = Deno.env.get("INTERNAL_API_SECRET");

    if (!apiKey || apiKey !== expectedKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const body = await req.json();

    const now = new Date().toISOString();

    // 🔥 BULLETPROOF IMAGE EXTRACTION
    const imageUrl = body.featured_image_url || body.featured_image || null;

    const { error } = await supabase.from("blog_posts").insert({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,

      // 🔥 write both columns safely
      featured_image: imageUrl,
      featured_image_url: imageUrl,

      og_image: body.og_image || imageUrl,

      category: body.category,
      author: body.author,
      is_published: body.is_published,
      publish_date: body.publish_date,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      og_title: body.og_title,
      og_description: body.og_description,
      focus_keyword: body.focus_keyword,

      ai_generated: true,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
