-- ============================================
-- Tire Stock Dashboard — Supabase Table Schema
-- รันสคริปต์นี้ใน Supabase: Dashboard > SQL Editor > New query
-- ============================================

create table if not exists tire_stock (
  id            bigint generated always as identity primary key,
  item_name     text,
  brand         text,
  product_group text,
  year          int4,
  qty           int4,
  updated_at    timestamptz default now()
);

-- เปิด Row Level Security
alter table tire_stock enable row level security;

-- อนุญาตให้ anon key อ่านข้อมูลได้ (สำหรับหน้า Dashboard)
create policy "Allow public read access"
  on tire_stock for select
  to anon
  using (true);

-- อนุญาตให้ anon key เขียน/ลบข้อมูลได้ (สำหรับหน้าอัปโหลด)
-- หมายเหตุ: ถ้าต้องการจำกัดสิทธิ์การเขียนเฉพาะผู้ใช้ที่ login แล้ว
-- ให้เปลี่ยน "to anon" เป็น "to authenticated" และเพิ่มระบบ login ในแอป
create policy "Allow public insert access"
  on tire_stock for insert
  to anon
  with check (true);

create policy "Allow public delete access"
  on tire_stock for delete
  to anon
  using (true);

-- Index สำหรับการค้นหา/กรองที่ใช้บ่อยในหน้า Dashboard
create index if not exists idx_tire_stock_brand on tire_stock (brand);
create index if not exists idx_tire_stock_year on tire_stock (year);
create index if not exists idx_tire_stock_qty on tire_stock (qty);
