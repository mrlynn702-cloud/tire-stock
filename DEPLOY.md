# คู่มือติดตั้ง — GitHub + Vercel + Supabase

ทำตามลำดับนี้ 4 ขั้นตอน ใช้เวลาประมาณ 10-15 นาที

---

## ขั้นที่ 1: ตั้งค่า Supabase (สร้างฐานข้อมูล)

1. เข้า [supabase.com](https://supabase.com) → เปิดโปรเจกต์ `tire-quality-tracker` เดิม (หรือสร้างโปรเจกต์ใหม่)
2. ไปที่เมนู **SQL Editor** (แถบซ้าย) → **New query**
3. เปิดไฟล์ `schema.sql` ในโปรเจกต์นี้ → คัดลอกทั้งหมด → วางใน SQL Editor → กด **Run**
   - จะได้ table ชื่อ `tire_stock` พร้อม column ครบ และตั้งค่าสิทธิ์ (RLS) ให้อ่าน/เขียนได้แล้ว
4. ไปที่เมนู **Project Settings > API**
   - คัดลอก **Project URL** (เช่น `https://xxxxx.supabase.co`)
   - คัดลอก **anon public key** (อยู่ในหัวข้อ Project API keys — **ห้ามใช้ service_role key**)

---

## ขั้นที่ 2: ใส่ค่าเชื่อมต่อในโค้ด

1. เปิดไฟล์ `config.js`
2. แก้ 3 บรรทัดนี้:
   ```js
   const SUPABASE_URL = "https://xxxxx.supabase.co";   // จากขั้นที่ 1
   const SUPABASE_ANON_KEY = "eyJhbG...";               // จากขั้นที่ 1
   const TABLE_NAME = "tire_stock";
   ```
3. บันทึกไฟล์

---

## ขั้นที่ 3: อัปโหลดโค้ดขึ้น GitHub

1. สร้าง repository ใหม่บน GitHub เช่น `tire-stock-app` (public หรือ private ก็ได้)
2. ในเครื่องคุณ เปิด terminal ที่โฟลเดอร์โปรเจกต์นี้ แล้วรัน:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: tire stock dashboard"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tire-stock-app.git
   git push -u origin main
   ```
   (แทน `<your-username>` ด้วยชื่อ GitHub ของคุณ)

---

## ขั้นที่ 4: Deploy บน Vercel

1. เข้า [vercel.com](https://vercel.com) → ล็อกอินด้วย GitHub
2. กด **Add New... > Project**
3. เลือก repository `tire-stock-app` ที่เพิ่ง push ไป
4. ตั้งค่า Framework Preset เป็น **Other** (เพราะเป็น static HTML ธรรมดา ไม่ต้อง build)
5. กด **Deploy**
6. รอสักครู่ Vercel จะให้ลิงก์ เช่น `https://tire-stock-app.vercel.app`
   - หน้า Dashboard: `https://tire-stock-app.vercel.app/index.html`
   - หน้าอัปโหลด: `https://tire-stock-app.vercel.app/upload.html`

---

## ทดสอบ

1. เปิดลิงก์ `upload.html` → ลองลากไฟล์ Excel เข้าไป → กด "ยืนยันอัปโหลด"
2. เปิดลิงก์ `index.html` → ควรเห็นข้อมูลที่อัปโหลดไปแสดงผลแล้ว

---

## อัปเดตโค้ดในอนาคต

ถ้าแก้ไฟล์เพิ่มเติมทีหลัง แค่ push ขึ้น GitHub ใหม่ Vercel จะ deploy เวอร์ชันใหม่ให้อัตโนมัติ:
```bash
git add .
git commit -m "อธิบายการแก้ไข"
git push
```

## หมายเหตุด้านความปลอดภัย
- `anon key` ที่ใส่ใน `config.js` เป็นคีย์สาธารณะที่ออกแบบมาให้ฝังในโค้ดฝั่งเว็บได้ (ไม่ใช่ความลับ) แต่การควบคุมสิทธิ์จริงๆ อยู่ที่ RLS policy ใน Supabase
- ถ้าต้องการจำกัดว่าใครอัปโหลดข้อมูลได้บ้าง แนะนำให้เพิ่มระบบ login (Supabase Auth) แล้วปรับ policy ใน `schema.sql` จาก `to anon` เป็น `to authenticated`
