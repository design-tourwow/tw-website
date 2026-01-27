const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('🚀 Testing Tour Search 9 - Popular Tags Bar...');
    
    // Navigate to tour-search-9
    await page.goto('http://localhost:4000/tour-search-9', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Wait for tags to load
    await page.waitForSelector('[data-testid="popular-tags-bar"], .popular-tags-bar, div:has(button[class*="bg-blue-50"])', { timeout: 10000 });
    console.log('✅ Popular Tags Bar found');
    
    // Test 1: Check if tags are visible
    const tags = await page.$$eval('button[class*="bg-blue-50"], button[class*="bg-purple-50"], button[class*="bg-green-50"]', 
      buttons => buttons.map(btn => btn.textContent.trim())
    );
    
    console.log('📋 Found tags:', tags);
    
    if (tags.length > 0) {
      console.log('✅ Tags are visible');
    } else {
      console.log('❌ No tags found');
    }
    
    // Test 2: Test scroll functionality
    const scrollContainer = await page.$('div[class*="overflow-x-auto"]');
    if (scrollContainer) {
      console.log('✅ Scroll container found');
      
      // Check if scroll buttons exist
      const leftButton = await page.$('button[aria-label="เลื่อนซ้าย"]');
      const rightButton = await page.$('button[aria-label="เลื่อนขวา"]');
      
      if (rightButton) {
        console.log('✅ Right scroll button found');
        await rightButton.click();
        await page.waitForTimeout(1000);
        console.log('✅ Right scroll button clicked');
      }
      
      if (leftButton) {
        console.log('✅ Left scroll button found');
        await leftButton.click();
        await page.waitForTimeout(1000);
        console.log('✅ Left scroll button clicked');
      }
    }
    
    // Test 3: Test tag click navigation
    console.log('🔗 Testing tag navigation...');
    
    // Find Tokyo tag and click it
    const tokyoTag = await page.$('button:has-text("ทัวร์ญี่ปุ่น โตเกียว")') || 
                     await page.$x('//button[contains(text(), "โตเกียว")]');
    
    if (tokyoTag && tokyoTag[0]) {
      console.log('✅ Tokyo tag found');
      await tokyoTag[0].click();
      
      // Wait for navigation
      await page.waitForTimeout(2000);
      
      // Check if URL changed
      const currentUrl = page.url();
      console.log('📍 Current URL:', currentUrl);
      
      if (currentUrl.includes('/tokyo')) {
        console.log('✅ Navigation to Tokyo page successful');
        
        // Check if page content updated
        const pageTitle = await page.$eval('h1', el => el.textContent);
        console.log('📄 Page title:', pageTitle);
        
        if (pageTitle.includes('โตเกียว')) {
          console.log('✅ Page content updated correctly');
        }
      } else {
        console.log('❌ Navigation failed');
      }
    } else {
      console.log('❌ Tokyo tag not found');
    }
    
    // Test 4: Test mobile responsiveness
    console.log('📱 Testing mobile responsiveness...');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Check if tags are still visible on mobile
    const mobileTags = await page.$$('button[class*="bg-blue-50"], button[class*="bg-purple-50"], button[class*="bg-green-50"]');
    if (mobileTags.length > 0) {
      console.log('✅ Tags visible on mobile');
    } else {
      console.log('❌ Tags not visible on mobile');
    }
    
    // Test scroll on mobile
    const mobileScrollContainer = await page.$('div[class*="overflow-x-auto"]');
    if (mobileScrollContainer) {
      await page.evaluate((element) => {
        element.scrollBy({ left: 100, behavior: 'smooth' });
      }, mobileScrollContainer);
      await page.waitForTimeout(1000);
      console.log('✅ Mobile scroll test completed');
    }
    
    console.log('🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  // Keep browser open for manual inspection
  console.log('🔍 Browser will stay open for manual inspection...');
  // await browser.close();
})();