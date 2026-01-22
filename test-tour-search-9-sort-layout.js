const puppeteer = require('puppeteer');

(async () => {
  console.log('🧪 Testing sort dropdown layout on desktop...\n');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });
  
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:4000/tour-search-9', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    await page.waitForSelector('main', { timeout: 10000 });
    
    // Check if results count and sort dropdown are on the same line
    const layout = await page.evaluate(() => {
      const resultsBar = document.querySelector('main > div:first-child > div:first-child');
      const resultsCount = resultsBar.querySelector('div:first-child');
      const sortDropdown = resultsBar.querySelector('div:last-child');
      
      if (!resultsCount || !sortDropdown) {
        return { error: 'Elements not found' };
      }
      
      const resultsRect = resultsCount.getBoundingClientRect();
      const sortRect = sortDropdown.getBoundingClientRect();
      
      return {
        resultsTop: resultsRect.top,
        sortTop: sortRect.top,
        sameLine: Math.abs(resultsRect.top - sortRect.top) < 10,
        resultsText: resultsCount.textContent.trim(),
        sortVisible: sortRect.width > 0 && sortRect.height > 0
      };
    });
    
    console.log('✅ Desktop Layout Check:');
    console.log(`   Results text: "${layout.resultsText}"`);
    console.log(`   Results top: ${layout.resultsTop}px`);
    console.log(`   Sort top: ${layout.sortTop}px`);
    console.log(`   Same line: ${layout.sameLine ? '✓ YES' : '✗ NO'}`);
    console.log(`   Sort visible: ${layout.sortVisible ? '✓ YES' : '✗ NO'}`);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-sort-layout-desktop.png',
      fullPage: false
    });
    
    // Test mobile layout
    console.log('\n✅ Mobile Layout Check:');
    await page.setViewport({ width: 375, height: 812 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mobileLayout = await page.evaluate(() => {
      const resultsBar = document.querySelector('main > div:first-child > div:first-child');
      const resultsCount = resultsBar.querySelector('div:first-child');
      const sortDropdown = resultsBar.querySelector('div:last-child');
      
      const resultsRect = resultsCount.getBoundingClientRect();
      const sortRect = sortDropdown.getBoundingClientRect();
      
      return {
        resultsTop: resultsRect.top,
        sortTop: sortRect.top,
        sortVisible: sortRect.width > 0 && sortRect.height > 0,
        differentLine: Math.abs(resultsRect.top - sortRect.top) > 10
      };
    });
    
    console.log(`   Results top: ${mobileLayout.resultsTop}px`);
    console.log(`   Sort top: ${mobileLayout.sortTop}px`);
    console.log(`   Sort hidden on mobile: ${!mobileLayout.sortVisible ? '✓ YES' : '✗ NO'}`);
    
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-sort-layout-mobile.png',
      fullPage: false
    });
    
    console.log('\n🎉 Layout test completed!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
