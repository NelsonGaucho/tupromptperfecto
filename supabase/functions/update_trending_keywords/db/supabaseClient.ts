
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

// Definir los encabezados CORS para toda la aplicación
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Crear cliente Supabase
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
export const supabase = createClient(supabaseUrl, supabaseServiceKey)
