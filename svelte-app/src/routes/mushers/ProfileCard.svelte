<script lang="ts">
	import { pushState } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	export let name: string | null = 'Test name';
	export let hometown: string | null = 'testtown, AK';
	export let avatarUrl: string | null = 'https://placehold.co/600x400';
	export let isRookie: boolean | null;
	export let id: number;
	export let link: string;

	async function onProfileClick(e: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		if (e.metaKey || e.ctrlKey) return;
		e.preventDefault();
		dispatch('open', { musherId: id });

		const { href } = e.currentTarget;
		pushState(href, {});
	}

	const dispatch = createEventDispatcher();
</script>

<div class="profile-card">
	<img src={avatarUrl} alt={name} />
	<div class="info">
		<h4>{name} <span class="rookie">{isRookie ? 'R' : ''}</span></h4>
		<p class="small">{hometown}</p>

		<a
			href="/mushers/{link}"
			class="button primary show-modal"
			on:click={(e) => {
				dispatch('open', { musherId: id });
				onProfileClick(e);
			}}>View Profile</a
		>
	</div>
</div>

<style>
	.profile-card {
		border-radius: var(--custom-border-radius);
		display: flex;
		min-width: 320px;
		max-width: 500px;
		background-color: var(--secondary-dark);
	}

	img {
		border-radius: var(--custom-border-radius) 0 0 var(--custom-border-radius);
		width: 150px;
		max-width: 150px;
		min-width: 150px;
		height: 150px;
		margin-right: 28px;
		object-fit: cover;
		object-position: center top;
	}
	.info {
		white-space: nowrap;
		overflow: scroll;
	}
</style>
