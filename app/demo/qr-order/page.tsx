"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Plus, Minus, X, CheckCircle, ChevronRight, Star, Clock, MapPin, Utensils } from "lucide-react";

/* ─── palette ─────────────────────────────────── */
const CREAM       = "#faf8f5";
const BRAND       = "#b45309";
const BRAND_MID   = "#d97706";
const BRAND_LIGHT = "#fef3c7";
const BORDER      = "#e8e3da";

/* ─── menu data ────────────────────────────────── */
const MENU = [
  { id: 1, cat: "อาหารหลัก", name: "🍳 ข้าวผัดกระเพราหมูสับ", shortName: "ข้าวผัดกระเพรา", desc: "ไข่ดาวกรอบ · เผ็ดปรับได้", price: 60,  popular: true  },
  { id: 2, cat: "อาหารหลัก", name: "🍲 ต้มยำกุ้งน้ำข้น",      shortName: "ต้มยำกุ้ง",       desc: "กุ้งสด 3 ตัว · น้ำข้นเข้มข้น", price: 120, popular: false },
  { id: 3, cat: "อาหารหลัก", name: "🍜 ผัดไทยกุ้งสด",         shortName: "ผัดไทยกุ้ง",      desc: "กุ้งแม่น้ำ · เครื่องเคียงครบ", price: 80,  popular: true  },
  { id: 4, cat: "อาหารหลัก", name: "🥘 แกงเขียวหวานไก่",      shortName: "แกงเขียวหวาน",    desc: "ข้าวสวย / ขนมปัง",             price: 75,  popular: false },
  { id: 5, cat: "เครื่องดื่ม", name: "🧋 ชาไทยเย็น",          shortName: "ชาไทยเย็น",       desc: "หวานน้อย / หวานปกติ",          price: 35,  popular: true  },
  { id: 6, cat: "เครื่องดื่ม", name: "🍋 น้ำมะนาวโซดา",       shortName: "น้ำมะนาวโซดา",    desc: "สดชื่น · เพิ่มน้ำตาลได้",      price: 30,  popular: false },
  { id: 7, cat: "ของหวาน",   name: "🥭 ข้าวเหนียวมะม่วง",     shortName: "ข้าวเหนียวมะม่วง", desc: "มะม่วงน้ำดอกไม้ · กะทิสด",   price: 55,  popular: true  },
  { id: 8, cat: "ของหวาน",   name: "🍡 บัวลอยไข่หวาน",        shortName: "บัวลอยไข่หวาน",   desc: "เสิร์ฟร้อน · ไข่นกกระทา",     price: 40,  popular: false },
];

const CATS = ["ทั้งหมด", "อาหารหลัก", "เครื่องดื่ม", "ของหวาน"];

const CAT_COLOR: Record<string, string> = {
  "อาหารหลัก":  "#f97316",
  "เครื่องดื่ม": "#0ea5e9",
  "ของหวาน":    "#a855f7",
};

const INIT_SECS = 6127;

