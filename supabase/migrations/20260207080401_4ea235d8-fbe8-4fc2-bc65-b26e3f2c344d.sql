-- Migration 1: Add new enum values (must be committed before use)
-- Add new values to the existing enum type
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'moderator';