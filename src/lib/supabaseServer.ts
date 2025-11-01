import { createClient, SupabaseClient } from '@supabase/supabase-js'

export function getSupabaseServer(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL || ''
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE || ''
  
  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE environment variables.')
  }
  
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: { persistSession: false },
  })
}

export const getSupabasePublicUrl = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  if (!supabaseUrl) {
    throw new Error('SUPABASE_URL environment variable is not set.')
  }
  return supabaseUrl
}


