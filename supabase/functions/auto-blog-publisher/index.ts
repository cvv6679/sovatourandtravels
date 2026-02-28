import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const apiKey = req.headers.get("x-api-key");
    const expectedKey = Deno.env.get("INTERNAL_API_SECRET");

    if (!apiKey || apiKey !== expectedKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      category,
      author,
      is_published,
      publish_date,
      meta_title,
      meta_description,
      og_title,
      og_description,
      og_image,
      focus_keyword,
    } = body;

    const now = new Date().toISOString();

    const { error } = await supabase.from("blog_posts").insert({
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      og_image,
      category,
      author,
      is_published,
      publish_date,
      meta_title,
      meta_description,
      og_title,
      og_description,
      focus_keyword,
      ai_generated: true,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
