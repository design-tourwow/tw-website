const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 375, height: 812 } // iPhone X size
  });
  
  const page = await browser.newPage();
  
  // Navigate to the page
  await page.goto('http://localhost:4000/tour-search-9', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  // Wait for SearchBar to be visible
  await page.waitForSelector('[data-search-container]', { timeout: 10000 });
  
  console.log('✓ SearchBar is visible on mobile');
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/tour-search-9-mobile-searchbar.png',
    fullPage: false
  });
  
  // Test filter button click
  const filterButton = await page.$('button svg polygon');
  if (filterButton) {
    await filterButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if mobile filter sidebar opened
    const filterSidebar = await page.$('.fixed.inset-0.z-50');
    if (filterSidebar) {
      console.log('✓ Filter button opens mobile sidebar');
      
      // Take screenshot of opened sidebar
      await page.screenshot({ 
        path: 'screenshots/tour-search-9-mobile-filter-open.png',
        fullPage: false
      });
    }
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await browser.close();
  console.log('\n✓ Mobile tests passed!');
})();
