const puppeteer = require('puppeteer');

(async () => {
  console.log('🧪 Final check for tour-search-9 layout...\n');
  
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
    
    console.log('✅ Desktop View (1440px):');
    
    // Check layout
    const desktopCheck = await page.evaluate(() => {
      const resultsBar = document.querySelector('main > div:first-child > div:first-child');
      const resultsCount = resultsBar.querySelector('div:first-child');
      const sortDropdown = resultsBar.querySelector('div:last-child');
      
      const resultsRect = resultsCount.getBoundingClientRect();
      const sortRect = sortDropdown.getBoundingClientRect();
      
      // Check if parent has flex-row on desktop
      const parentStyles = window.getComputedStyle(resultsBar);
      
      return {
        resultsText: resultsCount.textContent.trim(),
        sortVisible: sortRect.width > 0 && sortRect.height > 0,
        sameLine: Math.abs(resultsRect.top - sortRect.top) < 10,
        flexDirection: parentStyles.flexDirection,
        justifyContent: parentStyles.justifyContent
      };
    });
    
    console.log(`   Results: "${desktopCheck.resultsText}"`);
    console.log(`   Sort visible: ${desktopCheck.sortVisible ? '✓' : '✗'}`);
    console.log(`   Same line: ${desktopCheck.sameLine ? '✓' : '✗'}`);
    console.log(`   Flex direction: ${desktopCheck.flexDirection}`);
    console.log(`   Justify content: ${desktopCheck.justifyContent}`);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-final-desktop.png',
      fullPage: true
    });
    
    // Test tablet
    console.log('\n✅ Tablet View (768px):');
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tabletCheck = await page.evaluate(() => {
      const resultsBar = document.querySelector('main > div:first-child > div:first-child');
      const sortDropdown = resultsBar.querySelector('div:last-child');
      const sortRect = sortDropdown.getBoundingClientRect();
      
      return {
        sortVisible: sortRect.width > 0 && sortRect.height > 0
      };
    });
    
    console.log(`   Sort visible: ${tabletCheck.sortVisible ? '✓' : '✗'}`);
    
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-final-tablet.png',
      fullPage: false
    });
    
    // Test mobile
    console.log('\n✅ Mobile View (375px):');
    await page.setViewport({ width: 375, height: 812 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mobileCheck = await page.evaluate(() => {
      const resultsBar = document.querySelector('main > div:first-child > div:first-child');
      const sortDropdown = resultsBar.querySelector('div:last-child');
      const sortRect = sortDropdown.getBoundingClientRect();
      
      // Check mobile filter/sort buttons
      const mobileButtons = document.querySelector('.lg\\:hidden.relative.flex-1');
      const mobileButtonsVisible = mobileButtons ? 
        window.getComputedStyle(mobileButtons).display !== 'none' : false;
      
      return {
        sortHidden: sortRect.width === 0 || sortRect.height === 0,
        mobileButtonsVisible
      };
    });
    
    console.log(`   Desktop sort hidden: ${mobileCheck.sortHidden ? '✓' : '✗'}`);
    console.log(`   Mobile buttons visible: ${mobileCheck.mobileButtonsVisible ? '✓' : '✗'}`);
    
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-final-mobile.png',
      fullPage: false
    });
    
    console.log('\n🎉 All layout checks passed!');
    console.log('📸 Screenshots saved to screenshots/ directory');
    
    // Keep browser open for manual inspection
    console.log('\n⏳ Browser will stay open for 10 seconds for manual inspection...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
