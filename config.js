// ============================================
// SUPABASE CONNECTION SETTINGS
// ใส่ค่าจริงของคุณตรงนี้ 3 บรรทัดด้านล่าง
// ============================================

// 1) Project URL เช่น "https://xxxxx.supabase.co"
const SUPABASE_URL = "https://xygvrhzvieulmexyjxuv.supabase.co";

// 2) Anon/Public API Key (ห้ามใช้ service_role key ในหน้าเว็บ)
const SUPABASE_ANON_KEY = "sb_publishable_wCNv0fp4POlUtncwJrug5g_6dNLyXbU";

// 3) ชื่อ Table ที่เก็บสต๊อกยาง
const TABLE_NAME = "tire_stock";

// ============================================
// โครงสร้างคอลัมน์ที่ระบบนี้ใช้ (ต้องมีใน table ของคุณ)
// ============================================
// item_id        text   -- รหัสสินค้า (Item ID) ใช้เทียบว่าเป็นสินค้าเดียวกันเวลารวมยอดซ้ำ
// item_name      text   -- ชื่อสินค้าเต็ม เช่น "ยางนอก 2.50-17 38L 4PR D793 E4 T/T DS (พันฟอยด์) [1x20]"
// brand          text   -- Deestone, BLUHORSE
// product_group  text   -- เช่น "MC TIRE", "BC TUBE", "MC RIM TAPE"
// year           int4   -- ปีของสต๊อก เช่น 2026 (แต่ละปีแยกเป็นคนละแถว)
// qty            int4   -- จำนวนคงเหลือ (จากคอลัมน์ Available)
// updated_at     timestamptz (default now())

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
