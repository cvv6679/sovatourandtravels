
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  category TEXT,
  author TEXT DEFAULT 'Sova Tours',
  is_published BOOLEAN DEFAULT false,
  publish_date TIMESTAMPTZ DEFAULT now(),
  meta_title TEXT,
  meta_description TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  focus_keyword TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can view published blog posts
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT
USING (is_published = true);

-- Moderators can view all blog posts
CREATE POLICY "Moderators can view blog posts"
ON public.blog_posts FOR SELECT
USING (has_role(auth.uid(), 'moderator'::app_role));

-- Admins can manage blog posts
CREATE POLICY "Super Admin and Admin can manage blog posts"
ON public.blog_posts FOR ALL
USING (is_super_or_admin(auth.uid()))
WITH CHECK (is_super_or_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
