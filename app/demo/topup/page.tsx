"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Search } from "lucide-react";

const GAMES = [
  { id: "rov", name: "ROV", sub: "Garena", emoji: "⚔️", color: "#EFF6FF", accent: "#1A56DB" },
  { id: "ff", name: "Free Fire", sub: "Garena", emoji: "🔥", color: "#FFF7ED", accent: "#ea580c" },
  { id: "mc", name: "Minecraft", sub: "Mojang", emoji: "⛏️", color: "#F0FDF4", accent: "#059669" },
  { id: "roblox", name: "Roblox", sub: "Roblox Corp.", emoji: "🎮", color: "#FDF4FF", accent: "#9333ea" },
];

const AMOUNTS = [50, 100, 200, 500, 1000];

const HISTORY = [
  { id: "TXN-4821", game: "ROV", amount: 200, uid: "98765XXX", status: "สำเร็จ", time: "13:42" },
  { id: "TXN-4820", game: "Free Fire", amount: 100, uid: "55123XXX", status: "สำเร็จ", time: "11:15" },
  { id: "TXN-4819", game: "Roblox", amount: 500, uid: "20099XXX", status: "กำลังดำเนินการ", time: "10:58" },
];

export default function TopupDemo() {
  const [selectedGame, setSelectedGame] = useState("rov");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [uid, setUid] = useState("98765432");
  const [done, setDone] = useState(false);

  const game = GAMES.find((g) => g.id === selectedGame)!;

  const handleConfirm = () => {
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8faff" }}>
      {/* Top bar */}
      <div className="bg-white flex items-center justify-between px-4 h-[52px]" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[13px] text-[#64748b] hover:text-[#1A56DB] transition-colors">
          <ArrowLeft size={15} /> กลับหน้าหลัก
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-[#EFF6FF] text-[#1A56DB] px-2 py-0.5 rounded-full" style={{ border: "0.5px solid #BFDBFE" }}>Demo</span>
          <span className="text-[13px] font-medium text-[#0f172a]">Game Top-Up Platform</span>
        </div>
        <div className="w-24" />
      </div>

      <div className="max-w-[860px] mx-auto px-4 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
          {/* Left: form */}
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-4" style={{ border: "0.5px solid #e2e8f0" }}>
              <p className="text-[12px] font-medium text-[#94a3b8] uppercase tracking-wider mb-3">1 — เลือกเกม</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGame(g.id)}
                    className="rounded-lg p-3 flex flex-col items-center gap-1 transition-all cursor-pointer"
                    style={{
                      background: g.color,
                      border: selectedGame === g.id ? `1.5px solid ${g.accent}` : "0.5px solid #e2e8f0",
                    }}
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <p className="text-[12px] font-medium text-[#0f172a]">{g.name}</p>
                    <p className="text-[10px] text-[#94a3b8]">{g.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-4" style={{ border: "0.5px solid #e2e8f0" }}>
              <p className="text-[12px] font-medium text-[#94a3b8] uppercase tracking-wider mb-3">2 — กรอก User ID</p>
              <div className="flex gap-2">
                <input
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  className="flex-1 text-[13px] px-3 py-2 rounded-lg outline-none"
                  style={{ border: "0.5px solid #e2e8f0" }}
                  placeholder="กรอก User ID"
                />
                <button className="px-3 py-2 rounded-lg bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] transition-colors">
                  <Search size={15} />
                </button>
              </div>
              {uid && (
                <p className="text-[11px] text-[#10b981] mt-1.5 flex items-center gap-1">
                  <CheckCircle size={11} /> พบบัญชี: ผู้ใช้งาน #{uid.slice(0, 5)}***
                </p>
              )}
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-4" style={{ border: "0.5px solid #e2e8f0" }}>
              <p className="text-[12px] font-medium text-[#94a3b8] uppercase tracking-wider mb-3">3 — เลือกจำนวนเงิน</p>
              <div className="grid grid-cols-5 gap-2">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAmount(a)}
                    className="py-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer"
                    style={{
                      border: selectedAmount === a ? "1.5px solid #1A56DB" : "0.5px solid #e2e8f0",
                      background: selectedAmount === a ? "#EFF6FF" : "#fff",
                      color: selectedAmount === a ? "#1A56DB" : "#475569",
                    }}
                  >
                    ฿{a}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm */}
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl text-[14px] font-medium text-white transition-colors cursor-pointer"
              style={{ background: done ? "#10b981" : "#1A56DB" }}
            >
              {done ? "✓ เติมเงินสำเร็จ!" : `ยืนยันเติม ${game.emoji} ${game.name} ฿${selectedAmount}`}
            </button>
          </div>

          {/* Right: history */}
          <div className="bg-white rounded-xl p-4 self-start" style={{ border: "0.5px solid #e2e8f0" }}>
            <p className="text-[12px] font-medium text-[#94a3b8] uppercase tracking-wider mb-3">ประวัติ Transaction</p>
            <div className="space-y-2.5">
              {HISTORY.map((h) => (
                <div key={h.id} className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-medium text-[#0f172a]">{h.game} · ฿{h.amount}</p>
                    <p className="text-[10px] text-[#94a3b8]">{h.id} · {h.time}</p>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={
                      h.status === "สำเร็จ"
                        ? { background: "#DCFCE7", color: "#166534" }
                        : { background: "#FEF3C7", color: "#92400e" }
                    }
                  >
                    {h.status === "สำเร็จ" ? "✓" : <Clock size={8} className="inline" />} {h.status}
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
