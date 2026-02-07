import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration_days: number;
  start_city: string;
  category: string;
  best_season: string | null;
  original_price_inr: number;
  discounted_price_inr: number;
  overview: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  transport: string | null;
  hotel_type: string | null;
  hero_image_url: string | null;
  gallery_images: string[] | null;
  is_featured: boolean | null;
  is_active: boolean | null;
}

export interface ItineraryDay {
  id: string;
  tour_id: string;
  day_number: number;
  title: string;
  description: string | null;
}

export const useTours = (options?: { category?: string; featured?: boolean }) => {
  return useQuery({
    queryKey: ["tours", options?.category, options?.featured],
    queryFn: async () => {
      let query = supabase
        .from("tours")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (options?.category) {
        query = query.eq("category", options.category);
      }

      if (options?.featured) {
        query = query.eq("is_featured", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Tour[];
    },
  });
};

export const useTourBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["tour", slug],
    queryFn: async () => {
      const { data: tour, error } = await supabase
        .from("tours")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;

      // Fetch itinerary
      const { data: itinerary } = await supabase
        .from("itinerary_days")
        .select("*")
        .eq("tour_id", tour.id)
        .order("day_number");

      return {
        ...tour,
        itinerary: itinerary || [],
      } as Tour & { itinerary: ItineraryDay[] };
    },
    enabled: !!slug,
  });
};

export const useFeaturedTours = () => {
  return useTours({ featured: true });
};

export const useDomesticTours = () => {
  return useTours({ category: "Domestic" });
};

export const useInternationalTours = () => {
  return useTours({ category: "International" });
};

export const usePilgrimageTours = () => {
  return useTours({ category: "Pilgrimage" });
};
