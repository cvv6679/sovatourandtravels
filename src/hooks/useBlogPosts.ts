import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { staticBlogPosts } from "@/lib/blogData";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("is_published", true)
          .order("publish_date", { ascending: false });
        if (error || !data || data.length === 0) {
          return staticBlogPosts;
        }
        // Merge static blog posts with supabase posts
        const existingSlugs = new Set(data.map((p: any) => p.slug));
        const missingStatic = staticBlogPosts.filter(sp => !existingSlugs.has(sp.slug));
        return [...missingStatic, ...data];
      } catch (e) {
        return staticBlogPosts;
      }
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const staticMatch = staticBlogPosts.find(p => p.slug === slug);
      if (staticMatch) {
        return staticMatch;
      }
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();
        if (error) throw error;
        return data || null;
      } catch (e) {
        return null;
      }
    },
    enabled: !!slug,
  });
};
