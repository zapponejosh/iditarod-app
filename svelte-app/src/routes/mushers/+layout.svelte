<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import type { LayoutData } from './$types';
	import type { Musher } from '$lib/types';

	export let data: LayoutData;

	const mushers = writable<Musher[]>();

	$: mushers.set(data.mushers);

	setContext('mushers', mushers);
</script>

<div>
	<slot />
</div>
