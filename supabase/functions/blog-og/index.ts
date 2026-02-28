import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SITE = "https://sovatourandtravels.com"
const SITE_NAME = "Sova Tour & Travels"
const DEFAULT_IMAGE = `${SITE}/logo.PNG`

serve(async (req) => {
  const url = new URL(req.url)
  const slug = url.searchParams.get("slug")

  if (!slug) {
    return new Response("Missing slug", { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, meta_title, meta_description, og_title, og_description, og_image, featured_image_url, slug, publish_date, author, updated_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (!post) {
    return new Response("Not found", { status: 404 })
  }

  const pageUrl = `${SITE}/blog/${post.slug}`
  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt || post.title
  const ogTitle = post.og_title || post.title
  const ogDescription = post.og_description || post.excerpt || ""
  const image = post.og_image || post.featured_image_url || DEFAULT_IMAGE

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${pageUrl}" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(ogTitle)}" />
<meta property="og:description" content="${escapeHtml(ogDescription)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="article:published_time" content="${post.publish_date || ""}" />
<meta property="article:modified_time" content="${post.updated_at || ""}" />
${post.author ? `<meta property="article:author" content="${escapeHtml(post.author)}" />` : ""}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />

<!-- Redirect humans to the real page -->
<meta http-equiv="refresh" content="0;url=${pageUrl}" />
</head>
<body>
<p>Redirecting to <a href="${pageUrl}">${escapeHtml(post.title)}</a>...</p>
</body>
</html>`

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}
