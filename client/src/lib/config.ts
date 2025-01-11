// Base URL for API requests
export const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || '' 
  : '';  // Empty string means same-origin in development

// Supabase configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
