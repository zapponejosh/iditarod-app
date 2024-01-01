<script lang="ts">
	import ProfileCard from './ProfileCard.svelte';
	import Modal from './Modal.svelte';

	export let data;

	let showModal = false;
	let musherId = 1;
	let selected = data.mushers[0];
	function handleOpenModal(e) {
		musherId = e.detail.musherId;
		selected = data.mushers.find((m) => m.musher_id === musherId) || data.mushers[0];

		showModal = true;
	}
</script>

<h1>Musher Listings</h1>

<Modal bind:showModal>
	<div slot="top">
		<img src={selected.avatar_url} alt="image of {selected.name}" />
		<div>
			<h3>
				{selected.name}
			</h3>
			<p class="small">
				<span class="hometown">{selected.hometown}</span><span class="rookie"
					>{selected.rookie ?? 'Rookie'}</span
				>
			</p>
			<p><a target="_blank" href={selected.website}>{selected.website}</a></p>
		</div>
	</div>
	<div class="bio">
		<p>{selected.bio}</p>
	</div>
</Modal>

<div class="grid">
	{#each data.mushers as musher}
		<ProfileCard
			name={musher.name}
			hometown={musher.hometown}
			avatarUrl={musher.avatar_url}
			id={musher.musher_id}
			isRookie={musher.rookie}
			on:open={handleOpenModal}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 70px; /* Adjust the gap between columns as needed */
	}
	img {
		width: 150px;
		height: 150px;
		margin-right: 28px;
		object-fit: cover;
		object-position: center top;
		border-radius: 32px;
	}
</style>
