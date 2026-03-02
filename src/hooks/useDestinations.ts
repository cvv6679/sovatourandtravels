import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DestinationSpot {
  name: string;
  description: string;
  image: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  card_image: string | null;
  hero_image: string | null;
  best_time: string;
  ideal_duration: string;
  overview: string;
  top_spots: DestinationSpot[];
  things_to_do: string[];
  travel_tips: string[];
  gallery: string[];
  seo_title: string;
  seo_description: string;
  content: string;
  is_active: boolean;
  sort_order: number;
}

export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return (data || []) as unknown as Destination[];
    },
  });
};

export const useDestination = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["destination", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug");
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as unknown as Destination;
    },
    enabled: !!slug,
  });
};
