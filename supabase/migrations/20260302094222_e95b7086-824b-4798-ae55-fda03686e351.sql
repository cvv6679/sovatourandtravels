
-- Create destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  card_image TEXT,
  hero_image TEXT,
  best_time TEXT DEFAULT '',
  ideal_duration TEXT DEFAULT '',
  overview TEXT DEFAULT '',
  top_spots JSONB DEFAULT '[]'::jsonb,
  things_to_do TEXT[] DEFAULT '{}',
  travel_tips TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  content TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Public can view active destinations
CREATE POLICY "Anyone can view active destinations"
ON public.destinations FOR SELECT
USING (is_active = true);

-- Admins can manage
CREATE POLICY "Super Admin and Admin can manage destinations"
ON public.destinations FOR ALL
USING (is_super_or_admin(auth.uid()))
WITH CHECK (is_super_or_admin(auth.uid()));

-- Moderators can view
CREATE POLICY "Moderators can view destinations"
ON public.destinations FOR SELECT
USING (has_role(auth.uid(), 'moderator'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_destinations_updated_at
BEFORE UPDATE ON public.destinations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
