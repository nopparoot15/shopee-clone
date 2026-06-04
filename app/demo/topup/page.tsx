"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";

const GAMES = [
  { id: "rov", name: "ROV", publisher: "Garena", emoji: "⚔️", color: "#6366f1", glow: "#6366f140" },
  { id: "ff", name: "Free Fire", publisher: "Garena", emoji: "🔥", color: "#ef4444", glow: "#ef444440" },
  { id: "mc", name: "Minecraft", publisher: "Mojang", emoji: "⛏️", color: "#22c55e", glow: "#22c55e40" },
  { id: "roblox", name: "Roblox", publisher: "Roblox Corp", emoji: "🎮", color: "#a855f7", glow: "#a855f740" },
];

const PACKS = [
  { id: 1, amount: 50, label: "50 เหรียญ", bonus: "" },
  { id: 2, amount: 100, label: "110 เหรียญ", bonus: "+10%" },
  { id: 3, amount: 200, label: "230 เหรียญ", bonus: "+15%", hot: true },
  { id: 4, amount: 500, label: "600 เหรียญ", bonus: "+20%" },
  { id: 5, amount: 1000, label: "1,300 เหรียญ", bonus: "+30%" },
  { id: 6, amount: 2000, label: "2,800 เหรียญ", bonus: "+40%" },
];

const HISTORY = [
  { game: "ROV", pack: "฿200", uid: "98765***", time: "วันนี้ 13:42", ok: true },
  { game: "Free Fire", pack: "฿100", uid: "55123***", time: "เมื่อวาน", ok: true },
  { game: "Roblox", pack: "฿500", uid: "20099***", time: "เมื่อวาน", ok: false },
];

