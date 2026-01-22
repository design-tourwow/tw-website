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
  
  // Wait for SearchBar
  await page.waitForSelector('[data-search-container]', { timeout: 10000 });
  
  // Check search input focus border color
  const searchInput = await page.$('input[aria-label="ค้นหาทัวร์"]');
  if (searchInput) {
    await searchInput.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const borderColor = await page.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    }, searchInput);
    
    console.log(`✓ Search input focus border color: ${borderColor}`);
  }
  
  // Check filter button color
  const filterButton = await page.$('button svg polygon');
  if (filterButton) {
    const buttonParent = await page.evaluateHandle((el) => el.closest('button'), filterButton);
    const buttonColor = await page.evaluate((el) => {
      return window.getComputedStyle(el).color;
    }, buttonParent);
    
    console.log(`✓ Filter button color: ${buttonColor}`);
  }
  
  // Take screenshot with focus
  await page.screenshot({ 
    path: 'screenshots/tour-search-9-theme-check.png',
    fullPage: false
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await browser.close();
  console.log('\n✓ Theme color verification complete!');
})();
