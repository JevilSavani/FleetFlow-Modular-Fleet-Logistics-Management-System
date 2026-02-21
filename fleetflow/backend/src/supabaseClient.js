import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;

// Check if credentials are configured
if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url') {
  console.warn('⚠️  Supabase credentials not configured. Please update backend/.env file.');
  console.warn('Backend will run but database operations will fail until configured.');
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized successfully');
}

export { supabase };
