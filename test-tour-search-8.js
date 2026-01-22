const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('🔍 Navigating to http://localhost:4000/tour-search-8...');
  await page.goto('http://localhost:4000/tour-search-8', { 
    waitUntil: 'networkidle2',
    timeout: 30000 
  });
  
  console.log('✅ Page loaded');
  
  // Wait for PopularDestinations section
  await page.waitForSelector('h2', { timeout: 10000 });
  
  // Wait a bit for layout
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Get all card info from the grid
  const cardInfo = await page.evaluate(() => {
    const grid = document.querySelector('.sm\\:grid.sm\\:grid-cols-2.lg\\:grid-cols-3');
    if (!grid) return { found: false, cards: [] };
    
    const cards = Array.from(grid.children);
    
    return {
      found: true,
      gridClasses: grid.className,
      cards: cards.map((card, index) => {
        const computedStyle = window.getComputedStyle(card);
        const inlineStyle = card.getAttribute('style');
        return {
          index,
          height: computedStyle.height,
          inlineStyle: inlineStyle,
          name: card.querySelector('h3')?.textContent || 'Unknown'
        };
      })
    };
  });
  
  console.log('\n📊 Grid Analysis:');
  console.log('Grid found:', cardInfo.found);
  if (cardInfo.found) {
    console.log('Grid classes:', cardInfo.gridClasses);
    console.log('\nCards:');
    cardInfo.cards.forEach(card => {
      console.log(`  ${card.index + 1}. ${card.name}: ${card.height} (style: ${card.inlineStyle})`);
    });
    
    // Group by columns (every 3 cards)
    console.log('\n📐 Column Distribution (3 columns):');
    for (let col = 0; col < 3; col++) {
      const colCards = cardInfo.cards.filter((_, idx) => idx % 3 === col);
      const totalHeight = colCards.reduce((sum, card) => {
        const h = parseInt(card.height) || 0;
        return sum + h + 16; // 16px gap
      }, 0);
      console.log(`  Column ${col + 1}: ${colCards.length} cards, total ~${totalHeight}px`);
      colCards.forEach(card => {
        console.log(`    - ${card.name}: ${card.height}`);
      });
    }
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: '/tmp/tour-search-8-desktop.png',
    fullPage: false
  });
  
  console.log('\n✅ Screenshot saved to /tmp/tour-search-8-desktop.png');
  
  await browser.close();
})();
