import type { QueryError } from '@supabase/supabase-js';
// import type { Database } from '$lib/supabase.js';

export const load = async ({ locals: { supabase } }) => {
	interface MusherStandingQuery {
		bib: number;
		musher_id: number;
		position: number;
		last_updated: Date;
		speed: number;
		status: 'Running' | 'Scratched' | 'Finished';
		twenty_four_hour: boolean;
		eight_hour: boolean;
		dogs_in: number;
		dogs_out: number;
		checkpoints: { name: string };
		mushers: { name: string };
	}

	const musherQuery = supabase
		.from('musher_standings')
		.select(
			`
bib, 
checkpoints (name), 
mushers (name), 
musher_id, 
position,
last_updated,
bib,
speed,
status,
twenty_four_hour,
eight_hour,
dogs_in,
dogs_out`
		)
		.order('position');

	const { data: mushers, error }: { data: MusherStandingQuery[]; error: QueryError } =
		await await musherQuery;
	if (error) throw error;

	return { mushers };
};
