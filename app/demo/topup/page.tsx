"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Zap, CheckCircle, ChevronRight, ArrowLeft, Star, Shield, Clock,
  Users, Gift, CreditCard, Smartphone, ChevronDown, TrendingUp,
} from "lucide-react";

/* ─── palette ─── */
const BG     = "#050810";
const CARD   = "#0d1117";
const CARD2  = "#101620";
const ACCENT = "#2563eb";
const CYAN   = "#06b6d4";
const BORDER = "#1a2332";
const TEXT   = "#e2e8f0";

/* ─── game data ─── */
const GAMES = [
  { id: "rov",    name: "ROV",       publisher: "Garena",      gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)", coinName: "Voucher",   badge: "Live",  emoji: "⚔️" },
  { id: "ff",     name: "Free Fire", publisher: "Garena",      gradient: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 55%, #fb923c 100%)", coinName: "Diamond",   badge: "6 แพ็ก", emoji: "🔥" },
  { id: "mc",     name: "Minecraft", publisher: "Mojang",      gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 55%, #86efac 100%)", coinName: "Minecoins", badge: "Live",  emoji: "⛏️" },
  { id: "roblox", name: "Roblox",    publisher: "Roblox Corp", gradient: "linear-gradient(135deg, #581c87 0%, #9333ea 55%, #d8b4fe 100%)", coinName: "Robux",     badge: "6 แพ็ก", emoji: "🎮" },
];

/* ─── packages ─── */
const PACKS = [
  { id: 1, baht: 50,   coins: 60,    bonus: 0,  hot: false },
  { id: 2, baht: 100,  coins: 110,   bonus: 10, hot: false },
  { id: 3, baht: 200,  coins: 230,   bonus: 15, hot: true  },
  { id: 4, baht: 500,  coins: 600,   bonus: 20, hot: false },
  { id: 5, baht: 1000, coins: 1300,  bonus: 30, hot: false },
  { id: 6, baht: 2000, coins: 2800,  bonus: 40, hot: false },
];

const RECENT = [
  { game: "ROV",       pack: "฿200", uid: "98765***", when: "วันนี้ 13:42", ok: true  },
  { game: "Free Fire", pack: "฿100", uid: "55123***", when: "เมื่อวาน",    ok: true  },
  { game: "Roblox",    pack: "฿500", uid: "20099***", when: "เมื่อวาน",    ok: false },
];

type Step      = "form" | "payment" | "processing" | "done";
type PayMethod = "promptpay" | "card" | "truemoney" | null;

function genTxId() {
  const d = new Date();
  const ds = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `VOLT-${ds}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function useCounter(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

export default function TopupPage() {
  const [gameId, setGameId]       = useState("rov");
  const [packId, setPackId]       = useState(3);
  const [uid, setUid]             = useState("");
  const [step, setStep]           = useState<Step>("form");
  const [payMethod, setPayMethod] = useState<PayMethod>(null);
  const [procStep, setProcStep]   = useState(0);
  const [txId, setTxId]           = useState("");
  const [scrolled, setScrolled]   = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass]   = useState("");
  const [loginDone, setLoginDone]   = useState(false);
  const topupRef = useRef<HTMLDivElement>(null);

  const c50k  = useCounter(50000);
  const c999  = useCounter(999);
  const c30   = useCounter(30);
  const c50   = useCounter(50);

  const game     = GAMES.find((g) => g.id === gameId)!;
  const pack     = PACKS.find((p) => p.id === packId)!;
  const verified = uid.length >= 4;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (step !== "processing") return;
    setProcStep(1);
    const t1 = setTimeout(() => setProcStep(2), 800);
    const t2 = setTimeout(() => setProcStep(3), 1600);
    const t3 = setTimeout(() => { setProcStep(4); setTxId(genTxId()); setStep("done"); }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [step]);

  const procLabels = ["กำลังตรวจสอบ UID...", "กำลังดำเนินการชำระเงิน...", "กำลังเติมเหรียญ..."];

  const reset = () => { setStep("form"); setUid(""); setPayMethod(null); setProcStep(0); setTxId(""); };
  const scrollToTopup = () => topupRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "sans-serif" }}>
      <style>{`
        @keyframes volt-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes volt-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes volt-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.3); }
          50%       { box-shadow: 0 0 40px rgba(37,99,235,0.6); }
        }
        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.7; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      {/* ── STICKY NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,8,16,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-xs transition-colors" style={{ color: "#334155" }}>
              <ArrowLeft size={13} /> กลับ
            </Link>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)", animation: "volt-glow 3s ease-in-out infinite" }}
              >
                <Zap size={15} color="#fff" fill="#fff" />
              </div>
              <span className="text-base font-black tracking-widest" style={{ color: "#60a5fa", letterSpacing: "0.18em", animation: "neon-flicker 8s ease-in-out infinite" }}>
                VOLT
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "หน้าหลัก",  action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
              { label: "เกม",       action: () => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" }) },
              { label: "โปรโมชัน", action: () => document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" }) },
              { label: "เติมเงิน", action: scrollToTopup },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="text-[13px] transition-colors cursor-pointer hover:text-white"
                style={{ color: "#64748b" }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLogin(true)}
              className="hidden sm:block text-[12px] px-4 py-2 rounded-xl transition-all cursor-pointer"
              style={{ border: `1px solid ${BORDER}`, color: "#94a3b8" }}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={scrollToTopup}
              className="text-[12px] font-bold px-4 py-2 rounded-xl cursor-pointer transition-all"
              style={{ background: ACCENT, color: "#fff", animation: "volt-glow 3s ease-in-out infinite" }}
            >
              เริ่มเติมเงิน
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-5 pt-20 pb-16 relative overflow-hidden">
        {/* animated glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 75% 60% at 50% 42%, rgba(37,99,235,0.2) 0%, rgba(6,182,212,0.09) 50%, transparent 80%)",
            animation: "volt-pulse 7s ease-in-out infinite",
          }}
        />
        {/* second glow */}
        <div className="absolute pointer-events-none rounded-full"
          style={{
            width: 500, height: 500, top: "15%", left: "60%",
            background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-[960px] mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              className="flex items-center gap-2 text-[12px] font-semibold px-4 py-2 rounded-full"
              style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}35`, color: CYAN }}
            >
              <Zap size={12} fill={CYAN} color={CYAN} />
              เร็ว · ปลอดภัย · โบนัสสูงสุด 40%
            </span>
          </div>

          <h1
            className="font-black leading-[1.0] mb-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 6rem)", color: "#fff" }}
          >
            <span className="block">เติมเกมทุกเกม</span>
            <span className="block" style={{ color: CYAN }}>ในที่เดียว</span>
          </h1>

          <p className="text-[15px] leading-relaxed mb-10 max-w-[500px]" style={{ color: "#475569" }}>
            รองรับมากกว่า 50 เกม ชำระเงินผ่าน PromptPay บัตรเครดิต และ TrueMoney<br />
            เติมเสร็จภายใน 30 วินาที ทุกวันตลอด 24 ชั่วโมง
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <button
              onClick={scrollToTopup}
              className="flex items-center gap-2 text-[14px] font-bold px-7 py-3.5 rounded-2xl cursor-pointer transition-all"
              style={{ background: `linear-gradient(90deg, #1d4ed8, ${ACCENT})`, color: "#fff" }}
            >
              เริ่มเติมเงิน <Zap size={15} fill="#fff" />
            </button>
            <button
              onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[14px] font-medium px-7 py-3.5 rounded-2xl cursor-pointer transition-all"
              style={{ border: `1.5px solid ${BORDER}`, color: "#94a3b8" }}
            >
              ดูเกมทั้งหมด
            </button>
          </div>

          {/* animated stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { val: `${c50k.toLocaleString()}+`, label: "ลูกค้า",         icon: <Users size={16} color={CYAN} /> },
              { val: `${c999 / 10}%`,             label: "Success Rate",   icon: <TrendingUp size={16} color="#10b981" /> },
              { val: `${c30} วิ`,                 label: "เติมเสร็จภายใน", icon: <Zap size={16} color="#f59e0b" fill="#f59e0b" /> },
              { val: `${c50}+`,                   label: "เกม",            icon: <Gift size={16} color="#e879f9" /> },
            ].map(({ val, label, icon }) => (
              <div
                key={label}
                className="rounded-2xl px-4 py-4"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-center gap-2 mb-2">{icon}<span className="text-[11px]" style={{ color: "#334155" }}>{label}</span></div>
                <p className="text-[1.6rem] font-black leading-tight" style={{ color: "#fff" }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToTopup}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          style={{ color: "#1e2d45" }}
        >
          <span className="text-[11px]">เลื่อนลง</span>
          <ChevronDown size={18} />
        </button>
      </section>

      {/* ══ FEATURED GAMES ══════════════════════════════════════ */}
      <section id="games" className="py-20 px-5" style={{ background: "#07090e" }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>GAMES</p>
          <h2 className="text-[2rem] font-black mb-2 text-white">เกมยอดนิยม</h2>
          <p className="text-[13px] mb-10" style={{ color: "#334155" }}>กดที่การ์ดเพื่อเลือกเกมและเริ่มเติมเงิน</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES.map((g) => (
              <div
                key={g.id}
                onClick={() => { setGameId(g.id); scrollToTopup(); }}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                style={{
                  border: `1px solid ${hovered === g.id ? "#2563eb60" : BORDER}`,
                  transform: hovered === g.id ? "translateY(-8px) scale(1.02)" : "none",
                  boxShadow: hovered === g.id ? `0 24px 48px rgba(37,99,235,0.25)` : "none",
                }}
                onMouseEnter={() => setHovered(g.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative w-full flex flex-col items-center justify-center py-8 gap-2" style={{ background: g.gradient, aspectRatio: "4/3" }}>
                  <span className="text-5xl select-none">{g.emoji}</span>
                  <span
                    className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(4px)" }}
                  >
                    {g.badge}
                  </span>
                  {/* live dot */}
                  <span
                    className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-semibold"
                    style={{ color: "#4ade80" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ animation: "live-pulse 1.5s ease-in-out infinite" }} />
                    LIVE
                  </span>
                  {hovered === g.id && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(37,99,235,0.4)" }}>
                      <span className="text-white font-bold text-sm flex items-center gap-2">
                        เติมเงิน <Zap size={14} fill="#fff" />
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3" style={{ background: CARD }}>
                  <p className="text-[14px] font-bold text-white">{g.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "#334155" }}>{g.publisher}</p>
                  <p className="text-[11px] mt-1 font-semibold" style={{ color: CYAN }}>{g.coinName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section className="py-20 px-5" style={{ background: "#0a0f1a" }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>HOW IT WORKS</p>
          <h2 className="text-[2rem] font-black mb-14 text-white">วิธีเติมเงิน ง่ายใน 3 ขั้น</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", icon: <Star size={22} color={CYAN} />,                   title: "เลือกเกมและแพ็กเกจ", desc: "เลือกเกมที่ต้องการจากรายการกว่า 50 เกม แล้วเลือกแพ็กเกจที่เหมาะกับงบประมาณ" },
              { num: "02", icon: <Users size={22} color={ACCENT} />,                 title: "กรอก User ID",        desc: "กรอก User ID หรือ UID ของตัวละครในเกม ระบบจะยืนยันบัญชีโดยอัตโนมัติ" },
              { num: "03", icon: <Zap size={22} color="#10b981" fill="#10b981" />,   title: "ชำระเงิน รับเหรียญทันที", desc: "ชำระผ่าน PromptPay, บัตรเครดิต หรือ TrueMoney รับเหรียญภายใน 30 วินาที" },
            ].map((s, i) => (
              <div
                key={s.num}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${i === 0 ? CYAN : i === 1 ? ACCENT : "#10b981"}0a 0%, transparent 70%)`, transform: "translate(30%, -30%)" }}
                />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                    {s.icon}
                  </div>
                  <span className="text-[32px] font-black" style={{ color: `${BORDER}80` }}>{s.num}</span>
                </div>
                <p className="text-[16px] font-bold text-white mb-2">{s.title}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#475569" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROMOTIONS ════════════════════════════════════════ */}
      <section id="promotions" className="py-20 px-5" style={{ background: "#07090e" }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>PROMOTIONS</p>
          <h2 className="text-[2rem] font-black mb-2 text-white">โปรโมชันพิเศษ</h2>
          <p className="text-[13px] mb-10" style={{ color: "#334155" }}>กดที่โปรโมชันเพื่อเลือกแพ็กเกจที่ตรงกันทันที</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "โบนัส +10%", sub: "สมาชิกใหม่",
                desc: "สมัครครั้งแรก รับโบนัสเหรียญเพิ่ม 10% ในการเติมเงินครั้งแรก",
                gradient: "linear-gradient(135deg, #78350f 0%, #b45309 55%, #f59e0b 100%)",
                badge: null, packId: 2, glow: "#f59e0b",
              },
              {
                title: "โบนัส +15%", sub: "แพ็ก ฿200 ขึ้นไป",
                desc: "เติมเงินตั้งแต่ 200 บาท รับโบนัสเพิ่มทุกครั้ง ไม่จำกัดจำนวน",
                gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #3b82f6 100%)",
                badge: null, packId: 3, glow: "#3b82f6",
              },
              {
                title: "สูงสุด +40%", sub: "แพ็กพรีเมียม ฿2,000",
                desc: "แพ็กใหญ่สุดคุ้ม รับเหรียญเพิ่ม 40% เฉพาะแพ็ก 2,000 บาทขึ้นไป",
                gradient: "linear-gradient(135deg, #3b0764 0%, #7e22ce 55%, #a855f7 100%)",
                badge: "🔥 HOT", packId: 6, glow: "#a855f7",
              },
            ].map((promo) => (
              <div
                key={promo.title}
                onClick={() => { setPackId(promo.packId); scrollToTopup(); }}
                className="rounded-2xl overflow-hidden relative cursor-pointer transition-all"
                style={{ border: `1px solid ${BORDER}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 2px ${promo.glow}40`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                {promo.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full z-10" style={{ background: "#ef4444", color: "#fff" }}>
                    {promo.badge}
                  </span>
                )}
                <div className="h-24 w-full flex items-end p-4" style={{ background: promo.gradient }}>
                  <p className="text-[26px] font-black text-white">{promo.title}</p>
                </div>
                <div className="p-4" style={{ background: CARD }}>
                  <p className="text-[13px] font-semibold text-white mb-1">{promo.sub}</p>
                  <p className="text-[12px] leading-relaxed mb-3" style={{ color: "#475569" }}>{promo.desc}</p>
                  <span
                    className="text-[11px] font-semibold flex items-center gap-1"
                    style={{ color: promo.glow }}
                  >
                    เลือกโปรนี้ <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TOP-UP FORM ══════════════════════════════════════ */}
      <section id="topup" ref={topupRef} className="py-20 px-5" style={{ background: "#0a0f1a" }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>TOP-UP</p>
          <h2 className="text-[2rem] font-black mb-10 text-white">เติมเงินเลย</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5">

            {/* ── LEFT: FORM ── */}
            <div className="space-y-4">

              {step === "form" && (
                <>
                  {/* game selection */}
                  <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="text-[11px] font-semibold tracking-widest mb-4 uppercase" style={{ color: "#475569" }}>เลือกเกม</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {GAMES.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setGameId(g.id)}
                          className="rounded-xl overflow-hidden relative cursor-pointer transition-all"
                          style={{
                            border: gameId === g.id ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                            outline: gameId === g.id ? `3px solid ${ACCENT}25` : "none",
                            transform: gameId === g.id ? "scale(1.03)" : "none",
                          }}
                        >
                          <div className="h-16 w-full flex items-center justify-center text-2xl" style={{ background: g.gradient }}>
                            {g.emoji}
                            {gameId === g.id && (
                              <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                                <CheckCircle size={10} color="#fff" />
                              </span>
                            )}
                          </div>
                          <div className="px-2 py-2" style={{ background: CARD }}>
                            <p className="text-[12px] font-bold text-white">{g.name}</p>
                            <p className="text-[10px]" style={{ color: "#475569" }}>{g.publisher}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UID */}
                  <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="text-[11px] font-semibold tracking-widest mb-4 uppercase" style={{ color: "#475569" }}>User ID</p>
                    <input
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      className="w-full text-sm px-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        background: BG,
                        border: verified ? `1px solid ${ACCENT}` : `1px solid ${BORDER}`,
                        color: TEXT,
                      }}
                      placeholder={`กรอก ${game.name} User ID`}
                    />
                    <div className="h-6 mt-2">
                      {verified && (
                        <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle size={11} /> ✓ พบบัญชี — ยืนยันแล้ว
                        </p>
                      )}
                    </div>
                  </div>

                  {/* packages */}
                  <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="text-[11px] font-semibold tracking-widest mb-4 uppercase" style={{ color: "#475569" }}>เลือกแพ็กเกจ</p>
                    <div className="grid grid-cols-3 gap-3">
                      {PACKS.map((p) => {
                        const sel = p.id === packId;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPackId(p.id)}
                            className="rounded-xl p-3 text-center relative cursor-pointer transition-all"
                            style={{
                              background: sel ? `${ACCENT}12` : BG,
                              border: sel ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                              transform: sel ? "scale(1.03)" : "none",
                            }}
                          >
                            {p.hot && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap" style={{ background: ACCENT, color: "#fff" }}>
                                ยอดนิยม
                              </span>
                            )}
                            <p className="text-lg font-black" style={{ color: sel ? ACCENT : "#94a3b8" }}>
                              ฿{p.baht.toLocaleString()}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>{p.coins.toLocaleString()} {game.coinName}</p>
                            {p.bonus > 0 && <p className="text-[9px] mt-1 text-emerald-400 font-medium">+{p.bonus}% โบนัส</p>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => verified && setStep("payment")}
                    className="w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-between px-5 transition-all cursor-pointer"
                    style={{
                      background: verified ? `linear-gradient(90deg, #1d4ed8, ${ACCENT})` : BORDER,
                      color: verified ? "#fff" : "#475569",
                      animation: verified ? "volt-glow 3s ease-in-out infinite" : "none",
                    }}
                  >
                    <span>{verified ? `เติมเงิน ${game.name}` : "กรอก User ID ก่อน"}</span>
                    {verified && (
                      <span className="text-sm">
                        ฿{pack.baht.toLocaleString()} → {pack.coins.toLocaleString()} {game.coinName}{" "}
                        <ChevronRight size={16} className="inline" />
                      </span>
                    )}
                  </button>
                </>
              )}

              {step === "payment" && (
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
                  <div className="px-5 py-4 flex items-center justify-between" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
                    <div>
                      <p className="text-[11px] tracking-widest uppercase" style={{ color: "#475569" }}>ชำระเงิน</p>
                      <p className="text-sm font-bold mt-0.5 text-white">{game.name} · ฿{pack.baht.toLocaleString()}</p>
                    </div>
                    <button onClick={() => setStep("form")} className="text-xs cursor-pointer" style={{ color: "#475569" }}>← แก้ไข</button>
                  </div>

                  <div className="p-5 space-y-3" style={{ background: BG }}>
                    <p className="text-[11px] tracking-widest uppercase mb-3" style={{ color: "#475569" }}>เลือกวิธีชำระเงิน</p>

                    {/* PromptPay */}
                    <button
                      onClick={() => setPayMethod("promptpay")}
                      className="w-full rounded-xl p-4 text-left transition-all cursor-pointer"
                      style={{ background: CARD, border: payMethod === "promptpay" ? `2px solid ${ACCENT}` : `1px solid ${BORDER}` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Smartphone size={16} color={CYAN} />
                          <p className="text-sm font-semibold text-white">PromptPay</p>
                        </div>
                        {payMethod === "promptpay" && <CheckCircle size={16} color={ACCENT} />}
                      </div>
                      {payMethod === "promptpay" && (
                        <div className="mx-auto w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: "#fff" }}>
                          <div className="w-full h-full" style={{
                            backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px), repeating-linear-gradient(90deg, #000 0px, #000 4px, transparent 4px, transparent 8px)",
                            backgroundSize: "16px 16px", opacity: 0.85,
                          }} />
                        </div>
                      )}
                    </button>

                    {/* Credit card */}
                    <button
                      onClick={() => setPayMethod("card")}
                      className="w-full rounded-xl p-4 text-left transition-all cursor-pointer"
                      style={{ background: CARD, border: payMethod === "card" ? `2px solid ${ACCENT}` : `1px solid ${BORDER}` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} color={ACCENT} />
                          <p className="text-sm font-semibold text-white">บัตรเครดิต / เดบิต</p>
                        </div>
                        {payMethod === "card" && <CheckCircle size={16} color={ACCENT} />}
                      </div>
                      {payMethod === "card" && (
                        <div className="rounded-xl p-4 w-full" style={{ background: "linear-gradient(135deg, #1e3a5f, #1d4ed8)", aspectRatio: "16/9", maxWidth: 280 }}>
                          <p className="text-[10px] text-blue-300 tracking-widest uppercase mb-4">VOLT CARD</p>
                          <p className="font-mono text-white text-sm tracking-widest">4••• &nbsp;••••&nbsp; ••••&nbsp; 8824</p>
                          <div className="flex justify-between mt-4">
                            <div>
                              <p className="text-[9px] text-blue-300">CARDHOLDER</p>
                              <p className="text-[11px] text-white font-medium">NOPPROOT P.</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] text-blue-300">EXPIRES</p>
                              <p className="text-[11px] text-white">12/28</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>

                    {/* TrueMoney */}
                    <button
                      onClick={() => setPayMethod("truemoney")}
                      className="w-full rounded-xl p-4 text-left transition-all cursor-pointer"
                      style={{ background: CARD, border: payMethod === "truemoney" ? `2px solid ${ACCENT}` : `1px solid ${BORDER}` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "#ff6600", color: "#fff" }}>T</div>
                          <div>
                            <p className="text-sm font-semibold text-white">TrueMoney Wallet</p>
                            {payMethod === "truemoney" && <p className="text-[11px] text-emerald-400 mt-0.5">ยอด: ฿{pack.baht.toLocaleString()}</p>}
                          </div>
                        </div>
                        {payMethod === "truemoney" && <CheckCircle size={16} color={ACCENT} />}
                      </div>
                    </button>

                    <button
                      onClick={() => payMethod && setStep("processing")}
                      className="w-full py-4 rounded-2xl text-sm font-bold transition-all cursor-pointer mt-2"
                      style={{
                        background: payMethod ? `linear-gradient(90deg, #1d4ed8, ${ACCENT})` : BORDER,
                        color: payMethod ? "#fff" : "#475569",
                      }}
                    >
                      {payMethod ? `ชำระเงิน ฿${pack.baht.toLocaleString()}` : "เลือกวิธีชำระก่อน"}
                    </button>
                  </div>
                </div>
              )}

              {step === "processing" && (
                <div className="rounded-2xl p-8 flex flex-col items-center gap-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: `${ACCENT}18`, border: `2px solid ${ACCENT}40`, animation: "volt-glow 1.5s ease-in-out infinite" }}
                  >
                    <Zap size={28} color={ACCENT} />
                  </div>
                  <div className="w-full space-y-3">
                    {procLabels.map((label, idx) => {
                      const done = procStep > idx + 1, active = procStep === idx + 1;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all"
                            style={{ background: done ? "#10b981" : active ? ACCENT : BORDER, border: active ? `2px solid ${ACCENT}60` : "none" }}
                          >
                            {done ? <CheckCircle size={14} color="#fff" /> : active ? <span className="w-2 h-2 rounded-full bg-white" /> : <span className="w-2 h-2 rounded-full" style={{ background: "#334155" }} />}
                          </div>
                          <span className="text-sm" style={{ color: done ? "#10b981" : active ? TEXT : "#475569" }}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === "done" && (
                <div className="rounded-2xl p-8 text-center" style={{ background: CARD, border: `1px solid #10b981` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#10b98118" }}>
                    <CheckCircle size={36} color="#10b981" />
                  </div>
                  <p className="text-lg font-bold text-emerald-400">เติมเงินสำเร็จ!</p>
                  <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>{game.name} · {pack.coins.toLocaleString()} {game.coinName}</p>
                  <div className="mt-4 py-3 px-4 rounded-xl" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                    <p className="text-[10px] tracking-widest uppercase" style={{ color: "#475569" }}>Transaction ID</p>
                    <p className="text-sm font-mono font-bold text-white mt-0.5">{txId}</p>
                  </div>
                  <button onClick={reset} className="mt-5 text-sm font-semibold px-6 py-2.5 rounded-xl cursor-pointer" style={{ background: ACCENT, color: "#fff" }}>
                    เติมใหม่
                  </button>
                </div>
              )}
            </div>

            {/* ── RIGHT: recent tx ── */}
            <div className="rounded-2xl p-5 self-start" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: "#475569" }}>ประวัติล่าสุด</p>
              <div className="space-y-3">
                {RECENT.map((h, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 pb-3" style={{ borderBottom: i < RECENT.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <div>
                      <p className="text-[12px] font-semibold text-white">
                        {h.game}<span className="font-normal ml-1" style={{ color: "#475569" }}>· {h.pack}</span>
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>{h.uid} · {h.when}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                      style={h.ok ? { background: "#10b98118", color: "#10b981", border: "1px solid #10b98130" } : { background: "#f59e0b18", color: "#f59e0b", border: "1px solid #f59e0b30" }}
                    >
                      {h.ok ? "สำเร็จ" : "รอดำเนินการ"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 rounded-xl p-3 text-center" style={{ background: `${ACCENT}0c`, border: `1px solid ${ACCENT}20` }}>
                <p className="text-[11px] font-semibold" style={{ color: ACCENT }}>โบนัสสูงสุด +40%</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>สำหรับแพ็ก ฿2,000</p>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { icon: <Shield size={13} color="#10b981" />, text: "ปลอดภัย 100%" },
                  { icon: <Clock size={13} color={CYAN} />, text: "เติมภายใน 30 วินาที" },
                  { icon: <CheckCircle size={13} color={ACCENT} />, text: "รองรับทุกธนาคาร" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    {b.icon}
                    <span className="text-[11px]" style={{ color: "#475569" }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section className="py-20 px-5" style={{ background: BG }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>REVIEWS</p>
          <h2 className="text-[2rem] font-black mb-12 text-white">ลูกค้าพูดถึงเรา</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "ต้นน้ำ K.", game: "ROV Player",      quote: "เติมเร็วมาก แค่ไม่กี่วิได้ Voucher เลย ไม่ต้องรอนานเหมือนที่อื่น", avatar: "T" },
              { name: "มายด์ P.", game: "Free Fire Fan",    quote: "โบนัส +15% จริง ไม่หลอก Diamond เข้าเกมทันที ใช้บริการมา 3 เดือนแล้ว", avatar: "M" },
              { name: "กาย S.",   game: "Roblox Builder",   quote: "ระบบสะอาด ใช้งานง่าย ชำระผ่าน PromptPay สะดวกสุดๆ แนะนำเลย", avatar: "G" },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#94a3b8" }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: `${ACCENT}20`, color: ACCENT }}>{t.avatar}</div>
                  <div>
                    <p className="text-[13px] font-bold text-white">{t.name}</p>
                    <p className="text-[11px]" style={{ color: "#475569" }}>{t.game}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOGIN MODAL ════════════════════════════════════ */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}
        >
          <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }}>
                  <Zap size={13} color="#fff" fill="#fff" />
                </div>
                <span className="font-black tracking-widest text-sm" style={{ color: "#60a5fa" }}>VOLT</span>
              </div>
              <button onClick={() => setShowLogin(false)} className="text-[20px] leading-none cursor-pointer" style={{ color: "#475569" }}>×</button>
            </div>
            <div className="p-6">
              {loginDone ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "#10b98118" }}>
                    <CheckCircle size={30} color="#10b981" />
                  </div>
                  <p className="text-white font-bold">เข้าสู่ระบบสำเร็จ!</p>
                  <p className="text-[12px] mt-1" style={{ color: "#475569" }}>{loginEmail}</p>
                  <button
                    onClick={() => { setShowLogin(false); setLoginDone(false); setLoginEmail(""); setLoginPass(""); }}
                    className="mt-5 w-full py-3 rounded-xl text-sm font-bold cursor-pointer"
                    style={{ background: ACCENT, color: "#fff" }}
                  >ดำเนินการต่อ</button>
                </div>
              ) : (
                <>
                  <p className="text-white font-bold text-[15px] mb-1">เข้าสู่ระบบ</p>
                  <p className="text-[12px] mb-5" style={{ color: "#475569" }}>ยินดีต้อนรับกลับสู่ VOLT Gaming</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: "#475569" }}>อีเมล</label>
                      <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="กรอกอีเมล" className="w-full text-sm px-4 py-3 rounded-xl outline-none" style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT }} />
                    </div>
                    <div>
                      <label className="text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: "#475569" }}>รหัสผ่าน</label>
                      <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="กรอกรหัสผ่าน" className="w-full text-sm px-4 py-3 rounded-xl outline-none" style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT }} onKeyDown={(e) => { if (e.key === "Enter" && loginEmail && loginPass) setLoginDone(true); }} />
                    </div>
                  </div>
                  <button
                    onClick={() => { if (loginEmail && loginPass) setLoginDone(true); }}
                    className="mt-4 w-full py-3 rounded-xl text-sm font-bold cursor-pointer transition-all"
                    style={{ background: loginEmail && loginPass ? `linear-gradient(90deg, #1d4ed8, ${ACCENT})` : BORDER, color: loginEmail && loginPass ? "#fff" : "#475569" }}
                  >เข้าสู่ระบบ</button>
                  <div className="mt-3 text-center">
                    <button onClick={() => { setLoginEmail("demo@volt.gg"); setLoginPass("demo1234"); }} className="text-[11px] cursor-pointer" style={{ color: CYAN }}>ใช้บัญชี Demo</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="py-10 px-5" style={{ background: "#02040a", borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }}>
                <Zap size={14} color="#fff" fill="#fff" />
              </div>
              <span className="text-base font-black tracking-widest" style={{ color: "#60a5fa", letterSpacing: "0.15em" }}>VOLT</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {["PromptPay", "VISA", "Mastercard", "TrueMoney"].map((p) => (
                <span key={p} className="text-[11px] px-3 py-1 rounded-full" style={{ background: `${ACCENT}12`, color: "#64748b", border: `1px solid ${BORDER}` }}>{p}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20 }}>
            <p className="text-[12px]" style={{ color: "#334155" }}>© 2026 VOLT Gaming · สงวนลิขสิทธิ์</p>
            <p className="text-[11px]" style={{ color: "#1a2332" }}>Secure Payments · SSL Encrypted</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
