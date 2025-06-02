// This script fetches and processes news from RSS feeds
const { fetchAndProcessNews } = require('./content-fetcher');

async function main() {
  console.log('Starting content update...');
  await fetchAndProcessNews();
  console.log('Content update completed!');
}

main().catch(error => {
  console.error('Error updating content:', error);
  process.exit(1);
});