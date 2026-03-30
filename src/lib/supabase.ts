// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { config } from './config';

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  console.warn('⚠️ Supabase URL or Anon Key is missing. Check your .env setup.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  config.supabaseUrl || 'http://localhost:54321', // Fallback for local development or CI
  config.supabaseAnonKey || 'placeholder',
);
