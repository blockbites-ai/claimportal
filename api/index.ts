import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../client/src/lib/supabase';

// Health check endpoint
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return response.json({
      status: 'healthy',
      database: 'connected'
    });
  } catch (error) {
    return response.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
}