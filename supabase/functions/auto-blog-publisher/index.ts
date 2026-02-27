// auto-blog-publisher edge function

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400 }
      )
    }

    // 🔐 Create Supabase client (service role internally available)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // 🤖 Call OpenAI
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
Write a 1500+ word SEO optimized travel blog in HTML format.

Topic: ${prompt}

Include:
- H2 headings
- Travel cost breakdown
- Transport info
- Hotels
- FAQ section
- Conclusion

At the end provide:
META_TITLE:
META_DESCRIPTION:
FOCUS_KEYWORD:
EXCERPT:
`
          }
        ],
        temperature: 0.7
      })
    })

    const openaiData = await openaiRes.json()

    const content = openaiData.choices[0].message.content

    // Create slug
    const slug = prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")

    const now = new Date().toISOString()

    // 📝 Insert into blog_posts
    const { error } = await supabase.from("blog_posts").insert({
      title: prompt,
      slug,
      excerpt: `Complete travel guide about ${prompt}`,
      content,
      featured_image_url: "",
      category: "Travel Tips",
      author: "Sova Tours",
      is_published: true,
      publish_date: now,
      meta_title: `${prompt} | Sova Tours`,
      meta_description: `Detailed travel guide about ${prompt}`,
      og_title: `${prompt} | Sova Tours`,
      og_description: `Complete travel guide about ${prompt}`,
      og_image: "",
      focus_keyword: prompt,
      ai_generated: true,
      created_at: now,
      updated_at: now,
    })

    if (error) {
      return new Response(
        JSON.stringify({ error }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    )

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
})
