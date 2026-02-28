import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const apiKey = req.headers.get("x-api-key");
  const expectedKey = Deno.env.get("INTERNAL_API_SECRET");

  if (!apiKey || apiKey !== expectedKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const body = await req.json();
    console.log("Incoming body:", body);

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      is_published,
      publish_date,
      meta_title,
      meta_description,
      og_title,
      og_description,
      focus_keyword,
      image_url,
    } = body;

    const now = new Date().toISOString();
    let uploadedImageUrl: string | null = null;

    // =============================
    // 🔥 IMAGE DOWNLOAD + UPLOAD
    // =============================
    if (image_url) {
      console.log("Image URL received:", image_url);

      const imageResponse = await fetch(image_url, {
        headers: {
          "User-Agent": "SovaToursBot/1.0",
        },
      });

      console.log("Fetch status:", imageResponse.status);

      if (imageResponse.ok) {
        const arrayBuffer = await imageResponse.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        console.log("Image size:", uint8Array.length);

        const fileName = `${slug}-${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage.from("blog-images").upload(fileName, uint8Array, {
          contentType: "image/jpeg",
          upsert: true,
        });

        if (uploadError) {
          console.log("Upload error:", uploadError);
        } else {
          const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);

          uploadedImageUrl = data.publicUrl;
          console.log("Public URL generated:", uploadedImageUrl);
        }
      } else {
        console.log("Image fetch failed.");
      }
    } else {
      console.log("No image_url received.");
    }

    console.log("Final value going to DB:", uploadedImageUrl);

    // =============================
    // 📝 INSERT INTO DATABASE
    // =============================
    const { error } = await supabase.from("blog_posts").insert({
      title,
      slug,
      excerpt,
      content,
      featured_image_url: uploadedImageUrl, // ✅ Correct column
      og_image: uploadedImageUrl,
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
      console.log("DB Insert error:", error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("Function error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
