"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, ShoppingBag, Plus, Minus, X, CheckCircle,
  ChevronRight, Star, Clock, MapPin, Utensils, Flame,
} from "lucide-react";

/* ─── palette ─── */
const CREAM       = "#faf8f4";
const BRAND       = "#b45309";
const BRAND_DARK  = "#92400e";
const BRAND_MID   = "#d97706";
const BRAND_LIGHT = "#fef3c7";
const BORDER      = "#e8e3da";
const CARD        = "#ffffff";

/* ─── menu ─── */
const MENU = [
  { id: 1, cat: "อาหารหลัก", name: "ข้าวผัดกระเพราหมูสับ", emoji: "🍳", shortName: "ข้าวผัดกระเพรา", desc: "ไข่ดาวกรอบ · เผ็ดปรับได้", price: 60,  popular: true,  color: "#f97316", bg: "linear-gradient(135deg, #7c2d12 0%, #c2410c 55%, #f97316 100%)" },
  { id: 2, cat: "อาหารหลัก", name: "ต้มยำกุ้งน้ำข้น",      emoji: "🍲", shortName: "ต้มยำกุ้ง",       desc: "กุ้งสด 3 ตัว · เข้มข้น",  price: 120, popular: false, color: "#ef4444", bg: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 55%, #ef4444 100%)" },
  { id: 3, cat: "อาหารหลัก", name: "ผัดไทยกุ้งสด",          emoji: "🍜", shortName: "ผัดไทยกุ้ง",      desc: "กุ้งแม่น้ำ · เครื่องเคียงครบ", price: 80, popular: true, color: "#f59e0b", bg: "linear-gradient(135deg, #78350f 0%, #b45309 55%, #f59e0b 100%)" },
  { id: 4, cat: "อาหารหลัก", name: "แกงเขียวหวานไก่",       emoji: "🥘", shortName: "แกงเขียวหวาน",    desc: "ข้าวสวย / ขนมปัง",         price: 75, popular: false, color: "#22c55e", bg: "linear-gradient(135deg, #14532d 0%, #16a34a 55%, #4ade80 100%)" },
  { id: 5, cat: "เครื่องดื่ม", name: "ชาไทยเย็น",           emoji: "🧋", shortName: "ชาไทยเย็น",       desc: "หวานน้อย / หวานปกติ",      price: 35, popular: true,  color: "#f97316", bg: "linear-gradient(135deg, #7c2d12 0%, #ea580c 55%, #fb923c 100%)" },
  { id: 6, cat: "เครื่องดื่ม", name: "น้ำมะนาวโซดา",        emoji: "🍋", shortName: "น้ำมะนาวโซดา",    desc: "สดชื่น · เพิ่มน้ำตาลได้",  price: 30, popular: false, color: "#a3e635", bg: "linear-gradient(135deg, #365314 0%, #4d7c0f 55%, #a3e635 100%)" },
  { id: 7, cat: "ของหวาน",   name: "ข้าวเหนียวมะม่วง",      emoji: "🥭", shortName: "ข้าวเหนียวมะม่วง", desc: "มะม่วงน้ำดอกไม้ · กะทิสด", price: 55, popular: true,  color: "#f59e0b", bg: "linear-gradient(135deg, #78350f 0%, #b45309 55%, #fbbf24 100%)" },
  { id: 8, cat: "ของหวาน",   name: "บัวลอยไข่หวาน",         emoji: "🍡", shortName: "บัวลอยไข่หวาน",   desc: "เสิร์ฟร้อน · ไข่นกกระทา",  price: 40, popular: false, color: "#e879f9", bg: "linear-gradient(135deg, #581c87 0%, #7e22ce 55%, #e879f9 100%)" },
];

const CATS = ["ทั้งหมด", "อาหารหลัก", "เครื่องดื่ม", "ของหวาน"];

function fmtTimer(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function randomOrderNum() { return `#K${Math.floor(200 + Math.random() * 800)}`; }

type View = "landing" | "menu";

export default function QROrderPage() {
  const [view, setView]         = useState<View>("landing");
  const [secs, setSecs]         = useState(6127);
  const [cat, setCat]           = useState("ทั้งหมด");
  const [cart, setCart]         = useState<Record<number, number>>({});
  const [notes, setNotes]       = useState<Record<number, string>>({});
  const [noteOpen, setNoteOpen] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [orderNum, setOrderNum] = useState<string | null>(null);
  const [ripple, setRipple]     = useState<number | null>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered   = cat === "ทั้งหมด" ? MENU : MENU.filter((m) => m.cat === cat);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    return sum + (MENU.find((m) => m.id === Number(id))?.price ?? 0) * qty;
  }, 0);
  const cartItems = MENU.filter((m) => (cart[m.id] ?? 0) > 0);

  const add = (id: number) => {
    setRipple(id);
    setTimeout(() => setRipple(null), 300);
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  };
  const dec = (id: number) => setCart((c) => {
    const next = { ...c, [id]: (c[id] ?? 0) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });

  const handleConfirm = () => {
    const num = randomOrderNum();
    setOrderNum(num);
    setTimeout(() => { setOrderNum(null); setCart({}); setNotes({}); setSheetOpen(false); }, 4000);
  };

  useEffect(() => { if (noteOpen !== null) setTimeout(() => noteRef.current?.focus(), 50); }, [noteOpen]);

  /* ── SUCCESS SCREEN ── */
  if (orderNum) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: CREAM, maxWidth: 440, margin: "0 auto" }}>
        <style>{`
          @keyframes success-pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
          @keyframes fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes ripple-anim { from { transform: scale(0); opacity: 1; } to { transform: scale(4); opacity: 0; } }
        `}</style>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #92400e, #d97706)", animation: "success-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          <CheckCircle size={44} color="#fff" strokeWidth={2.5} />
        </div>
        <p className="text-[28px] font-black mb-1" style={{ color: BRAND_DARK, animation: "fade-in 0.5s 0.3s ease both", opacity: 0 }}>เข้าครัวแล้ว!</p>
        <p className="text-sm mb-5" style={{ color: "#a8a29e", animation: "fade-in 0.5s 0.4s ease both", opacity: 0 }}>ประมาณ 15 นาที</p>
        <div
          className="w-full rounded-2xl px-6 py-5 text-center"
          style={{ background: CARD, border: `2px solid ${BRAND_LIGHT}`, animation: "fade-in 0.5s 0.5s ease both", opacity: 0, boxShadow: "0 8px 32px rgba(180,83,9,0.12)" }}
        >
          <p className="text-xs mb-2 font-medium" style={{ color: "#a8a29e" }}>หมายเลขออเดอร์</p>
          <p className="text-[48px] font-black tracking-wider leading-tight" style={{ color: BRAND }}>{orderNum}</p>
        </div>
        <div
          className="mt-5 flex items-center gap-2 text-xs"
          style={{ color: "#a8a29e", animation: "fade-in 0.5s 0.7s ease both", opacity: 0 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          กำลังกลับสู่เมนู...
        </div>
      </div>
    );
  }

  /* ── LANDING ── */
  if (view === "landing") {
    return (
      <div className="min-h-screen" style={{ background: CREAM, color: "#1c1917", maxWidth: 440, margin: "0 auto" }}>
        <style>{`
          @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
          @keyframes fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes badge-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(180,83,9,0.3); } 50% { box-shadow: 0 0 0 6px rgba(180,83,9,0); } }
        `}</style>

        {/* top bar */}
        <div className="flex items-center justify-between px-4 h-12 sticky top-0 z-10" style={{ background: "rgba(250,248,244,0.95)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${BORDER}` }}>
          <Link href="/" className="flex items-center gap-1 text-xs" style={{ color: "#a8a29e" }}>
            <ArrowLeft size={14} /> กลับ
          </Link>
          <span className="text-[14px] font-black" style={{ color: BRAND_DARK }}>ครัวบ้านไทย</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ animation: "badge-glow 2s ease-in-out infinite" }} />
            <span className="text-[11px] font-medium text-emerald-700">เปิด</span>
          </div>
        </div>

        {/* hero */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #7c2d12 0%, #92400e 30%, #b45309 65%, #d97706 85%, #fbbf24 100%)" }}>
          {/* decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="absolute bottom-0 -left-6 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)" }} />

          <div className="px-5 pt-10 pb-8 relative z-10">
            <div className="text-center mb-5">
              <div className="text-6xl mb-3" style={{ animation: "hero-float 3s ease-in-out infinite" }}>🍜</div>
              <h1 className="text-[32px] font-black text-white mb-1 leading-tight">ครัวบ้านไทย</h1>
              <p className="text-amber-100 text-[13px] mb-4">อาหารไทยแท้ รสชาติต้นตำรับ สูตรดั้งเดิม</p>
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="#fef3c7" color="#fef3c7" />)}
                <span className="text-white font-bold text-sm ml-1">4.8</span>
                <span className="text-amber-200 text-[12px]">(328 รีวิว)</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-[12px]">
                <span className="flex items-center gap-1 text-amber-200">
                  <Clock size={12} />10:00–22:00
                </span>
                <span className="text-amber-300">·</span>
                <span className="flex items-center gap-1 text-amber-200">
                  <MapPin size={12} />สยามสแควร์ ชั้น G
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* feature pills */}
        <div className="px-4 py-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {[
            { icon: "📱", label: "สั่งผ่าน QR" },
            { icon: "⚡", label: "เสิร์ฟ 15 นาที" },
            { icon: "🌿", label: "วัตถุดิบสด" },
            { icon: "🔥", label: "สูตรต้นตำรับ" },
          ].map((f) => (
            <span
              key={f.label}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0"
              style={{ background: BRAND_LIGHT, color: BRAND_DARK, border: `1px solid #fde68a` }}
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        {/* promo banner */}
        <div className="mx-4 rounded-2xl overflow-hidden mb-4" style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, boxShadow: "0 4px 20px rgba(180,83,9,0.3)" }}>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Flame size={14} color="#fbbf24" fill="#fbbf24" />
                <p className="text-[13px] font-black text-white">สั่งครบ ฿200 รับฟรี!</p>
              </div>
              <p className="text-[11px] text-amber-200">เครื่องดื่ม 1 แก้ว · ทุกวันนี้เท่านั้น</p>
            </div>
            <span className="text-[10px] font-bold text-amber-300 px-2.5 py-1 rounded-xl" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.1)" }}>
              วันนี้เท่านั้น
            </span>
          </div>
        </div>

        {/* popular dishes */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[14px] font-bold" style={{ color: "#1c1917" }}>เมนูยอดนิยม</p>
            <button onClick={() => setView("menu")} className="text-[12px] cursor-pointer" style={{ color: BRAND_MID }}>
              ดูทั้งหมด →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MENU.filter((m) => m.popular).slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => setView("menu")}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="h-20 flex items-center justify-center text-4xl relative overflow-hidden" style={{ background: item.bg }}>
                  <span className="relative z-10">{item.emoji}</span>
                </div>
                <div className="p-3">
                  <p className="text-[12px] font-semibold leading-tight mb-1" style={{ color: "#1c1917" }}>{item.shortName}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-bold" style={{ color: BRAND }}>฿{item.price}</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: BRAND_LIGHT, color: BRAND_DARK }}>ยอดนิยม</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-10">
          <button
            onClick={() => setView("menu")}
            className="w-full py-4 rounded-2xl text-[15px] font-black flex items-center justify-center gap-2 cursor-pointer transition-all"
            style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "#fff", boxShadow: "0 8px 24px rgba(180,83,9,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(180,83,9,0.45)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(180,83,9,0.35)"; }}
          >
            <Utensils size={20} />
            สั่งอาหารเลย
          </button>
          <p className="text-center text-[11px] mt-3" style={{ color: "#a8a29e" }}>
            สแกน QR Code บนโต๊ะ หรือกดปุ่มด้านบน
          </p>
        </div>
      </div>
    );
  }

  /* ── MENU VIEW ── */
  return (
    <div className="min-h-screen" style={{ background: CREAM, color: "#1c1917" }}>
      <style>{`
        @keyframes ripple-anim { from { transform: scale(0); opacity: 0.5; } to { transform: scale(4); opacity: 0; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cart-bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
      `}</style>

      {/* top bar */}
      <div className="sticky top-0 z-10" style={{ background: "rgba(250,248,244,0.96)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${BORDER}`, maxWidth: 440, margin: "0 auto", width: "100%", overflow: "visible", paddingTop: 8 }}>
        <div style={{ maxWidth: 440, margin: "0 auto" }} className="px-4 h-12 flex items-center justify-between">
          <button onClick={() => setView("landing")} className="flex items-center gap-1 text-xs cursor-pointer" style={{ color: "#a8a29e" }}>
            <ArrowLeft size={14} /> ร้านอาหาร
          </button>
          <div className="text-center">
            <p className="text-[15px] font-black leading-tight" style={{ color: BRAND_DARK }}>ครัวบ้านไทย</p>
            <p className="text-[10px]" style={{ color: "#a8a29e" }}>โต๊ะ 12</p>
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all"
            style={{ background: totalItems > 0 ? BRAND : BRAND_LIGHT, color: totalItems > 0 ? "#fff" : BRAND, border: totalItems > 0 ? "none" : `1px solid #fcd34d` }}
          >
            <ShoppingBag size={14} />
            {totalItems > 0 ? `฿${totalPrice}` : "ตะกร้า"}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: "#ef4444", color: "#fff", animation: "cart-bounce 0.3s ease" }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {/* timer band */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ background: BRAND_LIGHT, borderBottom: `1px solid #fde68a` }}>
          <div>
            <p className="text-[10px] font-medium mb-0.5" style={{ color: BRAND_DARK }}>⏱ เวลาที่นั่งเหลือ</p>
            <p className="text-[22px] font-black tabular-nums leading-tight" style={{ color: BRAND }}>{fmtTimer(secs)}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">รับออเดอร์อยู่</span>
            </div>
            <p className="text-[10px]" style={{ color: "#a8a29e" }}>12:00 – 22:00 น.</p>
          </div>
        </div>

        {/* category tabs */}
        <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none", background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-4 py-1.5 rounded-full text-[12px] whitespace-nowrap font-semibold transition-all shrink-0 cursor-pointer"
              style={
                cat === c
                  ? { background: BRAND, color: "#fff", boxShadow: "0 4px 12px rgba(180,83,9,0.3)" }
                  : { background: CREAM, color: "#78716c", border: `1px solid ${BORDER}` }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* menu items */}
        <div className="px-3 pb-32 pt-3 space-y-2">
          {filtered.map((item) => {
            const qty = cart[item.id] ?? 0;
            return (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden flex gap-0 transition-all"
                style={{
                  background: CARD,
                  border: `1px solid ${qty > 0 ? item.color + "50" : BORDER}`,
                  boxShadow: qty > 0 ? `0 4px 16px ${item.color}18` : "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                {/* color strip */}
                <div className="w-12 shrink-0 flex items-center justify-center text-2xl" style={{ background: item.bg }}>
                  {item.emoji}
                </div>

                <div className="flex-1 px-3 py-3">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[13px] font-bold" style={{ color: "#1c1917" }}>{item.name}</span>
                    {item.popular && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: BRAND_LIGHT, color: BRAND_DARK }}>⭐ ยอดนิยม</span>
                    )}
                  </div>
                  <p className="text-[11px] mb-1.5" style={{ color: "#a8a29e" }}>{item.desc}</p>
                  <p className="text-[14px] font-black" style={{ color: BRAND }}>฿{item.price}</p>
                </div>

                <div className="flex items-center pr-3 shrink-0">
                  {qty > 0 ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(item.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all"
                        style={{ background: "#f5f5f4", border: `1px solid ${BORDER}` }}
                      >
                        <Minus size={13} color="#78716c" />
                      </button>
                      <span className="w-6 text-center font-black text-base" style={{ color: BRAND }}>{qty}</span>
                      <button
                        onClick={() => add(item.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all relative overflow-hidden"
                        style={{ background: BRAND, color: "#fff" }}
                      >
                        <Plus size={13} />
                        {ripple === item.id && (
                          <span className="absolute inset-0 rounded-full bg-white" style={{ animation: "ripple-anim 0.3s ease-out" }} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => add(item.id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all relative overflow-hidden"
                      style={{ background: BRAND, color: "#fff", boxShadow: "0 4px 12px rgba(180,83,9,0.3)" }}
                    >
                      <Plus size={15} />
                      {ripple === item.id && (
                        <span className="absolute inset-0 rounded-full bg-white" style={{ animation: "ripple-anim 0.3s ease-out" }} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* sticky cart CTA */}
      {totalItems > 0 && !sheetOpen && (
        <div
          className="fixed bottom-0 px-4 pb-6 pt-3"
          style={{ background: `linear-gradient(0deg, ${CREAM} 60%, transparent)`, maxWidth: 440, left: "50%", transform: "translateX(-50%)", width: "100%" }}
        >
          <button
            onClick={() => setSheetOpen(true)}
            className="w-full py-4 rounded-2xl flex items-center justify-between px-5 font-bold cursor-pointer transition-all"
            style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "#fff", boxShadow: "0 8px 24px rgba(180,83,9,0.4)" }}
          >
            <span className="flex items-center gap-2 text-sm">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">{totalItems}</span>
              รายการ
            </span>
            <span className="text-sm flex items-center gap-1.5">
              ฿{totalPrice} · ดูรายการ <ChevronRight size={16} />
            </span>
          </button>
        </div>
      )}

      {/* cart sheet */}
      {sheetOpen && (
        <>
          <div className="fixed inset-0 z-20" style={{ background: "rgba(28,25,23,0.6)" }} onClick={() => { setSheetOpen(false); setNoteOpen(null); }} />
          <div
            className="fixed bottom-0 z-30 rounded-t-3xl bg-white overflow-hidden flex flex-col"
            style={{ maxWidth: 440, width: "100%", left: "50%", transform: "translateX(-50%)", maxHeight: "82vh", boxShadow: "0 -20px 60px rgba(0,0,0,0.2)", animation: "slide-up 0.25s ease" }}
          >
            {/* handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ background: "#e8e3da" }} />
            </div>

            {/* header */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <p className="text-[16px] font-black" style={{ color: "#1c1917" }}>รายการที่สั่ง</p>
                <p className="text-xs" style={{ color: "#a8a29e" }}>โต๊ะ 12 · ครัวบ้านไทย</p>
              </div>
              <button onClick={() => { setSheetOpen(false); setNoteOpen(null); }} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{ background: "#f5f5f4" }}>
                <X size={15} color="#78716c" />
              </button>
            </div>

            {/* items */}
            <div className="overflow-y-auto flex-1">
              {cartItems.length === 0 ? (
                <div className="py-14 text-center">
                  <p className="text-4xl mb-3">🛒</p>
                  <p className="text-[13px]" style={{ color: "#78716c" }}>ยังไม่มีรายการ</p>
                  <p className="text-xs mt-1" style={{ color: "#a8a29e" }}>กด + เพื่อเพิ่มเมนู</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id}>
                    <div className="px-5 py-3.5 flex items-start gap-3" style={{ borderBottom: `1px solid #fafaf8` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: item.bg }}>{item.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold truncate" style={{ color: "#1c1917" }}>{item.shortName}</p>
                        <p className="text-[11px]" style={{ color: "#a8a29e" }}>฿{item.price} × {cart[item.id]} = ฿{item.price * cart[item.id]}</p>
                        {notes[item.id] && (
                          <p className="text-[11px] mt-1 px-2 py-1 rounded-lg" style={{ background: BRAND_LIGHT, color: BRAND_DARK }}>📝 {notes[item.id]}</p>
                        )}
                        <button onClick={() => setNoteOpen(noteOpen === item.id ? null : item.id)} className="text-[11px] mt-1 cursor-pointer" style={{ color: BRAND_MID }}>
                          📝 {notes[item.id] ? "แก้ไขโน้ต" : "เพิ่มโน้ต"}
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => dec(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: "#f5f5f4" }}>
                          <Minus size={11} color="#78716c" />
                        </button>
                        <span className="text-sm font-black w-5 text-center" style={{ color: BRAND }}>{cart[item.id]}</span>
                        <button onClick={() => add(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: BRAND, color: "#fff" }}>
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                    {noteOpen === item.id && (
                      <div className="px-5 pb-3" style={{ background: "#fffbf0", borderBottom: `1px solid #fde68a` }}>
                        <textarea
                          ref={noteOpen === item.id ? noteRef : undefined}
                          rows={2}
                          className="w-full text-[12px] px-3 py-2 rounded-xl outline-none resize-none mt-2"
                          style={{ border: `1px solid #fcd34d`, background: "#fff", color: "#1c1917" }}
                          placeholder="เช่น ไม่เผ็ด, ไม่มีผัก..."
                          value={notes[item.id] ?? ""}
                          onChange={(e) => setNotes((n) => ({ ...n, [item.id]: e.target.value }))}
                        />
                        <div className="flex justify-end mt-1">
                          <button onClick={() => setNoteOpen(null)} className="text-[11px] font-bold px-3 py-1 rounded-lg cursor-pointer" style={{ background: BRAND, color: "#fff" }}>บันทึก</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* footer */}
            <div className="px-5 py-4 shrink-0" style={{ borderTop: `1px solid ${BORDER}`, background: CARD }}>
              {cartItems.length > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm" style={{ color: "#78716c" }}>ยอดรวม</span>
                  <span className="text-2xl font-black" style={{ color: BRAND }}>฿{totalPrice}</span>
                </div>
              )}
              <button
                onClick={cartItems.length > 0 ? handleConfirm : undefined}
                className="w-full py-4 rounded-2xl text-sm font-black transition-all cursor-pointer"
                style={
                  cartItems.length > 0
                    ? { background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "#fff", boxShadow: "0 8px 24px rgba(180,83,9,0.3)" }
                    : { background: "#f5f5f4", color: "#a8a29e" }
                }
              >
                {cartItems.length > 0 ? `✓ ยืนยันสั่ง ${totalItems} รายการ` : "เพิ่มรายการก่อน"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
