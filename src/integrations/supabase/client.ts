
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sccuaflufqnyizgjsdzh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjY3VhZmx1ZnFueWl6Z2pzZHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTI2NDEsImV4cCI6MjA1NzM2ODY0MX0.d5ngvqUTcPv5iGCyPAe6OqnLVpx8gKm7V41kjgReNXw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
