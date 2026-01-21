#!/bin/bash

# Script สำหรับ Deploy หน้าค้นหาทัวร์ใหม่

echo "🚀 เริ่มต้น Deploy หน้าค้นหาทัวร์ใหม่..."

# 1. Backup ไฟล์เดิม
echo "📦 Backup ไฟล์เดิม..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp src/app/tour-search-78/page.tsx "src/app/tour-search-78/page-backup-${TIMESTAMP}.tsx"
echo "✅ Backup เสร็จสิ้น: page-backup-${TIMESTAMP}.tsx"

# 2. Deploy ไฟล์ใหม่
echo "🔄 Deploy ไฟล์ใหม่..."
mv src/app/tour-search-78/page-new.tsx src/app/tour-search-78/page.tsx
echo "✅ Deploy เสร็จสิ้น"

# 3. ตรวจสอบ Syntax Errors
echo "🔍 ตรวจสอบ Syntax Errors..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ ไม่พบ Syntax Errors"
else
    echo "❌ พบ Syntax Errors - กรุณาแก้ไขก่อน Deploy"
    exit 1
fi

# 4. Build Project
echo "🏗️  Build Project..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build สำเร็จ"
else
    echo "❌ Build ล้มเหลว - Rollback ไฟล์เดิม"
    mv "src/app/tour-search-78/page-backup-${TIMESTAMP}.tsx" src/app/tour-search-78/page.tsx
    exit 1
fi

echo "🎉 Deploy เสร็จสมบูรณ์!"
echo ""
echo "📝 สิ่งที่ควรทำต่อ:"
echo "1. ทดสอบหน้าเว็บที่ http://localhost:4000/tour-search-78"
echo "2. ตรวจสอบ SEO ด้วย Google Search Console"
echo "3. ทดสอบ Performance ด้วย Lighthouse"
echo "4. Monitor Analytics และ User Behavior"
echo ""
echo "💾 ไฟล์ Backup: src/app/tour-search-78/page-backup-${TIMESTAMP}.tsx"
