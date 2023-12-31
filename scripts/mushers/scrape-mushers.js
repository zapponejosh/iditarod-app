/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the page to be scraped
const url = 'https://iditarod.com/race/2024/mushers/list/';

// Function to scrape the data
async function scrapeData() {
	try {
		// Make a GET request to the URL
		const response = await axios.get(url);

		// Load the HTML content into Cheerio
		const $ = cheerio.load(response.data);

		// Find the table with class "stats-table"
		const statsTable = $('.stats-table');

		// Initialize an array to store the scraped data
		const dataArray = [];

		// Iterate through each row inside the table
		statsTable.find('tr').each((index, row) => {
			// Find the first anchor link within the row
			const anchor = $(row).find('a').first();

			// Check if the anchor link exists in the row
			if (anchor.length > 0) {
				// Extract name and profile link from the anchor link
				const name = anchor.text().trim();
				const profileLink = anchor.attr('href');

				// Extract rookie status from the last column of the row
				const rookieText = $(row).find('td:last-child').text().trim();
				const isRookie = rookieText === 'Rookie';

				// Add an object to the array
				dataArray.push({
					name,
					profile_link: profileLink,
					rookie: isRookie
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
async function scrapeMusherProfile(musher) {
	try {
		// Make a GET request to the musher profile page URL
		const response = await axios.get(musher.profile_link);

		// Load the HTML content into Cheerio
		const $ = cheerio.load(response.data);

		// Extract additional information from the profile page
		const bioParagraphs = $('.bio').find('p');

		// Exclude the <p> tag that starts with "SPONSORS:"
		const bio = bioParagraphs
			.filter((index, element) => $(element).text().trim().startsWith('SPONSORS:') === false)
			.text()
			.trim()
			.replace(/[\t\n]/g, ' '); // Replace tabs and new lines with spaces

		const avatarUrl = $('#musher-pic img').attr('src');
		const hometown = $('#musher-info strong:contains("Hometown") + span').text().trim();
		const website = $('#musher-info strong:contains("Website") + a').attr('href');

		// Return an object with the extracted information
		return {
			bio,
			avatar_url: avatarUrl,
			hometown,
			website
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
		const mushers = await scrapeData();

		// Iterate through each musher in the array
		for (const musher of mushers) {
			// Scrape additional information from the musher profile page
			const profileData = await scrapeMusherProfile(musher);

			// Merge the profile data with the existing musher data
			Object.assign(musher, profileData);
		}

		// Output the combined data
		console.log(mushers);

		// Write the data to a CSV file
		writeDataToTSV(mushers, 'mushers_data.tsv');
	} catch (error) {
		console.error('Error:', error.message);
	}
}

// Run the main function
main();