export default function TopupDemo() {
  const [game, setGame] = useState("rov");
  const [pack, setPack] = useState(3);
  const [uid, setUid] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");

  const selected = GAMES.find((g) => g.id === game)!;
  const selectedPack = PACKS.find((p) => p.id === pack)!;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f", color: "#e2e8f0" }}>

      {/* Nav */}
      <div className="flex items-center justify-between px-5 h-[52px]" style={{ borderBottom: "0.5px solid #1a1a2e", background: "#07070d" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[12px] text-[#475569] hover:text-[#94a3b8] transition-colors">
          <ArrowLeft size={13} /> กลับ
        </Link>
        <div className="flex items-center gap-2">
          <Zap size={14} style={{ color: "#a855f7" }} />
          <span className="text-[13px] font-medium" style={{ color: "#a855f7" }}>TopUp.gg</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "#a855f720", color: "#a855f7", border: "0.5px solid #a855f740" }}>Demo</span>
      </div>

      <div className="max-w-[860px] mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">

          {/* Left */}
          <div className="space-y-4">

            {/* Game select */}
            <div className="rounded-xl p-4" style={{ background: "#0f0f1a", border: "0.5px solid #1a1a2e" }}>
              <p className="text-[11px] text-[#475569] uppercase tracking-widest mb-3">เลือกเกม</p>
              <div className="grid grid-cols-4 gap-2">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGame(g.id)}
                    className="rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all cursor-pointer"
                    style={{
                      background: game === g.id ? `${g.color}15` : "#0a0a0f",
                      border: game === g.id ? `1px solid ${g.color}` : "0.5px solid #1a1a2e",
                      boxShadow: game === g.id ? `0 0 16px ${g.glow}` : "none",
                    }}
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <p className="text-[11px] font-medium" style={{ color: game === g.id ? g.color : "#94a3b8" }}>{g.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* UID */}
            <div className="rounded-xl p-4" style={{ background: "#0f0f1a", border: "0.5px solid #1a1a2e" }}>
              <p className="text-[11px] text-[#475569] uppercase tracking-widest mb-3">User ID</p>
              <input
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className="w-full text-[13px] px-4 py-2.5 rounded-lg outline-none transition-all"
                style={{
                  background: "#0a0a0f",
                  border: uid ? `1px solid ${selected.color}` : "0.5px solid #1a1a2e",
                  color: "#e2e8f0",
                }}
                placeholder={`กรอก ${selected.name} ID ของคุณ`}
              />
              {uid.length >= 4 && (
                <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle size={11} /> ตรวจสอบแล้ว — พบบัญชีผู้ใช้
                </p>
              )}
            </div>

            {/* Packs */}
            <div className="rounded-xl p-4" style={{ background: "#0f0f1a", border: "0.5px solid #1a1a2e" }}>
              <p className="text-[11px] text-[#475569] uppercase tracking-widest mb-3">เลือกแพ็กเกจ</p>
              <div className="grid grid-cols-3 gap-2">
                {PACKS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPack(p.id)}
                    className="rounded-xl p-3 text-center relative transition-all cursor-pointer"
                    style={{
                      background: pack === p.id ? `${selected.color}15` : "#0a0a0f",
                      border: pack === p.id ? `1px solid ${selected.color}` : "0.5px solid #1a1a2e",
                    }}
                  >
                    {p.hot && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: selected.color, color: "#fff" }}>
                        ยอดนิยม
                      </span>
                    )}
                    <p className="text-[18px] font-bold" style={{ color: pack === p.id ? selected.color : "#94a3b8" }}>
                      ฿{p.amount}
                    </p>
                    <p className="text-[10px] text-[#475569] mt-0.5">{p.label}</p>
                    {p.bonus && (
                      <p className="text-[9px] mt-1" style={{ color: "#22c55e" }}>{p.bonus}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm button */}
            {step === "form" && (
              <button
                onClick={() => uid.length >= 4 ? setStep("confirm") : null}
                className="w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer"
                style={{
                  background: uid.length >= 4 ? selected.color : "#1a1a2e",
                  color: uid.length >= 4 ? "#fff" : "#475569",
                  boxShadow: uid.length >= 4 ? `0 4px 20px ${selected.glow}` : "none",
                }}
              >
                {uid.length >= 4 ? `เติม ${selected.emoji} ${selected.name} ฿${selectedPack.amount}` : "กรอก User ID ก่อน"}
              </button>
            )}

            {step === "confirm" && (
              <div className="rounded-xl p-4 space-y-3" style={{ background: "#0f0f1a", border: `1px solid ${selected.color}` }}>
                <p className="text-[12px] text-[#94a3b8]">ยืนยันการเติมเงิน</p>
                <div className="space-y-1.5">
                  {[
                    ["เกม", `${selected.emoji} ${selected.name}`],
                    ["User ID", uid],
                    ["แพ็กเกจ", `฿${selectedPack.amount} → ${selectedPack.label}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[12px]">
                      <span className="text-[#475569]">{k}</span>
                      <span className="text-white">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setStep("form")} className="flex-1 py-2 rounded-lg text-[12px] text-[#94a3b8] transition-colors" style={{ border: "0.5px solid #1a1a2e" }}>
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => setStep("done")}
                    className="flex-1 py-2 rounded-lg text-[12px] font-semibold text-white transition-all"
                    style={{ background: selected.color, boxShadow: `0 2px 12px ${selected.glow}` }}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            )}

            {step === "done" && (
              <div className="rounded-xl p-5 text-center" style={{ background: "#0f0f1a", border: "1px solid #22c55e", boxShadow: "0 0 20px #22c55e20" }}>
                <div className="text-4xl mb-2">✅</div>
                <p className="text-[14px] font-semibold text-emerald-400">เติมเงินสำเร็จ!</p>
                <p className="text-[11px] text-[#475569] mt-1">{selected.emoji} {selected.name} · ฿{selectedPack.amount} · {selectedPack.label}</p>
                <button onClick={() => { setStep("form"); setUid(""); }} className="mt-3 text-[11px] text-[#475569] hover:text-[#94a3b8] transition-colors">
                  เติมใหม่
                </button>
              </div>
            )}
          </div>

          {/* Right: history */}
          <div className="rounded-xl p-4 self-start" style={{ background: "#0f0f1a", border: "0.5px solid #1a1a2e" }}>
            <p className="text-[11px] text-[#475569] uppercase tracking-widest mb-3">ประวัติล่าสุด</p>
            <div className="space-y-3">
              {HISTORY.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-medium text-white">{h.game} · {h.pack}</p>
                    <p className="text-[10px] text-[#475569] mt-0.5">{h.uid} · {h.time}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={
                    h.ok
                      ? { background: "#22c55e15", color: "#22c55e", border: "0.5px solid #22c55e40" }
                      : { background: "#f59e0b15", color: "#f59e0b", border: "0.5px solid #f59e0b40" }
                  }>
                    {h.ok ? "สำเร็จ" : "รอดำเนินการ"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
