export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      checkpoints: {
        Row: {
          checkpoint_id: number
          checkpoint_link: string | null
          description: string | null
          image: string | null
          name: string | null
          race_id: number | null
          race_mile: number | null
        }
        Insert: {
          checkpoint_id?: number
          checkpoint_link?: string | null
          description?: string | null
          image?: string | null
          name?: string | null
          race_id?: number | null
          race_mile?: number | null
        }
        Update: {
          checkpoint_id?: number
          checkpoint_link?: string | null
          description?: string | null
          image?: string | null
          name?: string | null
          race_id?: number | null
          race_mile?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checkpoints_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "race_data"
            referencedColumns: ["race_id"]
          }
        ]
      }
      competition_pools: {
        Row: {
          code: string
          pool_id: number
          standings: number[] | null
          status: Database["public"]["Enums"]["competition_status"] | null
        }
        Insert: {
          code: string
          pool_id?: number
          standings?: number[] | null
          status?: Database["public"]["Enums"]["competition_status"] | null
        }
        Update: {
          code?: string
          pool_id?: number
          standings?: number[] | null
          status?: Database["public"]["Enums"]["competition_status"] | null
        }
        Relationships: []
      }
      musher_standings: {
        Row: {
          bib: number | null
          dogs_in: number | null
          dogs_out: number | null
          eight_hour: boolean | null
          last_updated: string | null
          latest_checkpoint_id: number | null
          musher_id: number | null
          position: number | null
          speed: number | null
          standings_id: number
          status: string | null
          twenty_four_hour: boolean | null
        }
        Insert: {
          bib?: number | null
          dogs_in?: number | null
          dogs_out?: number | null
          eight_hour?: boolean | null
          last_updated?: string | null
          latest_checkpoint_id?: number | null
          musher_id?: number | null
          position?: number | null
          speed?: number | null
          standings_id?: number
          status?: string | null
          twenty_four_hour?: boolean | null
        }
        Update: {
          bib?: number | null
          dogs_in?: number | null
          dogs_out?: number | null
          eight_hour?: boolean | null
          last_updated?: string | null
          latest_checkpoint_id?: number | null
          musher_id?: number | null
          position?: number | null
          speed?: number | null
          standings_id?: number
          status?: string | null
          twenty_four_hour?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "musher_standings_latest_checkpoint_id_fkey"
            columns: ["latest_checkpoint_id"]
            isOneToOne: false
            referencedRelation: "checkpoints"
            referencedColumns: ["checkpoint_id"]
          },
          {
            foreignKeyName: "musher_standings_musher_id_fkey"
            columns: ["musher_id"]
            isOneToOne: false
            referencedRelation: "mushers"
            referencedColumns: ["musher_id"]
          }
        ]
      }
      mushers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          hometown: string | null
          musher_id: number
          name: string | null
          profile_link: string | null
          rookie: boolean | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          hometown?: string | null
          musher_id?: number
          name?: string | null
          profile_link?: string | null
          rookie?: boolean | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          hometown?: string | null
          musher_id?: number
          name?: string | null
          profile_link?: string | null
          rookie?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      race_data: {
        Row: {
          active_racer_count: number | null
          duration: unknown | null
          participant_count: number | null
          race_id: number
          race_start: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          active_racer_count?: number | null
          duration?: unknown | null
          participant_count?: number | null
          race_id?: number
          race_start?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          active_racer_count?: number | null
          duration?: unknown | null
          participant_count?: number | null
          race_id?: number
          race_start?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      user_picks: {
        Row: {
          musher_picks: number[] | null
          rookie_pick: number | null
          user_pick_id: number
          user_pool_id: number | null
        }
        Insert: {
          musher_picks?: number[] | null
          rookie_pick?: number | null
          user_pick_id?: number
          user_pool_id?: number | null
        }
        Update: {
          musher_picks?: number[] | null
          rookie_pick?: number | null
          user_pick_id?: number
          user_pool_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_picks_user_pool_id_fkey"
            columns: ["user_pool_id"]
            isOneToOne: false
            referencedRelation: "user_pool"
            referencedColumns: ["user_pool_id"]
          }
        ]
      }
      user_pool: {
        Row: {
          pool_id: number | null
          user_id: string | null
          user_pool_id: number
        }
        Insert: {
          pool_id?: number | null
          user_id?: string | null
          user_pool_id?: number
        }
        Update: {
          pool_id?: number | null
          user_id?: string | null
          user_pool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_pool_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "competition_pools"
            referencedColumns: ["pool_id"]
          },
          {
            foreignKeyName: "user_pool_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      competition_status: "Active" | "Complete" | "Pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
