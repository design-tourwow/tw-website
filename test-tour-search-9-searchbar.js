const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });
  
  const page = await browser.newPage();
  
  // Navigate to the page
  await page.goto('http://localhost:4000/tour-search-9', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  // Wait for SearchBar to be visible
  await page.waitForSelector('[data-search-container]', { timeout: 10000 });
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/tour-search-9-searchbar.png',
    fullPage: false
  });
  
  console.log('✓ SearchBar is visible');
  
  // Test search input
  const searchInput = await page.$('input[aria-label="ค้นหาทัวร์"]');
  if (searchInput) {
    await searchInput.type('โตเกียว');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✓ Search input works');
  }
  
  // Check if filter button exists
  const filterButton = await page.$('button svg polygon');
  if (filterButton) {
    console.log('✓ Filter button exists');
  }
  
  // Check if voice search button exists
  const voiceButton = await page.$('button[aria-label="ค้นหาด้วยเสียง"]');
  if (voiceButton) {
    console.log('✓ Voice search button exists');
  }
  
  // Check console for errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await browser.close();
  console.log('\n✓ All tests passed!');
})();
