
-- Add ai_generated flag to tours
ALTER TABLE public.tours ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false;

-- Add ai_generated flag and Bengali content to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS content_bn_html text;
