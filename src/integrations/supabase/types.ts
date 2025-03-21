export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      instagram_hashtags: {
        Row: {
          created_at: string
          hashtags: Json
          id: string
          keyword: string
          last_updated: string
          source: string
          trending_score: number | null
        }
        Insert: {
          created_at?: string
          hashtags: Json
          id?: string
          keyword: string
          last_updated?: string
          source: string
          trending_score?: number | null
        }
        Update: {
          created_at?: string
          hashtags?: Json
          id?: string
          keyword?: string
          last_updated?: string
          source?: string
          trending_score?: number | null
        }
        Relationships: []
      }
      prompt_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      prompt_templates: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          rating: number | null
          template: string
          title: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          rating?: number | null
          template: string
          title: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          rating?: number | null
          template?: string
          title?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "prompt_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      rls: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      trending_keywords: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          keyword: string
          last_updated: string
          search_volume: number | null
          source: string
          trending_score: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          keyword: string
          last_updated?: string
          search_volume?: number | null
          source: string
          trending_score?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          keyword?: string
          last_updated?: string
          search_volume?: number | null
          source?: string
          trending_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trending_keywords_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "prompt_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      youtube_tags: {
        Row: {
          created_at: string
          id: string
          keyword: string
          last_updated: string
          source: string
          tags: Json
          trending_score: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          keyword: string
          last_updated?: string
          source: string
          tags: Json
          trending_score?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          keyword?: string
          last_updated?: string
          source?: string
          tags?: Json
          trending_score?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_schema_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_schema: string
          table_name: string
          row_count: number
          has_rls: boolean
          policies: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
