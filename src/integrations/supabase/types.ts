export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          ai_generated: boolean | null
          author: string | null
          category: string | null
          content: string | null
          content_bn_html: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          focus_keyword: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          publish_date: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_bn_html?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          focus_keyword?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          publish_date?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_bn_html?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          focus_keyword?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          publish_date?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_prompt_queue: {
        Row: {
          created_at: string
          id: string
          is_used: boolean | null
          prompt: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_used?: boolean | null
          prompt: string
        }
        Update: {
          created_at?: string
          id?: string
          is_used?: boolean | null
          prompt?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string | null
          name: string
          phone: string
          preferred_date: string | null
          status: string | null
          tour_id: string | null
          travellers: number | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          name: string
          phone: string
          preferred_date?: string | null
          status?: string | null
          tour_id?: string | null
          travellers?: number | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string
          phone?: string
          preferred_date?: string | null
          status?: string | null
          tour_id?: string | null
          travellers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_days: {
        Row: {
          created_at: string
          day_number: number
          description: string | null
          id: string
          title: string
          tour_id: string
        }
        Insert: {
          created_at?: string
          day_number: number
          description?: string | null
          id?: string
          title: string
          tour_id: string
        }
        Update: {
          created_at?: string
          day_number?: number
          description?: string | null
          id?: string
          title?: string
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          destination: string | null
          id: string
          is_active: boolean | null
          name: string
          rating: number
          text: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          destination?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rating: number
          text: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          destination?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rating?: number
          text?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          ai_generated: boolean | null
          best_season: string | null
          category: string
          created_at: string
          destination: string
          discounted_price_inr: number
          duration_days: number
          exclusions: string[] | null
          gallery_images: string[] | null
          hero_image_url: string | null
          hotel_type: string | null
          id: string
          inclusions: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          original_price_inr: number
          overview: string | null
          slug: string
          start_city: string
          title: string
          transport: string | null
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          best_season?: string | null
          category?: string
          created_at?: string
          destination: string
          discounted_price_inr: number
          duration_days: number
          exclusions?: string[] | null
          gallery_images?: string[] | null
          hero_image_url?: string | null
          hotel_type?: string | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          original_price_inr: number
          overview?: string | null
          slug: string
          start_city?: string
          title: string
          transport?: string | null
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          best_season?: string | null
          category?: string
          created_at?: string
          destination?: string
          discounted_price_inr?: number
          duration_days?: number
          exclusions?: string[] | null
          gallery_images?: string[] | null
          hero_image_url?: string | null
          hotel_type?: string | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          original_price_inr?: number
          overview?: string | null
          slug?: string
          start_city?: string
          title?: string
          transport?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_any_admin: { Args: { _user_id: string }; Returns: boolean }
      is_super_or_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user" | "super_admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "super_admin", "moderator"],
    },
  },
} as const
