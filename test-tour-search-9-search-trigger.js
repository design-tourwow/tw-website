const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  console.log('🚀 Testing Tour Search 9 - Search Button Trigger & Tour Suggestions');
  console.log('='.repeat(70));

  try {
    // Navigate to the page
    await page.goto('http://localhost:3000/tour-search-9', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded successfully');
    await page.waitForTimeout(1000);

    // Test 1: Click searchbox to show popular tags
    console.log('\n📝 Test 1: Click searchbox to show popular keyword tags');
    await page.click('input[aria-label="ค้นหาทัวร์"]');
    await page.waitForTimeout(500);
    
    const hasPopularTags = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.top-full');
      return dropdown && dropdown.textContent.includes('คำค้นหายอดนิยม');
    });
    console.log(hasPopularTags ? '✅ Popular tags dropdown shown' : '❌ Popular tags not shown');

    // Test 2: Select a tag (should not trigger search immediately)
    console.log('\n📝 Test 2: Select a tag (should not trigger search)');
    const initialResultCount = await page.evaluate(() => {
      const text = document.body.textContent;
      const match = text.match(/พบ.*?ทัวร์ญี่ปุ่น.*?\((\d+) โปรแกรม\)/);
      return match ? parseInt(match[1]) : 0;
    });
    console.log(`Initial result count: ${initialResultCount}`);

    // Click first tag
    await page.evaluate(() => {
      const firstTag = document.querySelector('.absolute.top-full button');
      if (firstTag) firstTag.click();
    });
    await page.waitForTimeout(500);

    const afterTagSelect = await page.evaluate(() => {
      const text = document.body.textContent;
      const match = text.match(/พบ.*?ทัวร์ญี่ปุ่น.*?\((\d+) โปรแกรม\)/);
      return match ? parseInt(match[1]) : 0;
    });
    console.log(afterTagSelect === initialResultCount ? 
      '✅ Results NOT changed (correct - waiting for search button)' : 
      '❌ Results changed immediately (incorrect)');

    // Test 3: Click search button to trigger search
    console.log('\n📝 Test 3: Click search button to trigger search');
    await page.evaluate(() => {
      const searchButton = document.querySelector('button[aria-label="ค้นหา"]');
      if (searchButton) searchButton.click();
    });
    await page.waitForTimeout(1000);

    const afterSearch = await page.evaluate(() => {
      const text = document.body.textContent;
      const match = text.match(/พบ.*?ทัวร์ญี่ปุ่น.*?\((\d+) โปรแกรม\)/);
      return match ? parseInt(match[1]) : 0;
    });
    console.log(`After search: ${afterSearch} results`);
    console.log(afterSearch !== initialResultCount ? 
      '✅ Search triggered successfully' : 
      '⚠️  Results unchanged (may need to check search logic)');

    // Test 4: Type text to show tour name suggestions
    console.log('\n📝 Test 4: Type text to show tour name suggestions');
    await page.click('input[aria-label="ค้นหาทัวร์"]');
    await page.waitForTimeout(300);
    
    // Clear input first
    await page.evaluate(() => {
      const input = document.querySelector('input[aria-label="ค้นหาทัวร์"]');
      if (input) input.value = '';
    });
    
    // Type "บาหลี"
    await page.type('input[aria-label="ค้นหาทัวร์"]', 'บาหลี', { delay: 100 });
    await page.waitForTimeout(500);

    const hasTourSuggestions = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.top-full');
      return dropdown && dropdown.textContent.includes('โปรแกรมทัวร์ที่เกี่ยวข้อง');
    });
    console.log(hasTourSuggestions ? 
      '✅ Tour name suggestions shown' : 
      '❌ Tour suggestions not shown');

    // Check if suggestions are in vertical list format
    const isVerticalList = await page.evaluate(() => {
      const suggestions = document.querySelectorAll('.absolute.top-full .flex.flex-col button');
      return suggestions.length > 0;
    });
    console.log(isVerticalList ? 
      '✅ Suggestions displayed as vertical list' : 
      '❌ Suggestions not in vertical format');

    // Test 5: Type text matching tour highlights
    console.log('\n📝 Test 5: Type text matching tour highlights (e.g., "วัดเบ")');
    await page.evaluate(() => {
      const input = document.querySelector('input[aria-label="ค้นหาทัวร์"]');
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(300);
    
    await page.type('input[aria-label="ค้นหาทัวร์"]', 'วัดเบ', { delay: 100 });
    await page.waitForTimeout(500);

    const highlightMatch = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.top-full');
      if (!dropdown) return false;
      // Should show tour title that contains this highlight
      return dropdown.textContent.includes('บาหลี');
    });
    console.log(highlightMatch ? 
      '✅ Tour with matching highlight shown' : 
      '⚠️  No tour with matching highlight (may need more test data)');

    // Test 6: Verify max 5 suggestions
    console.log('\n📝 Test 6: Verify max 5 tour suggestions');
    await page.evaluate(() => {
      const input = document.querySelector('input[aria-label="ค้นหาทัวร์"]');
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(300);
    
    await page.type('input[aria-label="ค้นหาทัวร์"]', 'ทัวร์', { delay: 100 });
    await page.waitForTimeout(500);

    const suggestionCount = await page.evaluate(() => {
      const suggestions = document.querySelectorAll('.absolute.top-full .flex.flex-col button');
      return suggestions.length;
    });
    console.log(`Found ${suggestionCount} suggestions`);
    console.log(suggestionCount <= 5 ? 
      '✅ Max 5 suggestions enforced' : 
      '❌ More than 5 suggestions shown');

    // Test 7: Verify dropdown is scrollable
    console.log('\n📝 Test 7: Verify dropdown is scrollable');
    const isScrollable = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.top-full');
      if (!dropdown) return false;
      const styles = window.getComputedStyle(dropdown);
      return styles.maxHeight !== 'none' && styles.overflowY === 'auto';
    });
    console.log(isScrollable ? 
      '✅ Dropdown is scrollable' : 
      '❌ Dropdown not scrollable');

    // Test 8: Remove tag and verify search button required
    console.log('\n📝 Test 8: Remove tag and verify search button required');
    await page.evaluate(() => {
      const removeButton = document.querySelector('button span[role="button"]');
      if (removeButton) removeButton.click();
    });
    await page.waitForTimeout(500);

    const afterRemove = await page.evaluate(() => {
      const text = document.body.textContent;
      const match = text.match(/พบ.*?ทัวร์ญี่ปุ่น.*?\((\d+) โปรแกรม\)/);
      return match ? parseInt(match[1]) : 0;
    });
    console.log(afterRemove === afterSearch ? 
      '✅ Results NOT changed after removing tag (correct - waiting for search button)' : 
      '❌ Results changed immediately (incorrect)');

    console.log('\n' + '='.repeat(70));
    console.log('✅ All tests completed!');
    console.log('\nKeeping browser open for manual inspection...');
    console.log('Press Ctrl+C to close');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    await browser.close();
  }
})();
