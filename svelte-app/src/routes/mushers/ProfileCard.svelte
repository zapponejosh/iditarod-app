<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string | null = 'Test name';
	export let hometown: string | null = 'testtown, AK';
	export let avatarUrl: string | null = 'https://placehold.co/600x400';
	export let isRookie: boolean | null;
	export let id: number;

	const dispatch = createEventDispatcher();
</script>

<div class="profile-card">
	<img src={avatarUrl} alt={name} />
	<div class="info">
		<h4>{name} <span class="rookie">{isRookie ? 'R' : ''}</span></h4>
		<p class="small">{hometown}</p>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<button
			class="button primary show-modal"
			on:click={() => {
				dispatch('open', { musherId: id });
			}}>View Profile</button
		>
	</div>
</div>

<style>
	.profile-card {
		border-radius: var(--custom-border-radius);
		display: flex;
		/* margin: 70px; */
		min-width: 350px;
		background-color: var(--secondary-dark);
	}

	img {
		border-radius: var(--custom-border-radius) 0 0 var(--custom-border-radius);
		width: 150px;
		height: 150px;
		margin-right: 28px;
		object-fit: cover;
		object-position: center top;
	}
</style>
