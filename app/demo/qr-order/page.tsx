"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingBag, X, Wifi, CheckCircle } from "lucide-react";

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
  const [showOrder, setShowOrder] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setCart({});
      setShowOrder(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen" style={{ background: "#111418", color: "#f1f5f9" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-[48px]" style={{ borderBottom: "0.5px solid #1e2530", background: "#0d1117" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[12px] text-[#64748b] hover:text-[#94a3b8] transition-colors">
          <ArrowLeft size={13} /> กลับ
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[12px] text-[#94a3b8]">Live Demo</span>
        </div>
        {/* รายการที่สั่ง button */}
        <button
          onClick={() => setShowOrder(true)}
          className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg transition-colors relative"
          style={{ background: "#1e2530", color: "#94a3b8", border: "0.5px solid #2a3040" }}
        >
          <ShoppingBag size={13} />
          รายการที่สั่ง
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center" style={{ background: "#f59e0b", color: "#0d1117" }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Restaurant header */}
      <div className="px-4 pt-5 pb-4" style={{ background: "linear-gradient(180deg, #0d1117 0%, #111418 100%)" }}>
        <div className="max-w-[440px] mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] text-[#475569] mb-1">โต๊ะ 12 · QR Order</p>
              <h1 className="text-[22px] font-semibold text-white leading-tight">ครัวบ้านไทย</h1>
              <p className="text-[12px] text-[#64748b] mt-0.5">เวลานั่ง: <span className="text-amber-400 font-medium">1:42:07</span> เหลือ</p>
            </div>
            <div className="text-[28px]">🍽️</div>
          </div>
        </div>
      </div>

      <div className="max-w-[440px] mx-auto px-4 pb-8">
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
                  : { background: "#1e2530", color: "#94a3b8" }
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
                    <span className="text-[9px] text-amber-400 px-1.5 py-0.5 rounded shrink-0" style={{ background: "#f59e0b18", border: "0.5px solid #f59e0b40" }}>
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
                    <button onClick={() => sub(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#1e2530", color: "#94a3b8" }}>
                      <Minus size={12} />
                    </button>
                    <span className="text-[13px] font-semibold text-white w-4 text-center">{cart[item.id]}</span>
                    <button onClick={() => add(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#f59e0b", color: "#0d1117" }}>
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

      {/* Order sheet overlay */}
      {showOrder && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-20"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setShowOrder(false)}
          />
          {/* Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-30 rounded-t-2xl overflow-hidden"
            style={{ background: "#1a1f2a", border: "0.5px solid #2a3040", maxHeight: "80vh" }}
          >
            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "0.5px solid #1e2530" }}>
              <div>
                <p className="text-[14px] font-semibold text-white">รายการที่สั่ง</p>
                <p className="text-[11px] text-[#475569] mt-0.5">โต๊ะ 12 · ครัวบ้านไทย</p>
              </div>
              <button onClick={() => setShowOrder(false)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#111418", color: "#64748b" }}>
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 160px)" }}>
              {cartItems.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[32px] mb-3">🍽️</p>
                  <p className="text-[13px] text-[#475569]">ยังไม่มีรายการที่สั่ง</p>
                  <p className="text-[12px] text-[#2a3040] mt-1">เลือกเมนูแล้วกด + เพื่อเพิ่ม</p>
                </div>
              ) : (
                <div>
                  {cartItems.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-5 py-3.5"
                      style={{ borderBottom: i < cartItems.length - 1 ? "0.5px solid #1e2530" : "none" }}
                    >
                      <span className="text-xl w-8 text-center">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-white font-medium truncate">{item.name}</p>
                        <p className="text-[11px] text-[#475569] mt-0.5">{item.price} ฿ × {cart[item.id]}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => sub(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#111418", color: "#64748b" }}>
                          <Minus size={11} />
                        </button>
                        <span className="text-[13px] font-semibold text-white w-4 text-center">{cart[item.id]}</span>
                        <button onClick={() => add(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#111418", color: "#64748b" }}>
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="text-[13px] text-amber-400 font-medium w-14 text-right shrink-0">
                        {item.price * cart[item.id]} ฿
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4" style={{ borderTop: "0.5px solid #1e2530" }}>
              {cartItems.length > 0 && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] text-[#64748b]">รวมทั้งหมด</span>
                  <span className="text-[16px] font-bold text-amber-400">{totalPrice} บาท</span>
                </div>
              )}
              {confirmed ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl" style={{ background: "#1e2a20", border: "0.5px solid #22c55e40" }}>
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span className="text-[13px] text-emerald-400 font-medium">ส่งออเดอร์ไปครัวแล้ว!</span>
                </div>
              ) : (
                <button
                  onClick={cartItems.length > 0 ? handleConfirm : undefined}
                  className="w-full py-3 rounded-xl text-[13px] font-semibold transition-colors"
                  style={
                    cartItems.length > 0
                      ? { background: "#f59e0b", color: "#0d1117" }
                      : { background: "#1e2530", color: "#2a3040" }
                  }
                >
                  {cartItems.length > 0 ? `ยืนยันสั่ง ${totalItems} รายการ` : "เพิ่มรายการก่อน"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
