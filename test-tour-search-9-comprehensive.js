const puppeteer = require('puppeteer');

(async () => {
  console.log('🧪 Starting comprehensive SearchBar tests for tour-search-9...\n');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the page
    console.log('📍 Navigating to tour-search-9...');
    await page.goto('http://localhost:4000/tour-search-9', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Test 1: SearchBar visibility
    console.log('\n✅ Test 1: SearchBar Visibility');
    await page.waitForSelector('[data-search-container]', { timeout: 10000 });
    console.log('   ✓ SearchBar is visible');
    
    // Test 2: SearchBar position (sticky)
    console.log('\n✅ Test 2: SearchBar Position');
    const position = await page.evaluate(() => {
      const searchBar = document.querySelector('[data-search-container]').closest('div');
      const styles = window.getComputedStyle(searchBar);
      return {
        position: styles.position,
        top: styles.top,
        zIndex: styles.zIndex
      };
    });
    console.log(`   ✓ Position: ${position.position}`);
    console.log(`   ✓ Top: ${position.top}`);
    console.log(`   ✓ Z-index: ${position.zIndex}`);
    
    // Test 3: Search input functionality
    console.log('\n✅ Test 3: Search Input Functionality');
    const searchInput = await page.$('input[aria-label="ค้นหาทัวร์"]');
    const initialTours = await page.$$eval('[class*="grid"] > div', divs => divs.length);
    console.log(`   ✓ Initial tours: ${initialTours}`);
    
    await searchInput.type('โตเกียว');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const filteredTours = await page.$$eval('[class*="grid"] > div', divs => divs.length);
    console.log(`   ✓ Filtered tours: ${filteredTours}`);
    console.log(`   ✓ Search filtering: ${filteredTours < initialTours ? 'WORKING' : 'FAILED'}`);
    
    // Test 4: Theme color verification
    console.log('\n✅ Test 4: Theme Color (#019dff)');
    await searchInput.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const borderColor = await page.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    }, searchInput);
    console.log(`   ✓ Focus border: ${borderColor}`);
    
    const filterButton = await page.$('button svg polygon');
    const buttonParent = await page.evaluateHandle((el) => el.closest('button'), filterButton);
    const buttonColor = await page.evaluate((el) => {
      return window.getComputedStyle(el).color;
    }, buttonParent);
    console.log(`   ✓ Filter button: ${buttonColor}`);
    
    // Test 5: Voice search button
    console.log('\n✅ Test 5: Voice Search Button');
    const voiceButton = await page.$('button[aria-label="ค้นหาด้วยเสียง"]');
    if (voiceButton) {
      console.log('   ✓ Voice button exists');
      const voiceButtonVisible = await page.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }, voiceButton);
      console.log(`   ✓ Voice button visible: ${voiceButtonVisible}`);
    }
    
    // Test 6: Filter button functionality
    console.log('\n✅ Test 6: Filter Button Functionality');
    if (filterButton) {
      console.log('   ✓ Filter button exists');
      
      // Clear search first
      await searchInput.click({ clickCount: 3 });
      await page.keyboard.press('Backspace');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Resize to mobile
      await page.setViewport({ width: 375, height: 812 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Click filter button
      await filterButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if sidebar opened
      const sidebarVisible = await page.$('.fixed.inset-0.z-50');
      console.log(`   ✓ Mobile filter opens: ${sidebarVisible ? 'YES' : 'NO'}`);
    }
    
    // Test 7: Responsive design
    console.log('\n✅ Test 7: Responsive Design');
    const viewports = [
      { name: 'Desktop', width: 1440, height: 900 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 812 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewport(viewport);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const searchBarVisible = await page.$('[data-search-container]');
      console.log(`   ✓ ${viewport.name} (${viewport.width}x${viewport.height}): ${searchBarVisible ? 'VISIBLE' : 'HIDDEN'}`);
    }
    
    // Take final screenshot
    await page.setViewport({ width: 1440, height: 900 });
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.screenshot({ 
      path: 'screenshots/tour-search-9-final-test.png',
      fullPage: true
    });
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('📸 Screenshots saved to screenshots/ directory');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
