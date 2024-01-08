// types.ts
import type { Database } from '$lib/supabase';

export type Mushers = Database['public']['Tables']['mushers']['Row'];
