"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, CheckCircle, ChevronRight } from "lucide-react";

/* ─── palette ────────────────────────────── */
const BG = "#080c14";
const CARD = "#0f1520";
const ACCENT = "#3b82f6";
const BORDER = "#1e2a3a";

/* ─── game data ──────────────────────────── */
const GAMES = [
  {
    id: "rov",
    name: "ROV",
    publisher: "Garena",
    gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)",
    coinName: "Voucher",
  },
  {
    id: "ff",
    name: "Free Fire",
    publisher: "Garena",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 55%, #fb923c 100%)",
    coinName: "Diamond",
  },
  {
    id: "mc",
    name: "Minecraft",
    publisher: "Mojang",
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 55%, #86efac 100%)",
    coinName: "Minecoins",
  },
  {
    id: "roblox",
    name: "Roblox",
    publisher: "Roblox Corp",
    gradient: "linear-gradient(135deg, #581c87 0%, #9333ea 55%, #d8b4fe 100%)",
    coinName: "Robux",
  },
];

/* ─── packages ───────────────────────────── */
const PACKS = [
  { id: 1, baht: 50,   coins: 60,    bonus: 0,   hot: false },
  { id: 2, baht: 100,  coins: 110,   bonus: 10,  hot: false },
  { id: 3, baht: 200,  coins: 230,   bonus: 15,  hot: true  },
  { id: 4, baht: 500,  coins: 600,   bonus: 20,  hot: false },
  { id: 5, baht: 1000, coins: 1300,  bonus: 30,  hot: false },
  { id: 6, baht: 2000, coins: 2800,  bonus: 40,  hot: false },
];

/* ─── recent tx ──────────────────────────── */
const RECENT = [
  { game: "ROV",       pack: "฿200",  uid: "98765***", when: "วันนี้ 13:42", ok: true  },
  { game: "Free Fire", pack: "฿100",  uid: "55123***", when: "เมื่อวาน",    ok: true  },
  { game: "Roblox",    pack: "฿500",  uid: "20099***", when: "เมื่อวาน",    ok: false },
];

type Step = "form" | "payment" | "processing" | "done";
type PayMethod = "promptpay" | "card" | "truemoney" | null;

