"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ChevronRight, Wifi } from "lucide-react";

const MENU = [
  { id: 1, cat: "อาหารหลัก", name: "ข้าวผัดกระเพราหมูสับ", sub: "ไข่ดาว / ไม่มีไข่", price: 60, emoji: "🍳", popular: true },
  { id: 2, cat: "อาหารหลัก", name: "ต้มยำกุ้งน้ำข้น", sub: "เผ็ดน้อย / เผ็ดปกติ", price: 120, emoji: "🍲", popular: false },
  { id: 3, cat: "อาหารหลัก", name: "ผัดไทยกุ้งสด", sub: "พร้อมเครื่องเคียง", price: 80, emoji: "🍜", popular: true },
  { id: 4, cat: "อาหารหลัก", name: "แกงเขียวหวานไก่", sub: "ข้าวสวย / ขนมปัง", price: 75, emoji: "🥘", popular: false },
  { id: 5, cat: "เครื่องดื่ม", name: "ชาไทยเย็น", sub: "หวานน้อย / หวานปกติ", price: 35, emoji: "🧋", popular: true },
  { id: 6, cat: "เครื่องดื่ม", name: "น้ำมะนาวโซดา", sub: "เพิ่มน้ำตาลได้", price: 30, emoji: "🍋", popular: false },
  { id: 7, cat: "ของหวาน", name: "ข้าวเหนียวมะม่วง", sub: "มะม่วงน้ำดอกไม้", price: 55, emoji: "🥭", popular: true },
  { id: 8, cat: "ของหวาน", name: "บัวลอยไข่หวาน", sub: "เสิร์ฟร้อน", price: 40, emoji: "🍡", popular: false },
];

const CATS = ["ทั้งหมด", "อาหารหลัก", "เครื่องดื่ม", "ของหวาน"];

export default function QROrderDemo() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCat, setActiveCat] = useState("ทั้งหมด");
  const [showCart, setShowCart] = useState(false);

  const filtered = activeCat === "ทั้งหมด" ? MENU : MENU.filter((m) => m.cat === activeCat);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU.find((m) => m.id === Number(id));
    return sum + (item?.price ?? 0) * qty;
  }, 0);
  const cartItems = MENU.filter((m) => cart[m.id] > 0);

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const sub = (id: number) => setCart((c) => {
    const next = { ...c, [id]: (c[id] ?? 0) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });

  return (
    <div className="min-h-screen" style={{ background: "#111418", color: "#f1f5f9" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-[48px]" style={{ borderBottom: "0.5px solid #1e2530", background: "#0d1117" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[12px] text-[#64748b] hover:text-[#94a3b8] transition-colors">
          <ArrowLeft size={13} /> กลับ
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
          <span className="text-[12px] text-[#94a3b8]">Live Demo</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-400">
          <Wifi size={11} />
          <span>Realtime</span>
        </div>
      </div>

      {/* Restaurant header */}
      <div className="px-4 pt-5 pb-4" style={{ background: "linear-gradient(180deg, #0d1117 0%, #111418 100%)" }}>
        <div className="max-w-[440px] mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-[#475569] mb-1 tracking-widest uppercase">โต๊ะ 12 · QR Order</p>
              <h1 className="text-[22px] font-semibold text-white leading-tight">ครัวบ้านไทย</h1>
              <p className="text-[12px] text-[#64748b] mt-0.5">เวลานั่ง: <span className="text-amber-400 font-medium">1:42:07</span> เหลือ</p>
            </div>
            <div className="text-right">
              <div className="text-[28px]">🍽️</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[440px] mx-auto px-4 pb-28">
        {/* Category scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className="px-3.5 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all shrink-0"
              style={
                activeCat === c
                  ? { background: "#f59e0b", color: "#0d1117", fontWeight: 600 }
                  : { background: "#1e2530", color: "#94a3b8", border: "none" }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu list */}
        <div className="space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3"
              style={{ background: "#1a1f2a", border: "0.5px solid #1e2530" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: "#111418" }}>
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-medium text-white truncate">{item.name}</p>
                  {item.popular && (
                    <span className="text-[9px] bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded shrink-0" style={{ border: "0.5px solid #f59e0b40" }}>
                      ยอดนิยม
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#475569] mt-0.5">{item.sub}</p>
                <p className="text-[13px] text-amber-400 font-medium mt-0.5">{item.price} ฿</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {cart[item.id] ? (
                  <>
                    <button
                      onClick={() => sub(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: "#1e2530", color: "#94a3b8" }}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-[13px] font-semibold text-white w-4 text-center">{cart[item.id]}</span>
                    <button
                      onClick={() => add(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: "#f59e0b", color: "#0d1117" }}
                    >
                      <Plus size={12} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => add(item.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "#1e2530", color: "#94a3b8" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f59e0b"; (e.currentTarget as HTMLButtonElement).style.color = "#0d1117"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#1e2530"; (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8"; }}
                  >
                    <Plus size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-5 pt-2" style={{ background: "linear-gradient(0deg, #0d1117 80%, transparent)" }}>
          <div className="max-w-[440px] mx-auto">
            <button
              onClick={() => setShowCart(!showCart)}
              className="w-full rounded-xl px-5 py-3.5 flex items-center justify-between transition-all"
              style={{ background: "#f59e0b" }}
            >
              <span className="text-[13px] font-semibold text-[#0d1117]">{totalItems} รายการ</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#0d1117]">{totalPrice} บาท</span>
                <ChevronRight size={16} style={{ color: "#0d1117", transform: showCart ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
              </div>
            </button>

            {showCart && (
              <div className="mt-2 rounded-xl overflow-hidden" style={{ background: "#1a1f2a", border: "0.5px solid #1e2530" }}>
                {cartItems.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: i > 0 ? "0.5px solid #1e2530" : "none" }}>
                    <span className="text-[12px] text-[#94a3b8]">{item.emoji} {item.name}</span>
                    <span className="text-[12px] text-amber-400">×{cart[item.id]} · {item.price * cart[item.id]} ฿</span>
                  </div>
                ))}
                <div className="px-4 py-3" style={{ borderTop: "0.5px solid #1e2530" }}>
                  <button className="w-full py-2.5 rounded-lg text-[13px] font-semibold text-[#0d1117] transition-colors" style={{ background: "#f59e0b" }}>
                    ยืนยันสั่งอาหาร
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
