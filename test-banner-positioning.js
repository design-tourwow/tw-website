const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('🚀 Testing banner positioning and image changes...');
    
    // Navigate to tour search page
    await page.goto('http://localhost:3000/tour-search-9', { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Wait for banner to load
    await page.waitForSelector('[class*="HotPromotionBanner"]', { timeout: 10000 });
    console.log('✅ Hot promotion banner found');
    
    // Check desktop layout
    await page.setViewport({ width: 1200, height: 800 });
    await page.waitForTimeout(2000);
    
    // Get banner position relative to tour cards
    const bannerRect = await page.evaluate(() => {
      const banner = document.querySelector('[class*="HotPromotionBanner"]')?.parentElement;
      const tourGrid = document.querySelector('[style*="grid-template-columns"]');
      
      if (!banner || !tourGrid) return null;
      
      const bannerTop = banner.getBoundingClientRect().top;
      const tourGridTop = tourGrid.getBoundingClientRect().top;
      
      return {
        bannerTop,
        tourGridTop,
        difference: Math.abs(bannerTop - tourGridTop)
      };
    });
    
    if (bannerRect) {
      console.log('📏 Banner positioning:');
      console.log(`   Banner top: ${bannerRect.bannerTop}px`);
      console.log(`   Tour grid top: ${bannerRect.tourGridTop}px`);
      console.log(`   Difference: ${bannerRect.difference}px`);
      
      if (bannerRect.difference < 50) {
        console.log('✅ Banner is well aligned with tour cards');
      } else {
        console.log('⚠️  Banner alignment could be improved');
      }
    }
    
    // Check if images are loading
    const imageCount = await page.evaluate(() => {
      const images = document.querySelectorAll('[class*="HotPromotionBanner"] img');
      return images.length;
    });
    
    console.log(`📸 Found ${imageCount} banner images`);
    
    // Wait for images to load and check for text overlays
    await page.waitForTimeout(3000);
    
    const hasTextOverlays = await page.evaluate(() => {
      const banner = document.querySelector('[class*="HotPromotionBanner"]');
      if (!banner) return false;
      
      // Check for any text elements that are not the HOT badge
      const textElements = banner.querySelectorAll('*');
      let hasText = false;
      
      for (let element of textElements) {
        const text = element.textContent?.trim();
        if (text && text !== 'HOT' && text.length > 3) {
          console.log('Found text:', text);
          hasText = true;
        }
      }
      
      return hasText;
    });
    
    if (hasTextOverlays) {
      console.log('⚠️  Text overlays still present in banner');
    } else {
      console.log('✅ No text overlays found (only HOT badge should remain)');
    }
    
    // Test mobile layout
    console.log('\n📱 Testing mobile layout...');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(2000);
    
    const mobileLayout = await page.evaluate(() => {
      const banner = document.querySelector('[class*="HotPromotionBanner"]');
      if (!banner) return null;
      
      const desktopBanner = banner.querySelector('.hidden.lg\\:block');
      const mobileBanner = banner.querySelector('.lg\\:hidden');
      
      return {
        hasDesktopBanner: !!desktopBanner,
        hasMobileBanner: !!mobileBanner,
        desktopVisible: desktopBanner ? !desktopBanner.classList.contains('hidden') : false,
        mobileVisible: mobileBanner ? !mobileBanner.classList.contains('hidden') : false
      };
    });
    
    if (mobileLayout) {
      console.log('📱 Mobile layout check:');
      console.log(`   Desktop banner hidden: ${!mobileLayout.desktopVisible}`);
      console.log(`   Mobile banner visible: ${mobileLayout.mobileVisible}`);
    }
    
    console.log('\n✅ Banner positioning and image test completed!');
    console.log('👀 Check the browser window to see the visual results');
    
    // Keep browser open for manual inspection
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();