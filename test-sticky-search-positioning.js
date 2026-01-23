const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('🚀 Testing sticky search positioning...');
    
    // Navigate to the tour search page
    await page.goto('http://localhost:3000/tour-search-9', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 }); // iPhone SE size
    await page.waitForTimeout(1000);
    
    console.log('📱 Testing mobile sticky search...');
    
    // Check initial state - sticky should not be visible
    const initialStickyVisible = await page.evaluate(() => {
      const stickyElement = document.querySelector('.lg\\:hidden.fixed.top-20');
      return stickyElement && window.getComputedStyle(stickyElement).display !== 'none';
    });
    
    console.log('Initial sticky visible:', initialStickyVisible);
    
    // Scroll down to trigger sticky behavior
    await page.evaluate(() => {
      window.scrollTo(0, 800); // Scroll past search section
    });
    
    await page.waitForTimeout(500);
    
    // Check if sticky search appears
    const stickyVisible = await page.evaluate(() => {
      const stickyElement = document.querySelector('.lg\\:hidden.fixed.top-20');
      return stickyElement && window.getComputedStyle(stickyElement).display !== 'none';
    });
    
    console.log('Sticky search visible after scroll:', stickyVisible);
    
    // Check positioning - should be at top-20 (80px from top)
    const stickyPosition = await page.evaluate(() => {
      const stickyElement = document.querySelector('.lg\\:hidden.fixed.top-20');
      if (stickyElement) {
        const styles = window.getComputedStyle(stickyElement);
        return {
          top: styles.top,
          position: styles.position,
          zIndex: styles.zIndex
        };
      }
      return null;
    });
    
    console.log('Sticky positioning:', stickyPosition);
    
    // Check if main content has proper margin when sticky is active
    const mainContentMargin = await page.evaluate(() => {
      const mainContent = document.querySelector('.container.mx-auto.px-4.sm\\:px-6.lg\\:px-8.py-4.sm\\:py-6');
      if (mainContent) {
        const styles = window.getComputedStyle(mainContent);
        return {
          marginTop: styles.marginTop,
          classes: mainContent.className
        };
      }
      return null;
    });
    
    console.log('Main content margin:', mainContentMargin);
    
    // Test desktop viewport - sticky should not appear
    await page.setViewport({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);
    
    console.log('🖥️ Testing desktop (sticky should not appear)...');
    
    const desktopStickyVisible = await page.evaluate(() => {
      const stickyElement = document.querySelector('.lg\\:hidden.fixed.top-20');
      return stickyElement && window.getComputedStyle(stickyElement).display !== 'none';
    });
    
    console.log('Desktop sticky visible (should be false):', desktopStickyVisible);
    
    // Test search functionality in sticky mode
    await page.setViewport({ width: 375, height: 667 });
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    
    console.log('🔍 Testing search functionality in sticky mode...');
    
    // Try to type in sticky search box
    const stickySearchInput = await page.$('.lg\\:hidden.fixed.top-20 input[placeholder*="ค้นหาทัวร์"]');
    if (stickySearchInput) {
      await stickySearchInput.type('โตเกียว');
      await page.waitForTimeout(500);
      
      const inputValue = await page.evaluate(() => {
        const input = document.querySelector('.lg\\:hidden.fixed.top-20 input[placeholder*="ค้นหาทัวร์"]');
        return input ? input.value : null;
      });
      
      console.log('Sticky search input value:', inputValue);
    } else {
      console.log('❌ Sticky search input not found');
    }
    
    console.log('✅ Sticky search positioning test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();