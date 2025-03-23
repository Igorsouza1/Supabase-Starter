export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          user_id: string
          status: "pending" | "processing" | "done" | "error"
          created_at: string
          started_at: string | null
          finished_at: string | null
          image_count: number
        }
        Insert: {
          id?: string
          user_id: string
          status: "pending" | "processing" | "done" | "error"
          created_at?: string
          started_at?: string | null
          finished_at?: string | null
          image_count?: number
        }
        Update: {
          id?: string
          user_id?: string
          status?: "pending" | "processing" | "done" | "error"
          created_at?: string
          started_at?: string | null
          finished_at?: string | null
          image_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "jobs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      uploads: {
        Row: {
          id: string
          job_id: string
          user_id: string
          file_path: string
          upload_date: string
          capture_date: string | null
          has_animal: boolean | null
          confidence: number | null
          favorited: boolean
        }
        Insert: {
          id?: string
          job_id: string
          user_id: string
          file_path: string
          upload_date?: string
          capture_date?: string | null
          has_animal?: boolean | null
          confidence?: number | null
          favorited?: boolean
        }
        Update: {
          id?: string
          job_id?: string
          user_id?: string
          file_path?: string
          upload_date?: string
          capture_date?: string | null
          has_animal?: boolean | null
          confidence?: number | null
          favorited?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "uploads_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uploads_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          id: string
          upload_id: string
          label: string | null
          confidence: number | null
          box: Json | null
        }
        Insert: {
          id?: string
          upload_id: string
          label?: string | null
          confidence?: number | null
          box?: Json | null
        }
        Update: {
          id?: string
          upload_id?: string
          label?: string | null
          confidence?: number | null
          box?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "results_upload_id_fkey"
            columns: ["upload_id"]
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      user_limits: {
        Row: {
          user_id: string
          max_images: number
          current_images: number
          last_reset: string
        }
        Insert: {
          user_id: string
          max_images?: number
          current_images?: number
          last_reset?: string
        }
        Update: {
          user_id?: string
          max_images?: number
          current_images?: number
          last_reset?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_limits_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

