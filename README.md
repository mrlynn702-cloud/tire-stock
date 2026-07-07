# สต๊อกคงเหลือยาง (Tire Stock Dashboard)

โปรเจกต์ทีมเกราะข้อมูลยาง · Deestone / Bluhorse

## ไฟล์ในโปรเจกต์
- `index.html` — หน้า Dashboard แสดงสต๊อกคงเหลือ (ตัวเลขปิดบังบางส่วน) พร้อมช่องค้นหา/กรอง
- `upload.html` — หน้าอัปโหลดไฟล์ Excel เพื่ออัปเดตข้อมูลสต๊อก (แทนที่ข้อมูลเก่าทั้งหมด)
- `style.css` — ธีมและ responsive layout ใช้ร่วมกันทั้งสองหน้า (รองรับมือถือ)
- `config.js` — จุดตั้งค่าการเชื่อมต่อ Supabase
- `schema.sql` — สคริปต์สร้างตารางและสิทธิ์ (RLS) ใน Supabase
- `DEPLOY.md` — **คู่มือติดตั้งแบบละเอียด (GitHub + Vercel + Supabase) เริ่มจากตรงนี้**

> เริ่มติดตั้งจริง อ่านไฟล์ `DEPLOY.md` ก่อนเลย มีขั้นตอนครบทุกจุด

## วิธีติดตั้งใช้งาน

1. **ตั้งค่า Supabase**
   - สร้าง table ชื่อ `tire_stock` (หรือชื่อที่ต้องการ) ให้มีคอลัมน์:
     - `id` (int8, primary key, auto-increment)
     - `brand` (text) — ยี่ห้อ
     - `size` (text) — ขนาด/เบอร์ยาง
     - `pattern` (text) — รุ่น/ลาย
     - `type` (text) — ประเภท (MC/BC)
     - `subtype` (text) — ชนิด (T/T, T/L)
     - `qty` (int4) — จำนวนคงเหลือ
     - `updated_at` (timestamptz, default now())
   - ตั้งค่า Row Level Security (RLS) policy ให้ anon key อ่าน/เขียนได้ตามที่ต้องการ

2. **แก้ไข `config.js`**
   ใส่ 3 ค่าให้ตรงกับโปรเจกต์ Supabase จริง:
   ```js
   const SUPABASE_URL = "https://xxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "...";
   const TABLE_NAME = "tire_stock";
   ```

3. **เปิดผ่าน local server** (ห้ามเปิดไฟล์ตรงๆ แบบ `file://` เพราะ browser จะบล็อกการโหลด script)
   ตัวอย่างวิธีรัน local server ง่ายๆ:
   ```
   npx serve .
   ```
   หรือใช้ VSCode extension "Live Server"

4. เปิด `index.html` เพื่อดู Dashboard และ `upload.html` เพื่ออัปโหลดไฟล์ Excel

## รูปแบบไฟล์ Excel ที่รองรับ
แถวแรกเป็นหัวตาราง รองรับทั้งชื่อคอลัมน์ภาษาอังกฤษและไทย:

| อังกฤษ | ไทย |
|---|---|
| brand | ยี่ห้อ |
| size | ขนาด |
| pattern | รุ่น / รุ่น/ลาย / ลาย |
| type | ประเภท |
| subtype | ชนิด |
| qty | จำนวน / จำนวนคงเหลือ / คงเหลือ |

## สถานะปัจจุบัน
- [x] หน้า Dashboard (mock/demo ผ่านการตรวจสอบแล้ว)
- [x] หน้าอัปโหลด Excel
- [x] Responsive สำหรับมือถือ
- [x] ช่องค้นหาเบอร์ยาง + ลายยาง
- [ ] เชื่อมต่อ Supabase จริง (รอ URL/Key)
- [ ] ยืนยัน schema คอลัมน์ตามไฟล์ Excel จริงจากผู้ใช้งาน
