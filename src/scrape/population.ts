import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function scrapeWikipediaPopulations() {
    const browser: Browser = await chromium.launch();
    const page: Page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population');

    // Wait for the table to load
    await page.waitForSelector('table.wikitable');

    // Extract data from the table
    const rows = await page.$$('table.wikitable > tbody > tr');

    const data: [string, string, string][] = [];
    for (let i = 1; i < rows.length; i++) {  // Skip the header row
        const columns = await rows[i].$$('td');
        if (columns.length >= 3) {
            const no = await columns[0].innerText();
            const country = (await columns[1].innerText()).replace(/,/g, '');
            const population = (await columns[2].innerText()).replace(/,/g, '');
            data.push([no, country.trim(), population.trim()]);
        }
    }

    await browser.close();

    // Save data to CSV
    const csvContent = ['Country,Population', ...data.map(row => row.join(','))].join('\n');
    fs.writeFileSync(path.join(__dirname, 'country_populations.csv'), csvContent);

    console.log("Data has been scraped and saved to country_populations.csv");
}

scrapeWikipediaPopulations().catch(console.error);