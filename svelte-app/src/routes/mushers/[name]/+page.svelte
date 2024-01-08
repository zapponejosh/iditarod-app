<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Musher } from '$lib/types';
	import { page } from '$app/stores';

	const params = $page.params;

	let musherName = params.name;

	const musherStore = getContext('mushers') as Writable<Musher[]>;
	let musherData: Musher[] = [];
	const unsubscribe = musherStore.subscribe((value) => {
		musherData = value;
	});

	function normalizeName(name: string): string {
		return name.toLowerCase().replace(/\s+/g, '-');
	}

	function findByName(name: string) {
		return (
			musherData?.find((m) => {
				if (!m.name) throw Error('No name in musher data');
				return normalizeName(m.name) === name;
			}) || null
		);
	}

	const musher = findByName(musherName);

	onDestroy(() => unsubscribe());
</script>

<h1>{musher?.name}</h1>
<img src={musher?.avatar_url} alt="image of {musher?.name}" />
<div>
	<p class="small">
		<span class="hometown">{musher?.hometown}</span>
	</p>
	<p><span class="rookie">{musher?.rookie ? 'Rookie' : ''}</span></p>

	<p><a target="_blank" href={musher?.website}>{musher?.website}</a></p>
</div>
<div class="bio">
	<p>{musher?.bio}</p>
</div>

<style>
	img {
		margin-right: 28px;
		object-fit: cover;
		object-position: center top;
		border-radius: 8px;
	}
</style>
