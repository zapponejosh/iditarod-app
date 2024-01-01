<script lang="ts">
	import logo from '$lib/images/ia-logo.svg';
	import type { Session } from '@supabase/supabase-js';
	export let session: Session | null;
</script>

<nav>
	<a href="/"> <img src={logo} alt="Iditarod Dog Logo" /></a>

	<div class="links">
		<a href="/mushers">Musher Listing</a>
		<a href="/mushers/standings">Race Standings</a>
		{#if session}
			<a href="/competition">Competition</a>
			<a href="/user/account">Account</a>
		{:else}
			<a href="/user">Login</a>
		{/if}
	</div>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background-color: var(--secondary-dark);
		color: var(--primary-light);
	}

	.links {
		display: flex;
		gap: 20px;
	}

	a {
		text-decoration: none;
		color: var(--secondary-light);
	}
	a:hover {
		text-decoration: underline;
		color: var(--accent-2);
	}
	a:hover {
		text-decoration: underline;
		color: var(--accent-1);
	}

	img {
		height: 40px;
	}
</style>
