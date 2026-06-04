"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingBag, X, CheckCircle } from "lucide-react";

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

/* warm amber-red: restaurant signature color */
const BRAND = "#c2410c"; /* orange-700 */
const BRAND_LIGHT = "#fff7ed";

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
    setTimeout(() => { setConfirmed(false); setCart({}); setShowOrder(false); }, 2500);
  };

  return (
    <div className="min-h-screen" style={{ background: "#fafaf8", color: "#1c1917" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-[52px] bg-white" style={{ borderBottom: "0.5px solid #e7e5e4" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[12px] text-[#a8a29e] hover:text-[#78716c] transition-colors">
          <ArrowLeft size={13} /> กลับ
        </Link>
        {/* Restaurant name centered */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-[#1c1917]">ครัวบ้านไทย</span>
          <span className="text-[11px] text-[#a8a29e]">· โต๊ะ 12</span>
        </div>
        {/* Order button */}
        <button
          onClick={() => setShowOrder(true)}
          className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg relative transition-colors"
          style={{ background: BRAND_LIGHT, color: BRAND, border: `0.5px solid #fed7aa` }}
        >
          <ShoppingBag size={13} />
          รายการที่สั่ง
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: BRAND }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Hero band */}
      <div className="px-4 pt-5 pb-4" style={{ background: BRAND_LIGHT, borderBottom: "0.5px solid #fed7aa" }}>
        <div className="max-w-[440px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-[22px] font-bold" style={{ color: BRAND }}>ครัวบ้านไทย 🍽️</p>
            <p className="text-[12px] text-[#a8a29e] mt-0.5">เวลานั่งเหลือ <span className="font-medium" style={{ color: BRAND }}>1:42:07</span></p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: BRAND }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            รับออเดอร์อยู่
          </div>
        </div>
      </div>

      <div className="max-w-[440px] mx-auto px-4 pb-8 pt-4">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className="px-3.5 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all shrink-0"
              style={
                activeCat === c
                  ? { background: BRAND, color: "#fff", fontWeight: 600 }
                  : { background: "#fff", color: "#78716c", border: "0.5px solid #e7e5e4" }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu list */}
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 bg-white"
              style={{ border: "0.5px solid #e7e5e4" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: "#fafaf8" }}>
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[13px] font-medium text-[#1c1917]">{item.name}</p>
                  {item.popular && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#fff7ed", color: BRAND, border: `0.5px solid #fed7aa` }}>
                      ยอดนิยม
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#a8a29e] mt-0.5">{item.sub}</p>
                <p className="text-[13px] font-semibold mt-0.5" style={{ color: BRAND }}>{item.price} ฿</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {cart[item.id] ? (
                  <>
                    <button onClick={() => sub(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-[#78716c]" style={{ background: "#f5f5f4", border: "0.5px solid #e7e5e4" }}>
                      <Minus size={12} />
                    </button>
                    <span className="text-[13px] font-bold w-4 text-center" style={{ color: BRAND }}>{cart[item.id]}</span>
                    <button onClick={() => add(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: BRAND }}>
                      <Plus size={12} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => add(item.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-colors text-[#a8a29e]"
                    style={{ background: "#f5f5f4", border: "0.5px solid #e7e5e4" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = BRAND; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.border = "none"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f5f5f4"; (e.currentTarget as HTMLButtonElement).style.color = "#a8a29e"; (e.currentTarget as HTMLButtonElement).style.border = "0.5px solid #e7e5e4"; }}
                  >
                    <Plus size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order sheet */}
      {showOrder && (
        <>
          <div className="fixed inset-0 z-20" style={{ background: "rgba(28,25,23,0.5)" }} onClick={() => setShowOrder(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-30 rounded-t-2xl bg-white overflow-hidden" style={{ maxHeight: "80vh", border: "0.5px solid #e7e5e4" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "0.5px solid #f5f5f4" }}>
              <div>
                <p className="text-[14px] font-semibold text-[#1c1917]">รายการที่สั่ง</p>
                <p className="text-[11px] text-[#a8a29e] mt-0.5">โต๊ะ 12 · ครัวบ้านไทย</p>
              </div>
              <button onClick={() => setShowOrder(false)} className="w-7 h-7 rounded-full flex items-center justify-center text-[#a8a29e]" style={{ background: "#f5f5f4" }}>
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 160px)" }}>
              {cartItems.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[36px] mb-3">🍽️</p>
                  <p className="text-[13px] text-[#78716c]">ยังไม่มีรายการที่สั่ง</p>
                  <p className="text-[12px] text-[#a8a29e] mt-1">เลือกเมนูแล้วกด + เพื่อเพิ่ม</p>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-5 py-3.5"
                    style={{ borderBottom: i < cartItems.length - 1 ? "0.5px solid #f5f5f4" : "none" }}
                  >
                    <span className="text-xl w-8 text-center">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1c1917] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#a8a29e] mt-0.5">{item.price} ฿ × {cart[item.id]}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => sub(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#78716c]" style={{ background: "#f5f5f4" }}>
                        <Minus size={11} />
                      </button>
                      <span className="text-[13px] font-bold w-4 text-center" style={{ color: BRAND }}>{cart[item.id]}</span>
                      <button onClick={() => add(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#78716c]" style={{ background: "#f5f5f4" }}>
                        <Plus size={11} />
                      </button>
                    </div>
                    <p className="text-[13px] font-semibold w-14 text-right shrink-0" style={{ color: BRAND }}>
                      {item.price * cart[item.id]} ฿
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4" style={{ borderTop: "0.5px solid #f5f5f4" }}>
              {cartItems.length > 0 && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] text-[#78716c]">รวมทั้งหมด</span>
                  <span className="text-[17px] font-bold" style={{ color: BRAND }}>{totalPrice} บาท</span>
                </div>
              )}
              {confirmed ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl" style={{ background: "#f0fdf4", border: "0.5px solid #bbf7d0" }}>
                  <CheckCircle size={15} className="text-emerald-600" />
                  <span className="text-[13px] font-medium text-emerald-700">ส่งออเดอร์ไปครัวแล้ว!</span>
                </div>
              ) : (
                <button
                  onClick={cartItems.length > 0 ? handleConfirm : undefined}
                  className="w-full py-3 rounded-xl text-[13px] font-semibold transition-colors"
                  style={cartItems.length > 0 ? { background: BRAND, color: "#fff" } : { background: "#f5f5f4", color: "#a8a29e" }}
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
