# แผนการปรับปรุงหน้าค้นหาทัวร์ให้แข่งขันกับคู่แข่งได้

## วิเคราะห์จากภาพคู่แข่ง
จากภาพที่ให้มา คู่แข่งมีโครงสร้างดังนี้:
1. **Filter Sidebar ด้านซ้าย** - มีตัวกรองหลายประเภท
2. **Sorting Options ด้านบน** - เรียงลำดับผลการค้นหา
3. **Tour Cards Grid** - แสดงผลการ์ดทัวร์แบบ Grid
4. **Pagination/Infinite Scroll** - โหลดข้อมูลเพิ่มเติม

## สิ่งที่ต้องทำ (ตามลำดับความสำคัญ)

### ✅ Phase 1: SEO Foundation (สำคัญที่สุด)
- [ ] เพิ่ม JSON-LD Schema Markup สำหรับ TourPackage
- [ ] ปรับปรุง H1, H2, H3 tags ให้ถูกต้องตาม SEO
- [ ] เพิ่ม meta descriptions และ Open Graph tags
- [ ] ปรับปรุง Breadcrumb ให้มี Schema Markup
- [ ] เพิ่ม canonical URLs
- [ ] ปรับปรุง alt text ของรูปภาพ

### ✅ Phase 2: Filter Sidebar (ด้านซ้าย)
- [ ] สร้าง FilterSidebar Component
- [ ] ฟิลเตอร์ตามภูมิภาค/ประเทศ
- [ ] ฟิลเตอร์ตามช่วงราคา (slider)
- [ ] ฟิลเตอร์ตามระยะเวลา (3-5 วัน, 6-8 วัน, 9+ วัน)
- [ ] ฟิลเตอร์ตามสายการบิน
- [ ] ฟิลเตอร์ตามคะแนนรีวิว (4+, 3+, 2+, 1+)
- [ ] ฟิลเตอร์ตามประเภททัวร์ (พรีเมี่ยม, ลดพิเศษ, ผจญภัย)
- [ ] ปุ่มล้างตัวกรองทั้งหมด
- [ ] Responsive: แสดงเป็น Drawer บนมือถือ

### ✅ Phase 3: Sorting & Display Options
- [ ] Dropdown เรียงตามความนิยม
- [ ] เรียงตามราคา (ต่ำ-สูง, สูง-ต่ำ)
- [ ] เรียงตามคะแนนรีวิว (สูง-ต่ำ)
- [ ] เรียงตามวันเดินทาง (เร็วสุด-ช้าสุด)
- [ ] แสดงจำนวนผลการค้นหา
- [ ] Toggle มุมมอง (Grid/List)

### ✅ Phase 4: Infinity Scroll
- [ ] ใช้ Intersection Observer API
- [ ] โหลดการ์ดเพิ่มทีละ 9 การ์ด
- [ ] แสดง Loading Skeleton ขณะโหลด
- [ ] Lazy Load รูปภาพ
- [ ] เก็บ scroll position เมื่อกลับมาหน้านี้

### ✅ Phase 5: Responsive Grid Layout
- [ ] Mobile (< 768px): 1 column
- [ ] Tablet (768px - 1024px): 2 columns
- [ ] Desktop (> 1024px): 3 columns
- [ ] รักษาขนาดการ์ดเดิม (aspect-ratio 5:6)
- [ ] Gap ระหว่างการ์ดที่เหมาะสม

### ✅ Phase 6: UX/UI Improvements
- [ ] Smooth transitions และ animations
- [ ] Loading states ที่ชัดเจน
- [ ] Error handling และ empty states
- [ ] Sticky filter sidebar บน desktop
- [ ] Back to top button
- [ ] Search bar ที่ทำงานได้จริง
- [ ] Filter tags แสดงตัวกรองที่เลือก (removable)

### ✅ Phase 7: Performance Optimization
- [ ] Image optimization (Next.js Image)
- [ ] Code splitting
- [ ] Memoization สำหรับ expensive calculations
- [ ] Virtual scrolling (ถ้าจำเป็น)
- [ ] Debounce search input

## กฎเหล็ก (ห้ามทำ)
❌ ห้ามลดขนาดการ์ดทัวร์
❌ ห้ามใช้ Pagination (ใช้ Infinity Scroll เท่านั้น)
❌ ห้ามใช้สีหรือ Gradient มากเกินไป
❌ ห้ามเปลี่ยนแปลงโครงสร้างการ์ดทัวร์ที่มีอยู่

## Timeline
- Phase 1-2: 30 นาที
- Phase 3-4: 20 นาที
- Phase 5-6: 15 นาที
- Phase 7: 10 นาที
- Testing: 10 นาที

**รวมเวลา: ~1.5 ชั่วโมง**
