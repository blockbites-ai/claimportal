import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../client/src/lib/supabase';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = request.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return response.status(200).json(data);
  } catch (error) {
    return response.status(400).json({
      error: error.message
    });
  }
}
