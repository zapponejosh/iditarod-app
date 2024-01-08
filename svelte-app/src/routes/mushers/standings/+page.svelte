<script lang="ts">
	export let data;

	let mushers = data.mushers;
	// Helper function to format the date
	const formatDate = (date: Date) => new Date(date).toLocaleString();

	// Helper function to format the status
	const formatStatus = (status) => {
		switch (status) {
			case 'Running':
				return 'Running';
			case 'Scratched':
				return 'Scratched';
			case 'Finished':
				return 'Finished';
			default:
				return 'Unknown';
		}
	};
</script>

<h1>Standings page</h1>
<div class="grid">
	<table>
		<thead>
			<tr>
				<th>Bib</th>
				<th>Musher Name</th>
				<th>Position</th>
				<th>Last Updated</th>
				<th>Speed</th>
				<th>Status</th>
				<th>24-Hour</th>
				<th>8-Hour</th>
				<th>Dogs In</th>
				<th>Dogs Out</th>
				<th>Checkpoint</th>
			</tr>
		</thead>
		<tbody>
			{#each mushers as { bib, mushers: musherData, position, last_updated, speed, status, twenty_four_hour, eight_hour, dogs_in, dogs_out, checkpoints }}
				<tr class:scratched={status === 'Scratched'} class:finished={status === 'Finished'}>
					<td>{bib}</td>
					<td>{musherData.name}</td>
					<td>{position}</td>
					<td>{formatDate(last_updated)}</td>
					<td>{speed}</td>
					<td>{formatStatus(status)}</td>
					<td>{twenty_four_hour ? 'Yes' : 'No'}</td>
					<td>{eight_hour ? 'Yes' : 'No'}</td>
					<td>{dogs_in}</td>
					<td>{dogs_out}</td>
					<td>{checkpoints.name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* Add your table-specific styling here */
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 20px;
		background-color: var(--secondary-dark);
		color: var(--primary-light);
		box-shadow: var(--custom-box-shadow);
	}

	th,
	td {
		border: var(--custom-border);
		padding: var(--custom-spacing);
		text-align: left;
	}

	th {
		background-color: var(--secondary-light);
		color: var(--primary-dark);
	}

	tr:nth-child(even) {
		background-color: var(--primary-dark);
	}

	/* Additional styles based on status */
	tbody tr.scratched {
		background-color: #ddd; /* Adjust to your preferred disabled color */
		color: #666; /* Adjust to your preferred text color for disabled rows */
	}

	tbody tr.finished {
		background-color: #ae9406;
		color: var(--primary-dark);
	}
	tbody tr:hover:not(.scratched):not(.finished) {
		background-color: var(--secondary-light);
	}

	tbody tr:hover:not(.scratched):not(.finished) td {
		color: var(--secondary-dark);
	}
</style>
