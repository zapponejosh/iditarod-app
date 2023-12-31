<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from './Avatar.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handlesubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = true;
			update();
		};
	};
</script>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handlesubmit}
		bind:this={profileForm}
		enctype="multipart/form-data"
	>
		<Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		<div>
			<label for="email">Email</label>
			<input type="text" name="email" id="email" value={session?.user.email} disabled />
		</div>
		<div>
			<label for="fullName">Full Name</label>
			<input type="text" name="fullName" id="fullName" value={form?.fullName ?? fullName} />
		</div>
		<div>
			<label for="username">Username</label>
			<input
				id="username"
				name="username"
				type="text"
				value={form?.username ?? username}
				required
			/>
		</div>
		<div>
			<label for="website">Website</label>
			<input type="text" name="website" id="website" value={form?.website ?? website} />
		</div>
		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div><button class="button block" disabled={loading}>Sign Out</button></div>
	</form>
</div>