function fmtTimer(s: number) {
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function randomOrderNum() {
  return `#K${Math.floor(200 + Math.random() * 800)}`;
}

type View = "landing" | "menu";

export default function QROrderPage() {
  const [view, setView]           = useState<View>("landing");
  const [secs, setSecs]           = useState(INIT_SECS);
  const [cat, setCat]             = useState("ทั้งหมด");
  const [cart, setCart]           = useState<Record<number, number>>({});
  const [notes, setNotes]         = useState<Record<number, string>>({});
  const [noteOpen, setNoteOpen]   = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [orderNum, setOrderNum]   = useState<string | null>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  /* countdown */
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered   = cat === "ทั้งหมด" ? MENU : MENU.filter((m) => m.cat === cat);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU.find((m) => m.id === Number(id));
    return sum + (item?.price ?? 0) * qty;
  }, 0);
  const cartItems = MENU.filter((m) => (cart[m.id] ?? 0) > 0);

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const dec = (id: number) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const handleConfirm = () => {
    const num = randomOrderNum();
    setOrderNum(num);
    setTimeout(() => {
      setOrderNum(null);
      setCart({});
      setNotes({});
      setSheetOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (noteOpen !== null) setTimeout(() => noteRef.current?.focus(), 50);
  }, [noteOpen]);

  /* ── CONFIRMATION SCREEN ── */
  if (orderNum) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: CREAM, maxWidth: 440, margin: "0 auto" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: BRAND_LIGHT, border: `2px solid ${BRAND}` }}
        >
          <CheckCircle size={40} style={{ color: BRAND }} />
        </div>
        <p className="text-2xl font-bold mb-1" style={{ color: BRAND }}>เข้าครัวแล้ว!</p>
        <p className="text-sm text-[#78716c] mb-3">~15 นาที</p>
        <div
          className="px-6 py-3 rounded-xl text-center"
          style={{ background: "#fff", border: `1px solid ${BORDER}` }}
        >
          <p className="text-xs text-[#a8a29e] mb-0.5">หมายเลขออเดอร์</p>
          <p className="text-3xl font-bold tracking-wider" style={{ color: BRAND }}>{orderNum}</p>
        </div>
        <p className="text-xs text-[#a8a29e] mt-5">กำลังกลับสู่เมนู...</p>
      </div>
    );
  }

  /* ── LANDING VIEW ── */
  if (view === "landing") {
    const popularItems = MENU.filter((m) => m.popular).slice(0, 3);

    return (
      <div
        className="min-h-screen"
        style={{ background: CREAM, color: "#1c1917", maxWidth: 440, margin: "0 auto" }}
      >
        {/* top bar */}
        <div
          className="flex items-center justify-between px-4 h-12 sticky top-0 z-10 bg-white"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <Link href="/" className="flex items-center gap-1 text-xs" style={{ color: "#a8a29e" }}>
            <ArrowLeft size={14} /> กลับ
          </Link>
          <span className="text-[13px] font-bold" style={{ color: BRAND }}>ครัวบ้านไทย</span>
          <div className="w-12" />
        </div>

        {/* hero / restaurant header */}
        <div
          className="px-5 pt-8 pb-6 text-center"
          style={{
            background: "linear-gradient(160deg, #92400e 0%, #b45309 45%, #d97706 80%, #fbbf24 100%)",
          }}
        >
          <div className="text-5xl mb-3">🍜</div>
          <h1 className="text-[26px] font-black text-white mb-1">ครัวบ้านไทย</h1>
          <p className="text-amber-100 text-[13px] mb-3">อาหารไทยแท้ รสชาติต้นตำรับ</p>

          {/* rating */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="#fef3c7" color="#fef3c7" />
            ))}
            <span className="text-white font-bold text-sm ml-1">4.8</span>
            <span className="text-amber-200 text-[12px]">(328 รีวิว)</span>
          </div>

          <span
            className="inline-block text-[12px] px-3 py-1 rounded-full font-medium"
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            Thai · ฿–฿฿
          </span>
        </div>

        {/* info bar */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="flex items-center gap-1.5">
            <Clock size={13} color={BRAND_MID} />
            <span className="text-[12px]" style={{ color: "#78716c" }}>10:00–22:00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[12px] font-medium text-emerald-700">เปิดอยู่</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} color={BRAND_MID} />
            <span className="text-[12px]" style={{ color: "#78716c" }}>ชั้น G สยามสแควร์</span>
          </div>
        </div>

        {/* highlight cards */}
        <div className="px-4 py-4 grid grid-cols-3 gap-2.5">
          {[
            { icon: "📱", title: "สั่งผ่าน QR", sub: "ง่ายทุกโต๊ะ" },
            { icon: "⚡", title: "เสิร์ฟไว",   sub: "ภายใน 15 นาที" },
            { icon: "🌿", title: "วัตถุดิบสด",  sub: "คัดสรรทุกวัน" },
          ].map((h) => (
            <div
              key={h.title}
              className="rounded-2xl p-3 text-center"
              style={{ background: BRAND_LIGHT, border: `1px solid #fde68a` }}
            >
              <div className="text-xl mb-1">{h.icon}</div>
              <p className="text-[12px] font-bold" style={{ color: "#92400e" }}>{h.title}</p>
              <p className="text-[10px]" style={{ color: "#b45309" }}>{h.sub}</p>
            </div>
          ))}
        </div>

        {/* promo banner */}
        <div
          className="mx-4 rounded-2xl px-4 py-3 flex items-center justify-between mb-4"
          style={{ background: "#92400e", border: `1px solid #7c2d12` }}
        >
          <div>
            <p className="text-[13px] font-bold text-white">สั่งครบ ฿200</p>
            <p className="text-[11px] text-amber-200">ฟรีเครื่องดื่ม 1 แก้ว</p>
          </div>
          <span className="text-[11px] font-bold text-amber-300 px-2 py-1 rounded-lg" style={{ background: "rgba(0,0,0,0.25)" }}>
            Limited
          </span>
        </div>

        {/* popular dishes preview */}
        <div className="px-4 mb-5">
          <p className="text-[13px] font-bold mb-3" style={{ color: "#1c1917" }}>เมนูยอดนิยม</p>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl shrink-0 overflow-hidden"
                style={{ width: 140, background: "#fff", border: `1px solid ${BORDER}` }}
              >
                <div
                  className="h-16 flex items-center justify-center text-3xl"
                  style={{ background: BRAND_LIGHT }}
                >
                  {item.name.split(" ")[0]}
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-semibold leading-tight" style={{ color: "#1c1917" }}>
                    {item.shortName}
                  </p>
                  <p className="text-[12px] font-bold mt-1" style={{ color: BRAND }}>฿{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-8">
          <button
            onClick={() => setView("menu")}
            className="w-full py-4 rounded-2xl text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            style={{ background: BRAND, color: "#fff" }}
          >
            <Utensils size={18} />
            สั่งอาหารเลย
          </button>
          <p className="text-center text-[11px] mt-2" style={{ color: "#a8a29e" }}>
            สแกน QR หรือกดปุ่มด้านบนเพื่อเริ่มสั่ง
          </p>
        </div>
      </div>
    );
  }

  /* ── MENU VIEW ── */
  return (
    <div className="min-h-screen" style={{ background: CREAM, color: "#1c1917" }}>

      {/* top bar */}
      <div
        className="sticky top-0 z-10 bg-white"
        style={{ borderBottom: `1px solid ${BORDER}`, maxWidth: 440, margin: "0 auto", width: "100%" }}
      >
        <div style={{ maxWidth: 440, margin: "0 auto" }} className="px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setView("landing")}
            className="flex items-center gap-1 text-xs cursor-pointer"
            style={{ color: "#a8a29e" }}
          >
            <ArrowLeft size={14} /> ร้านอาหาร
          </button>

          <div className="text-center">
            <p className="text-[15px] font-bold leading-tight" style={{ color: BRAND }}>ครัวบ้านไทย</p>
            <p className="text-[10px]" style={{ color: "#a8a29e" }}>โต๊ะ 12</p>
          </div>

          <button
            onClick={() => setSheetOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
            style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid #fcd34d` }}
          >
            <ShoppingBag size={14} />
            ตะกร้า
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: BRAND }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* hero band */}
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div
          className="px-4 py-4 flex items-center justify-between"
          style={{ background: BRAND_LIGHT, borderBottom: `1px solid #fde68a` }}
        >
          <div>
            <p className="text-xs font-medium" style={{ color: "#92400e" }}>เวลาที่นั่งเหลือ</p>
            <p className="text-2xl font-bold tabular-nums" style={{ color: BRAND }}>{fmtTimer(secs)}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-medium text-emerald-700">รับออเดอร์อยู่</span>
            </div>
            <p className="text-[10px] mt-0.5" style={{ color: "#a8a29e" }}>วันนี้ 12:00 – 22:00 น.</p>
          </div>
        </div>

        {/* category tabs */}
        <div className="px-4 pt-4 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-4 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-all shrink-0 cursor-pointer"
              style={
                cat === c
                  ? { background: BRAND, color: "#fff" }
                  : { background: "#fff", color: "#78716c", border: `1px solid ${BORDER}` }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* menu items */}
        <div className="px-4 pb-32 space-y-2.5 pt-2">
          {filtered.map((item) => {
            const inCart      = (cart[item.id] ?? 0) > 0;
            const accentColor = CAT_COLOR[item.cat];
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white flex gap-3 overflow-hidden transition-all"
                style={{
                  border: `1px solid ${inCart ? "#fcd34d" : BORDER}`,
                  borderLeft: `3px solid ${accentColor}`,
                }}
              >
                <div className="flex-1 px-4 py-3.5">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-[13px] font-semibold text-[#1c1917] leading-snug">{item.name}</span>
                    {item.popular && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: BRAND_LIGHT, color: BRAND }}
                      >
                        ยอดนิยม
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#a8a29e] mb-2">{item.desc}</p>
                  <p className="text-sm font-bold" style={{ color: BRAND }}>฿{item.price}</p>
                </div>

                <div className="flex flex-col items-center justify-center pr-4 gap-2 shrink-0">
                  {inCart ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(item.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
                        style={{ background: "#f5f5f4", border: `1px solid ${BORDER}` }}
                      >
                        <Minus size={12} color="#78716c" />
                      </button>
                      <span className="w-5 text-center font-bold text-sm" style={{ color: BRAND }}>
                        {cart[item.id]}
                      </span>
                      <button
                        onClick={() => add(item.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer"
                        style={{ background: BRAND }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => add(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer"
                      style={{ background: BRAND }}
                    >
                      <Plus size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* sticky bottom CTA */}
      {totalItems > 0 && !sheetOpen && (
        <div
          className="fixed bottom-0 px-4 pb-6 pt-4"
          style={{
            background: `linear-gradient(0deg, ${CREAM} 60%, transparent)`,
            maxWidth: 440,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <button
            onClick={() => setSheetOpen(true)}
            className="w-full py-4 rounded-2xl flex items-center justify-between px-5 font-semibold shadow-lg cursor-pointer"
            style={{ background: BRAND, color: "#fff" }}
          >
            <span className="text-sm">{totalItems} รายการ</span>
            <span className="text-sm flex items-center gap-1">
              ฿{totalPrice} · ดูรายการ <ChevronRight size={16} />
            </span>
          </button>
        </div>
      )}

      {/* cart bottom sheet */}
      {sheetOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            style={{ background: "rgba(28,25,23,0.55)" }}
            onClick={() => { setSheetOpen(false); setNoteOpen(null); }}
          />
          <div
            className="fixed bottom-0 z-30 rounded-t-3xl bg-white overflow-hidden flex flex-col"
            style={{
              maxWidth: 440,
              width: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              maxHeight: "82vh",
              border: `1px solid ${BORDER}`,
            }}
          >
            {/* sheet header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: `1px solid ${BORDER}` }}
            >
              <div>
                <p className="text-[15px] font-bold text-[#1c1917]">รายการที่สั่ง</p>
                <p className="text-xs text-[#a8a29e]">โต๊ะ 12 · ครัวบ้านไทย</p>
              </div>
              <button
                onClick={() => { setSheetOpen(false); setNoteOpen(null); }}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "#f5f5f4" }}
              >
                <X size={15} color="#78716c" />
              </button>
            </div>

            {/* items list */}
            <div className="overflow-y-auto flex-1">
              {cartItems.length === 0 ? (
                <div className="py-14 text-center">
                  <p className="text-[13px] text-[#78716c]">ยังไม่มีรายการ</p>
                  <p className="text-xs text-[#a8a29e] mt-1">กด + เพื่อเพิ่มเมนู</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className="px-5 py-3.5 flex items-start gap-3"
                      style={{ borderBottom: `1px solid #fafaf8` }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 shrink-0"
                        style={{ background: CAT_COLOR[item.cat] }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#1c1917] truncate">{item.shortName}</p>
                        <p className="text-[11px] text-[#a8a29e]">
                          ฿{item.price} × {cart[item.id]} = ฿{item.price * cart[item.id]}
                        </p>
                        {notes[item.id] && (
                          <p
                            className="text-[11px] mt-1 px-2 py-1 rounded-lg"
                            style={{ background: BRAND_LIGHT, color: "#92400e" }}
                          >
                            📝 {notes[item.id]}
                          </p>
                        )}
                        <button
                          onClick={() => setNoteOpen(noteOpen === item.id ? null : item.id)}
                          className="text-[11px] mt-1 cursor-pointer"
                          style={{ color: BRAND_MID }}
                        >
                          📝 {notes[item.id] ? "แก้ไขโน้ต" : "เพิ่มโน้ต"}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => dec(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                          style={{ background: "#f5f5f4" }}
                        >
                          <Minus size={11} color="#78716c" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center" style={{ color: BRAND }}>
                          {cart[item.id]}
                        </span>
                        <button
                          onClick={() => add(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                          style={{ background: "#f5f5f4" }}
                        >
                          <Plus size={11} color="#78716c" />
                        </button>
                      </div>
                    </div>

                    {noteOpen === item.id && (
                      <div
                        className="px-5 pb-3"
                        style={{ background: "#fffbf0", borderBottom: `1px solid #fde68a` }}
                      >
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
                          <button
                            onClick={() => setNoteOpen(null)}
                            className="text-[11px] font-medium px-3 py-1 rounded-lg cursor-pointer"
                            style={{ background: BRAND, color: "#fff" }}
                          >
                            บันทึก
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* sheet footer */}
            <div className="px-5 py-4 shrink-0" style={{ borderTop: `1px solid ${BORDER}` }}>
              {cartItems.length > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#78716c]">ยอดรวม</span>
                  <span className="text-xl font-bold" style={{ color: BRAND }}>฿{totalPrice}</span>
                </div>
              )}
              <button
                onClick={cartItems.length > 0 ? handleConfirm : undefined}
                className="w-full py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer"
                style={
                  cartItems.length > 0
                    ? { background: BRAND, color: "#fff" }
                    : { background: "#f5f5f4", color: "#a8a29e" }
                }
              >
                {cartItems.length > 0 ? `ยืนยันสั่ง ${totalItems} รายการ` : "เพิ่มรายการก่อน"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
