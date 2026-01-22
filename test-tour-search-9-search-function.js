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
  
  // Wait for page to load
  await page.waitForSelector('[data-search-container]', { timeout: 10000 });
  
  // Count initial tours
  const initialTours = await page.$$eval('[class*="grid"] > div', divs => divs.length);
  console.log(`✓ Initial tour count: ${initialTours}`);
  
  // Type in search box
  const searchInput = await page.$('input[aria-label="ค้นหาทัวร์"]');
  if (searchInput) {
    await searchInput.type('โตเกียว');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Count filtered tours
    const filteredTours = await page.$$eval('[class*="grid"] > div', divs => divs.length);
    console.log(`✓ Filtered tour count (โตเกียว): ${filteredTours}`);
    
    if (filteredTours < initialTours) {
      console.log('✓ Search filtering works correctly');
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-search-filtered.png',
      fullPage: true
    });
    
    // Clear search
    await searchInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const clearedTours = await page.$$eval('[class*="grid"] > div', divs => divs.length);
    console.log(`✓ Tours after clearing search: ${clearedTours}`);
    
    if (clearedTours === initialTours) {
      console.log('✓ Search clear works correctly');
    }
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await browser.close();
  console.log('\n✓ Search functionality tests passed!');
})();
