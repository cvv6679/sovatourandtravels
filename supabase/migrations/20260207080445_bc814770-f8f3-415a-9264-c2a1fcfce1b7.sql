-- Migration 2: Update functions and policies

-- Drop existing policies that use the old enum
DROP POLICY IF EXISTS "Admins can manage inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can manage itinerary days" ON public.itinerary_days;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage tours" ON public.tours;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can view itinerary days" ON public.itinerary_days;
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can view active tours" ON public.tours;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Drop and recreate the has_role function
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
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

-- Create a function to check if user is super_admin or admin
CREATE OR REPLACE FUNCTION public.is_super_or_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role::text IN ('super_admin', 'admin')
  )
$$;

-- Create a function to check if user has any admin role
CREATE OR REPLACE FUNCTION public.is_any_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role::text IN ('super_admin', 'admin', 'moderator')
  )
$$;

-- Add status column to inquiries table for tracking
ALTER TABLE public.inquiries 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

-- Add constraint for status values (separate statement)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'inquiries_status_check'
  ) THEN
    ALTER TABLE public.inquiries 
    ADD CONSTRAINT inquiries_status_check 
    CHECK (status IN ('new', 'contacted', 'converted', 'closed'));
  END IF;
END $$;

-- Recreate RLS policies with proper permissions

-- Inquiries policies
CREATE POLICY "Super Admin and Admin can manage inquiries"
ON public.inquiries FOR ALL
TO authenticated
USING (is_super_or_admin(auth.uid()))
WITH CHECK (is_super_or_admin(auth.uid()));

CREATE POLICY "Moderators can view inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'moderator'));

CREATE POLICY "Anyone can create inquiries"
ON public.inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Itinerary days policies
CREATE POLICY "Super Admin and Admin can manage itinerary days"
ON public.itinerary_days FOR ALL
TO authenticated
USING (is_super_or_admin(auth.uid()))
WITH CHECK (is_super_or_admin(auth.uid()));

CREATE POLICY "Moderators can view itinerary days"
ON public.itinerary_days FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'moderator'));

CREATE POLICY "Anyone can view active itinerary days"
ON public.itinerary_days FOR SELECT
TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM tours WHERE tours.id = itinerary_days.tour_id AND tours.is_active = true
));

-- Testimonials policies
CREATE POLICY "Super Admin and Admin can manage testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (is_super_or_admin(auth.uid()))
WITH CHECK (is_super_or_admin(auth.uid()));

CREATE POLICY "Moderators can view testimonials"
ON public.testimonials FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'moderator'));

CREATE POLICY "Anyone can view active testimonials"
ON public.testimonials FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Tours policies
CREATE POLICY "Super Admin and Admin can manage tours"
ON public.tours FOR ALL
TO authenticated
USING (is_super_or_admin(auth.uid()))
WITH CHECK (is_super_or_admin(auth.uid()));

CREATE POLICY "Moderators can view tours"
ON public.tours FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'moderator'));

CREATE POLICY "Anyone can view active tours"
ON public.tours FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- User roles policies (only super_admin can manage)
CREATE POLICY "Super Admin can manage user roles"
ON public.user_roles FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'))
WITH CHECK (has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Newsletter subscribers policies
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers FOR SELECT
TO authenticated
USING (is_super_or_admin(auth.uid()));

CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);