function genTxId() {
  const today = new Date();
  const d = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  return `VOLT-${d}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function TopupDemo() {
  const [gameId, setGameId]       = useState("rov");
  const [packId, setPackId]       = useState(3);
  const [uid, setUid]             = useState("");
  const [step, setStep]           = useState<Step>("form");
  const [payMethod, setPayMethod] = useState<PayMethod>(null);
  const [procStep, setProcStep]   = useState(0);  /* 0=idle,1,2,3,4=done */
  const [txId, setTxId]           = useState("");

  const game = GAMES.find((g) => g.id === gameId)!;
  const pack = PACKS.find((p) => p.id === packId)!;
  const verified = uid.length >= 4;

  /* ── sequential processing animation ── */
  useEffect(() => {
    if (step !== "processing") return;
    setProcStep(1);
    const t1 = setTimeout(() => setProcStep(2), 800);
    const t2 = setTimeout(() => setProcStep(3), 1600);
    const t3 = setTimeout(() => {
      setProcStep(4);
      setTxId(genTxId());
      setStep("done");
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [step]);

  const procLabels = [
    "กำลังตรวจสอบ UID...",
    "กำลังดำเนินการชำระเงิน...",
    "กำลังเติมเหรียญ...",
  ];

  const reset = () => {
    setStep("form");
    setUid("");
    setPayMethod(null);
    setProcStep(0);
    setTxId("");
  };

  return (
    <div className="min-h-screen" style={{ background: BG, color: "#e2e8f0" }}>

      {/* ── nav ── */}
      <div
        className="flex items-center justify-between px-5 h-13"
        style={{ borderBottom: `1px solid ${BORDER}`, background: "#05080f" }}
      >
        <Link href="/" className="flex items-center gap-1.5 text-xs" style={{ color: "#475569" }}>
          <ArrowLeft size={13} /> กลับ
        </Link>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
          >
            <Zap size={14} color="#fff" fill="#fff" />
          </div>
          <span className="text-sm font-bold tracking-widest" style={{ color: ACCENT, letterSpacing: "0.15em" }}>
            VOLT
          </span>
        </div>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
        >
          Demo
        </span>
      </div>

      <div className="max-w-[860px] mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">

        {/* ══ LEFT COLUMN ══════════════════════════════════════ */}
        <div className="space-y-4">

          {/* ── STEP: FORM ── */}
          {(step === "form") && (
            <>
              {/* game selection */}
              <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-[11px] font-semibold tracking-widest text-[#475569] mb-3 uppercase">
                  เลือกเกม
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {GAMES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGameId(g.id)}
                      className="rounded-xl overflow-hidden relative cursor-pointer transition-all"
                      style={{
                        border: gameId === g.id ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                        outline: gameId === g.id ? `2px solid ${ACCENT}30` : "none",
                      }}
                    >
                      {/* gradient block instead of emoji box */}
                      <div
                        className="h-16 w-full flex items-end justify-start p-2"
                        style={{ background: g.gradient }}
                      >
                        {gameId === g.id && (
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: ACCENT }}
                          >
                            <CheckCircle size={10} color="#fff" />
                          </span>
                        )}
                      </div>
                      <div className="px-2 py-2" style={{ background: CARD }}>
                        <p className="text-[12px] font-bold text-white leading-tight">{g.name}</p>
                        <p className="text-[10px] text-[#475569]">{g.publisher}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* UID */}
              <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-[11px] font-semibold tracking-widest text-[#475569] mb-3 uppercase">
                  User ID
                </p>
                <input
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  className="w-full text-sm px-4 py-3 rounded-xl outline-none transition-all"
                  style={{
                    background: BG,
                    border: verified ? `1px solid ${ACCENT}` : `1px solid ${BORDER}`,
                    color: "#e2e8f0",
                  }}
                  placeholder={`กรอก ${game.name} User ID`}
                />
                <div className="h-6 mt-2">
                  {verified && (
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle size={11} />
                      ✓ พบบัญชี — ยืนยันแล้ว
                    </p>
                  )}
                </div>
              </div>

              {/* packages */}
              <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-[11px] font-semibold tracking-widest text-[#475569] mb-3 uppercase">
                  เลือกแพ็กเกจ
                </p>
                <div className="grid grid-cols-3 gap-2.5">
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
                        }}
                      >
                        {p.hot && (
                          <span
                            className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap"
                            style={{ background: ACCENT, color: "#fff" }}
                          >
                            ยอดนิยม
                          </span>
                        )}
                        <p
                          className="text-lg font-black"
                          style={{ color: sel ? ACCENT : "#94a3b8" }}
                        >
                          ฿{p.baht.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-[#475569] mt-0.5">
                          {p.coins.toLocaleString()} {game.coinName}
                        </p>
                        {p.bonus > 0 && (
                          <p className="text-[9px] mt-1 text-emerald-400 font-medium">
                            +{p.bonus}% โบนัส
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* proceed button */}
              <button
                onClick={() => verified && setStep("payment")}
                className="w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-between px-5 transition-all cursor-pointer"
                style={{
                  background: verified
                    ? `linear-gradient(90deg, #1d4ed8, #3b82f6)`
                    : BORDER,
                  color: verified ? "#fff" : "#475569",
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

          {/* ── STEP: PAYMENT ── */}
          {step === "payment" && (
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}
              >
                <div>
                  <p className="text-[11px] text-[#475569] tracking-widest uppercase">ชำระเงิน</p>
                  <p className="text-sm font-bold mt-0.5 text-white">
                    {game.name} · ฿{pack.baht.toLocaleString()}
                  </p>
                </div>
                <button onClick={() => setStep("form")} className="text-xs text-[#475569] hover:text-[#94a3b8]">
                  ← แก้ไข
                </button>
              </div>

              <div className="p-5 space-y-3" style={{ background: BG }}>
                <p className="text-[11px] text-[#475569] tracking-widest uppercase mb-3">
                  เลือกวิธีชำระเงิน
                </p>

                {/* PromptPay */}
                <button
                  onClick={() => setPayMethod("promptpay")}
                  className="w-full rounded-xl p-4 text-left transition-all cursor-pointer"
                  style={{
                    background: CARD,
                    border: payMethod === "promptpay" ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-white">PromptPay</p>
                    {payMethod === "promptpay" && <CheckCircle size={16} color={ACCENT} />}
                  </div>
                  {payMethod === "promptpay" && (
                    /* fake QR: CSS grid pattern */
                    <div className="mx-auto w-32 h-32 rounded-lg overflow-hidden" style={{ background: "#fff" }}>
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px), repeating-linear-gradient(90deg, #000 0px, #000 4px, transparent 4px, transparent 8px)",
                          backgroundSize: "16px 16px",
                          opacity: 0.85,
                        }}
                      />
                    </div>
                  )}
                </button>

                {/* Credit card */}
                <button
                  onClick={() => setPayMethod("card")}
                  className="w-full rounded-xl p-4 text-left transition-all cursor-pointer"
                  style={{
                    background: CARD,
                    border: payMethod === "card" ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-white">บัตรเครดิต / เดบิต</p>
                    {payMethod === "card" && <CheckCircle size={16} color={ACCENT} />}
                  </div>
                  {payMethod === "card" && (
                    /* fake card mockup */
                    <div
                      className="rounded-xl p-4 w-full"
                      style={{
                        background: "linear-gradient(135deg, #1e3a5f, #1d4ed8)",
                        aspectRatio: "16/9",
                        maxWidth: 280,
                      }}
                    >
                      <p className="text-[10px] text-blue-300 tracking-widest uppercase mb-4">
                        VOLT CARD
                      </p>
                      <p className="font-mono text-white text-sm tracking-widest">
                        4••• &nbsp;••••&nbsp; ••••&nbsp; 8824
                      </p>
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
                  style={{
                    background: CARD,
                    border: payMethod === "truemoney" ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{ background: "#ff6600", color: "#fff" }}
                      >
                        T
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">TrueMoney Wallet</p>
                        {payMethod === "truemoney" && (
                          <p className="text-[11px] text-emerald-400 mt-0.5">
                            ยอด: ฿{pack.baht.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {payMethod === "truemoney" && <CheckCircle size={16} color={ACCENT} />}
                  </div>
                </button>

                <button
                  onClick={() => payMethod && setStep("processing")}
                  className="w-full py-4 rounded-2xl text-sm font-bold transition-all cursor-pointer mt-2"
                  style={{
                    background: payMethod
                      ? `linear-gradient(90deg, #1d4ed8, #3b82f6)`
                      : BORDER,
                    color: payMethod ? "#fff" : "#475569",
                  }}
                >
                  {payMethod ? `ชำระเงิน ฿${pack.baht.toLocaleString()}` : "เลือกวิธีชำระก่อน"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP: PROCESSING ── */}
          {step === "processing" && (
            <div
              className="rounded-2xl p-8 flex flex-col items-center gap-5"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${ACCENT}18`, border: `2px solid ${ACCENT}40` }}
              >
                <Zap size={28} color={ACCENT} />
              </div>
              <div className="w-full space-y-3">
                {procLabels.map((label, idx) => {
                  const done = procStep > idx + 1;
                  const active = procStep === idx + 1;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: done ? "#10b981" : active ? ACCENT : BORDER,
                          border: active ? `2px solid ${ACCENT}60` : "none",
                        }}
                      >
                        {done ? (
                          <CheckCircle size={14} color="#fff" />
                        ) : active ? (
                          /* pulsing dot */
                          <span className="w-2 h-2 rounded-full bg-white" />
                        ) : (
                          <span className="w-2 h-2 rounded-full" style={{ background: "#334155" }} />
                        )}
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: done ? "#10b981" : active ? "#e2e8f0" : "#475569" }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP: DONE ── */}
          {step === "done" && (
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: CARD, border: `1px solid #10b981` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#10b98118" }}
              >
                <CheckCircle size={36} color="#10b981" />
              </div>
              <p className="text-lg font-bold text-emerald-400">เติมเงินสำเร็จ!</p>
              <p className="text-sm text-[#94a3b8] mt-1">
                {game.name} · {pack.coins.toLocaleString()} {game.coinName}
              </p>
              <div
                className="mt-4 py-3 px-4 rounded-xl"
                style={{ background: BG, border: `1px solid ${BORDER}` }}
              >
                <p className="text-[10px] text-[#475569] tracking-widest uppercase">
                  Transaction ID
                </p>
                <p className="text-sm font-mono font-bold text-white mt-0.5">{txId}</p>
              </div>
              <button
                onClick={reset}
                className="mt-5 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                style={{ background: ACCENT, color: "#fff" }}
              >
                เติมใหม่
              </button>
            </div>
          )}
        </div>

        {/* ══ RIGHT: recent tx ══════════════════════════════════ */}
        <div
          className="rounded-2xl p-4 self-start"
          style={{ background: CARD, border: `1px solid ${BORDER}` }}
        >
          <p className="text-[11px] font-semibold tracking-widest text-[#475569] mb-4 uppercase">
            ประวัติล่าสุด
          </p>
          <div className="space-y-3">
            {RECENT.map((h, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-2 pb-3"
                style={{ borderBottom: i < RECENT.length - 1 ? `1px solid ${BORDER}` : "none" }}
              >
                <div>
                  <p className="text-[12px] font-semibold text-white">
                    {h.game}
                    <span className="font-normal text-[#475569] ml-1">· {h.pack}</span>
                  </p>
                  <p className="text-[10px] text-[#475569] mt-0.5">
                    {h.uid} · {h.when}
                  </p>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                  style={
                    h.ok
                      ? { background: "#10b98118", color: "#10b981", border: "1px solid #10b98130" }
                      : { background: "#f59e0b18", color: "#f59e0b", border: "1px solid #f59e0b30" }
                  }
                >
                  {h.ok ? "สำเร็จ" : "รอดำเนินการ"}
                </span>
              </div>
            ))}
          </div>

          {/* divider + promo blurb */}
          <div
            className="mt-4 pt-4 rounded-xl p-3 text-center"
            style={{ background: `${ACCENT}0c`, border: `1px solid ${ACCENT}20` }}
          >
            <p className="text-[11px] font-semibold" style={{ color: ACCENT }}>
              โบนัสสูงสุด +40%
            </p>
            <p className="text-[10px] text-[#475569] mt-0.5">สำหรับแพ็ก ฿2,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
