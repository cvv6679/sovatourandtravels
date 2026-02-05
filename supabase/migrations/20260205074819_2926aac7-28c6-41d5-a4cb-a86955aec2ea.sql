-- Create admin role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Create tours table
CREATE TABLE public.tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    destination TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    start_city TEXT NOT NULL DEFAULT 'Kolkata',
    category TEXT NOT NULL DEFAULT 'Budget',
    best_season TEXT,
    original_price_inr INTEGER NOT NULL,
    discounted_price_inr INTEGER NOT NULL,
    overview TEXT,
    inclusions TEXT[],
    exclusions TEXT[],
    transport TEXT,
    hotel_type TEXT DEFAULT 'Budget',
    hero_image_url TEXT,
    gallery_images TEXT[],
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on tours
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Public can view active tours
CREATE POLICY "Anyone can view active tours"
ON public.tours
FOR SELECT
USING (is_active = true);

-- Admins can manage all tours
CREATE POLICY "Admins can manage tours"
ON public.tours
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create itinerary_days table
CREATE TABLE public.itinerary_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE NOT NULL,
    day_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on itinerary_days
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;

-- Public can view itinerary days for active tours
CREATE POLICY "Anyone can view itinerary days"
ON public.itinerary_days
FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.tours 
    WHERE tours.id = itinerary_days.tour_id 
    AND tours.is_active = true
));

-- Admins can manage itinerary days
CREATE POLICY "Admins can manage itinerary days"
ON public.itinerary_days
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create inquiries table
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    travellers INTEGER,
    preferred_date DATE,
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can create inquiries
CREATE POLICY "Anyone can create inquiries"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Admins can view and manage inquiries
CREATE POLICY "Admins can manage inquiries"
ON public.inquiries
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    destination TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view active testimonials
CREATE POLICY "Anyone can view active testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

-- Admins can manage testimonials
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Admins can view subscribers
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger to tours table
CREATE TRIGGER update_tours_updated_at
BEFORE UPDATE ON public.tours
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_tours_slug ON public.tours(slug);
CREATE INDEX idx_tours_destination ON public.tours(destination);
CREATE INDEX idx_tours_featured ON public.tours(is_featured) WHERE is_featured = true;
CREATE INDEX idx_itinerary_days_tour ON public.itinerary_days(tour_id);
CREATE INDEX idx_inquiries_tour ON public.inquiries(tour_id);
CREATE INDEX idx_inquiries_created ON public.inquiries(created_at DESC);