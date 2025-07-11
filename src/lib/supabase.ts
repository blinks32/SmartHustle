import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseAnonKey !== 'placeholder-key' &&
         supabaseUrl && 
         supabaseAnonKey
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          business_name: string
          business_type: string
          phone: string
          created_at: string
          referral_code: string
        }
        Insert: {
          id: string
          email: string
          business_name: string
          business_type: string
          phone?: string
          referral_code: string
        }
        Update: {
          business_name?: string
          business_type?: string
          phone?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string
          email?: string
          created_at: string
        }
        Insert: {
          user_id: string
          name: string
          phone: string
          email?: string
        }
        Update: {
          name?: string
          phone?: string
          email?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          client_id: string
          service: string
          date: string
          time: string
          price: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          service: string
          date: string
          time: string
          price: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
        }
        Update: {
          service?: string
          date?: string
          time?: string
          price?: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          client_id: string
          items: any[]
          total: number
          created_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          items: any[]
          total: number
        }
        Update: {
          items?: any[]
          total?: number
        }
      }
    }
  }
}