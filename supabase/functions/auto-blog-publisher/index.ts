import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // Determine prompt source: manual body or queue
    let prompt = ""
    let queueRowId: string | null = null

    try {
      const body = await req.json()
      if (body?.prompt) {
        prompt = body.prompt
      }
    } catch {
      // empty body — scheduled mode
    }

    // If no manual prompt, fetch from blog_prompt_queue
    if (!prompt) {
      const { data: queueRow, error: qErr } = await supabase
        .from("blog_prompt_queue")
        .select("id, prompt")
        .eq("is_used", false)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle()

      if (qErr) {
        return new Response(JSON.stringify({ error: qErr.message }), { status: 500 })
      }

      if (!queueRow) {
        return new Response(JSON.stringify({ message: "No pending prompts" }), { status: 200 })
      }

      prompt = queueRow.prompt
      queueRowId = queueRow.id
    }

    // 1. Generate Structured JSON from OpenAI
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "You are a professional travel SEO content writer."
          },
          {
            role: "user",
            content: `
Generate a detailed 1500+ word travel blog.

Return ONLY valid JSON in this format:

{
  "title": "",
  "excerpt": "",
  "meta_title": "",
  "meta_description": "",
  "focus_keyword": "",
  "html_content": ""
}

Rules:
- html_content must contain clean HTML only
- Use proper <h2>, <h3>, <p>, <ul>, <table>
- Include a proper cost breakdown table
- Do NOT include META labels inside html_content
- No markdown
- No code blocks
- No backticks
- Clean readable formatting

Topic: ${prompt}
`
          }
        ]
      })
    })

    const aiData = await aiRes.json()
    let raw = aiData.choices?.[0]?.message?.content

    if (!raw) {
      return new Response(JSON.stringify({ error: "AI generation failed" }), { status: 500 })
    }

    raw = raw.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(raw)

    const { title, excerpt, meta_title, meta_description, focus_keyword, html_content } = parsed

    // 2. Fetch Featured Image from Unsplash
    let featuredImage = ""
    try {
      const imageRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`,
        { headers: { "Authorization": `Client-ID ${Deno.env.get("UNSPLASH_ACCESS_KEY")}` } }
      )
      const imageData = await imageRes.json()
      featuredImage = imageData.results?.[0]?.urls?.regular || ""
    } catch {
      featuredImage = ""
    }

    // 3. Generate Slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)

    const now = new Date().toISOString()

    // 4. Insert Into blog_posts
    const { error } = await supabase.from("blog_posts").insert({
      title, slug, excerpt,
      content: html_content,
      featured_image_url: featuredImage,
      category: "Travel Tips",
      author: "Sova Tours",
      is_published: true,
      publish_date: now,
      meta_title, meta_description,
      og_title: meta_title,
      og_description: meta_description,
      og_image: featuredImage,
      focus_keyword,
      ai_generated: true,
      created_at: now,
      updated_at: now
    })

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    // 5. Mark queue row as used if from scheduled mode
    if (queueRowId) {
      await supabase
        .from("blog_prompt_queue")
        .update({ is_used: true })
        .eq("id", queueRowId)
    }

    return new Response(JSON.stringify({ success: true, source: queueRowId ? "queue" : "manual" }), { status: 200 })

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 })
  }
})
