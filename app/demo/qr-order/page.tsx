"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingBag, Wifi, Clock } from "lucide-react";

const MENU = [
  { id: 1, cat: "อาหารหลัก", name: "ข้าวผัดกระเพราหมูสับ", price: 60, emoji: "🍳" },
  { id: 2, cat: "อาหารหลัก", name: "ต้มยำกุ้งน้ำข้น", price: 120, emoji: "🍲" },
  { id: 3, cat: "อาหารหลัก", name: "ผัดไทยกุ้งสด", price: 80, emoji: "🍜" },
  { id: 4, cat: "เครื่องดื่ม", name: "ชาไทยเย็น", price: 35, emoji: "🧋" },
  { id: 5, cat: "เครื่องดื่ม", name: "น้ำมะนาวโซดา", price: 30, emoji: "🍋" },
  { id: 6, cat: "ของหวาน", name: "ข้าวเหนียวมะม่วง", price: 55, emoji: "🥭" },
];

const CATS = ["ทั้งหมด", "อาหารหลัก", "เครื่องดื่ม", "ของหวาน"];

const ORDERS = [
  { id: "ORD-001", table: "โต๊ะ 3", items: 3, status: "กำลังทำ", time: "2 นาที" },
  { id: "ORD-002", table: "โต๊ะ 7", items: 2, status: "เสร็จแล้ว", time: "8 นาที" },
  { id: "ORD-003", table: "โต๊ะ 12", items: 4, status: "กำลังทำ", time: "5 นาที" },
];

export default function QROrderDemo() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCat, setActiveCat] = useState("ทั้งหมด");
  const [view, setView] = useState<"menu" | "kitchen">("menu");

  const filtered = activeCat === "ทั้งหมด" ? MENU : MENU.filter((m) => m.cat === activeCat);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU.find((m) => m.id === Number(id));
    return sum + (item?.price ?? 0) * qty;
  }, 0);

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const sub = (id: number) => setCart((c) => {
    const next = { ...c, [id]: (c[id] ?? 0) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8faff" }}>
      {/* Top bar */}
      <div className="bg-white flex items-center justify-between px-4 h-[52px]" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[13px] text-[#64748b] hover:text-[#1A56DB] transition-colors">
          <ArrowLeft size={15} /> กลับหน้าหลัก
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-[#EFF6FF] text-[#1A56DB] px-2 py-0.5 rounded-full" style={{ border: "0.5px solid #BFDBFE" }}>Demo</span>
          <span className="text-[13px] font-medium text-[#0f172a]">QR Order System</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#10b981]">
          <Wifi size={12} />
          <span>Realtime</span>
        </div>
      </div>

      <div className="flex-1 max-w-[860px] mx-auto w-full px-4 py-4 flex flex-col gap-4">
        {/* Restaurant header */}
        <div className="bg-white rounded-xl px-5 py-4 flex items-center justify-between" style={{ border: "0.5px solid #e2e8f0" }}>
          <div>
            <p className="text-[16px] font-medium text-[#0f172a]">🍽️ ร้านครัวบ้านไทย</p>
            <p className="text-[12px] text-[#64748b] mt-0.5">โต๊ะ 12 · สแกน QR แล้วสั่งได้เลย</p>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#f59e0b]">
            <Clock size={13} />
            <span>เวลานั่ง: 1:42:07</span>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex gap-0 bg-white rounded-lg overflow-hidden self-start" style={{ border: "0.5px solid #e2e8f0" }}>
          {(["menu", "kitchen"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-[13px] transition-colors ${
                view === v ? "bg-[#1A56DB] text-white" : "text-[#64748b] hover:text-[#1A56DB]"
              }`}
            >
              {v === "menu" ? "เมนูอาหาร" : "Kitchen View"}
            </button>
          ))}
        </div>

        {view === "menu" ? (
          <>
            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-3 py-1.5 rounded-full text-[12px] transition-colors ${
                    activeCat === c
                      ? "bg-[#1A56DB] text-white"
                      : "bg-white text-[#64748b] hover:border-[#93c5fd]"
                  }`}
                  style={activeCat !== c ? { border: "0.5px solid #e2e8f0" } : {}}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Menu grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden" style={{ border: "0.5px solid #e2e8f0" }}>
                  <div className="h-[80px] flex items-center justify-center text-4xl" style={{ background: "#f8faff" }}>
                    {item.emoji}
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-medium text-[#0f172a] leading-tight mb-0.5">{item.name}</p>
                    <p className="text-[12px] text-[#64748b] mb-2.5">{item.price} บาท</p>
                    <div className="flex items-center justify-between">
                      {cart[item.id] ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => sub(item.id)} className="w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center hover:bg-[#e2e8f0] transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-[13px] font-medium w-4 text-center">{cart[item.id]}</span>
                          <button onClick={() => add(item.id)} className="w-6 h-6 rounded-full bg-[#1A56DB] flex items-center justify-center hover:bg-[#1446c0] transition-colors">
                            <Plus size={12} className="text-white" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => add(item.id)} className="flex items-center gap-1 text-[12px] text-[#1A56DB] hover:underline">
                          <Plus size={13} /> เพิ่ม
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart bar */}
            {totalItems > 0 && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-4 z-10">
                <button className="w-full bg-[#1A56DB] text-white rounded-xl px-5 py-3.5 flex items-center justify-between hover:bg-[#1446c0] transition-colors">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={16} />
                    <span className="text-[13px]">{totalItems} รายการ</span>
                  </div>
                  <span className="text-[13px] font-medium">สั่งอาหาร — {totalPrice} บาท</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Kitchen view */
          <div>
            <p className="text-[12px] text-[#94a3b8] uppercase tracking-wider mb-3">ออเดอร์ที่เข้ามา</p>
            <div className="space-y-3">
              {ORDERS.map((o) => (
                <div key={o.id} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between" style={{ border: "0.5px solid #e2e8f0" }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${o.status === "กำลังทำ" ? "bg-[#f59e0b] animate-pulse" : "bg-[#10b981]"}`} />
                    <div>
                      <p className="text-[13px] font-medium text-[#0f172a]">{o.id} · {o.table}</p>
                      <p className="text-[11px] text-[#64748b]">{o.items} รายการ · เข้ามา {o.time}ที่แล้ว</p>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full ${
                    o.status === "กำลังทำ"
                      ? "bg-[#FEF3C7] text-[#92400e]"
                      : "bg-[#DCFCE7] text-[#166534]"
                  }`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
