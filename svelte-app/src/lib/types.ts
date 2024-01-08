// types.ts
import type { Database } from '$lib/supabase';

export type Musher = Database['public']['Tables']['mushers']['Row'];
