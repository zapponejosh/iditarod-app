/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the page to be scraped
const url = 'https://iditarod.com/race/2023/checkpoints/';

// Function to scrape the data
async function scrapeData() {
	try {
		// Make a GET request to the URL
		const response = await axios.get(url);

		// Load the HTML content into Cheerio
		const $ = cheerio.load(response.data);

		// Find the table with class "post-content" table
		const checkpointsTable = $('.post-content');

		// Initialize an array to store the scraped data
		const dataArray = [];
		let count = 0;
		// Iterate through each row inside the table
		checkpointsTable.find('tr').each((index, row) => {
			// Find the first anchor link within the row
			const anchor = $(row).find('a').first();

			// Check if the anchor link exists in the row
			if (anchor.length > 0) {
				count++;
				// Extract name and profile link from the anchor link
				const name = anchor.text().trim();
				const checkpointLink = anchor.attr('href');

				// Extract rookie status from the last column of the row
				const raceMile = $(row).find('td:last-child').text().trim();

				// Add an object to the array
				dataArray.push({
					checkpoint_id: count,
					name,
					checkpoint_link: checkpointLink,
					race_mile: raceMile
				});
			}
		});

		// Output the array of objects
		return dataArray;
	} catch (error) {
		console.error('Error:', error.message);
	}
}

// Function to scrape additional information from musher profile page
async function scrapeCheckpointData(checkpoint) {
	try {
		// Make a GET request to the musher profile page URL
		const response = await axios.get(checkpoint.checkpoint_link);

		// Load the HTML content into Cheerio
		const $ = cheerio.load(response.data);

		// Extract additional information from the profile page
		const image = $('.location-photo img').attr('src');
		// const description = $('.post-content > p:first-child')
		// 	.text()
		// 	.trim()
		// 	.replace(/[\t\n]/g, ' ');
		const pElements = $('.post-content').find('p');
		const description = pElements
			.filter((index, element) => {
				const text = $(element).text().trim();
				return text.length > 100;
			})
			.map((index, element) =>
				$(element)
					.text()
					.trim()
					.replace(/[\t\n]/g, ' ')
			)
			.get();

		// Return an object with the extracted information
		return {
			description: description[0],
			image
		};
	} catch (error) {
		console.error('Error:', error.message);
	}
}

// Function to write data to a TSV file
function writeDataToTSV(data, fileName) {
	const header = Object.keys(data[0]).join('\t') + '\n';
	const rows = data.map((item) => Object.values(item).join('\t') + '\n').join('');

	const tsvData = header + rows;

	fs.writeFileSync(fileName, tsvData, 'utf-8');

	console.log(`Data has been written to ${fileName}`);
}

// Main function to orchestrate the scraping process
async function main() {
	try {
		const checkpoints = await scrapeData();

		// Iterate through each musher in the array
		for (const checkpoint of checkpoints) {
			// Scrape additional information from the musher profile page
			const checkpointData = await scrapeCheckpointData(checkpoint);

			// Merge the profile data with the existing musher data
			Object.assign(checkpoint, checkpointData);
		}

		// Output the combined data
		console.log(checkpoints);

		// Write the data to a CSV file
		writeDataToTSV(checkpoints, 'checkpoint_data.tsv');
	} catch (error) {
		console.error('Error:', error.message);
	}
}

// Run the main function
main();
