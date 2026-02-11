import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const baseUrl = "https://sovatourandtravels.lovable.app";

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/packages", priority: "0.9", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "daily" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.7", changefreq: "monthly" },
    { url: "/packages?category=domestic", priority: "0.8", changefreq: "weekly" },
    { url: "/packages?category=international", priority: "0.8", changefreq: "weekly" },
    { url: "/packages?category=pilgrimage", priority: "0.8", changefreq: "weekly" },
    { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
    { url: "/refund-policy", priority: "0.3", changefreq: "yearly" },
    { url: "/terms-conditions", priority: "0.3", changefreq: "yearly" },
  ];

  // Fetch tours
  const { data: tours } = await supabase
    .from("tours")
    .select("slug, updated_at")
    .eq("is_active", true);

  // Fetch blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("is_published", true);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  if (tours) {
    for (const tour of tours) {
      xml += `
  <url>
    <loc>${baseUrl}/tour/${tour.slug}</loc>
    <lastmod>${new Date(tour.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }

  if (posts) {
    for (const post of posts) {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml",
    },
  });
});
