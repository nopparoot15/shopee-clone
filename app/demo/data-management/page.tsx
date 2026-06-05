"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, LayoutDashboard, Users, FileBarChart, Settings,
  Search, Download, TrendingUp, TrendingDown, X, Bell, Shield,
  Database, ChevronRight, Eye, EyeOff, LogOut,
} from "lucide-react";

/* ─── palette ─────────────────────────────── */
const BG     = "#f6f8fc";
const WHITE  = "#ffffff";
const ACCENT = "#4f46e5";
const BORDER = "#e8ecf4";
const TEXT   = "#1e293b";
const MUTED  = "#64748b";

/* ─── user rows ───────────────────────────── */
const USERS = [
  { id: 1, name: "สมชาย ใจดี",    dept: "IT",        role: "Admin",  status: "Active",   trend: +12, email: "somchai@nexus.co", joined: "01/03/2024" },
  { id: 2, name: "สุดา มานะ",     dept: "HR",        role: "Editor", status: "Active",   trend: +5,  email: "suda@nexus.co",    joined: "15/06/2024" },
  { id: 3, name: "วิชัย สำราญ",   dept: "Finance",   role: "Viewer", status: "Inactive", trend: -3,  email: "wichai@nexus.co",  joined: "22/01/2023" },
  { id: 4, name: "นภา รักไทย",    dept: "Marketing", role: "Editor", status: "Active",   trend: +8,  email: "napa@nexus.co",    joined: "08/09/2024" },
  { id: 5, name: "พงษ์ศักดิ์ ดี", dept: "IT",        role: "Viewer", status: "Active",   trend: +1,  email: "pong@nexus.co",    joined: "17/11/2023" },
  { id: 6, name: "กนกวรรณ แก้ว",  dept: "Finance",   role: "Admin",  status: "Active",   trend: +20, email: "kanok@nexus.co",   joined: "03/02/2025" },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 90, H = 40, PAD = 4;
  const pts = data.map((v, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = PAD + ((max - v) / range) * (H - PAD * 2);
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: "visible" }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const MONTHS   = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."];
const LINE_DATA = [420, 530, 490, 680, 720, 810];

function LineChart() {
  const W = 400, H = 150, PL = 36, PR = 12, PT = 12, PB = 28;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;
  const min    = Math.min(...LINE_DATA) - 40;
  const max    = Math.max(...LINE_DATA) + 20;
  const range  = max - min;
  const pts    = LINE_DATA.map((v, i) => {
    const x = PL + (i / (LINE_DATA.length - 1)) * innerW;
    const y = PT + ((max - v) / range) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
      {[min, (min + max) / 2, max].map((v, i) => {
        const y = PT + ((max - v) / range) * innerH;
        return (
          <g key={i}>
            <line x1={PL} y1={y} x2={PL + innerW} y2={y} stroke={BORDER} strokeWidth="0.5" />
            <text x={PL - 4} y={y + 4} textAnchor="end" fontSize="9" fill={MUTED}>{Math.round(v)}</text>
          </g>
        );
      })}
      {MONTHS.map((m, i) => {
        const x = PL + (i / (MONTHS.length - 1)) * innerW;
        return <text key={i} x={x} y={H - 4} textAnchor="middle" fontSize="9" fill={MUTED}>{m}</text>;
      })}
      <polyline
        points={[`${PL},${PT + innerH}`, ...pts, `${PL + innerW},${PT + innerH}`].join(" ")}
        fill={`${ACCENT}14`}
        stroke="none"
      />
      <polyline points={pts.join(" ")} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => {
        const [cx, cy] = p.split(",").map(Number);
        return <circle key={i} cx={cx} cy={cy} r="3" fill={WHITE} stroke={ACCENT} strokeWidth="2" />;
      })}
    </svg>
  );
}

type TabId   = "Overview" | "ผู้ใช้งาน" | "รายงาน" | "ตั้งค่า";
type UserRow = typeof USERS[0];
type View    = "login" | "dashboard";

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  Admin:  { bg: "#eef2ff", color: ACCENT },
  Editor: { bg: "#f0fdf4", color: "#059669" },
  Viewer: { bg: "#f8fafc", color: MUTED },
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-5 rounded-full transition-all cursor-pointer"
      style={{ background: on ? ACCENT : "#cbd5e1" }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
        style={{ left: on ? "calc(100% - 18px)" : "2px" }}
      />
    </button>
  );
}

export default function DataManagementPage() {
  const [view, setView]             = useState<View>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass]   = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [tab, setTab]               = useState<TabId>("Overview");
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("ทั้งหมด");
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastDone, setToastDone]       = useState(false);

  const [notifEmail, setNotifEmail]   = useState(true);
  const [notifSystem, setNotifSystem] = useState(false);
  const [twoFA, setTwoFA]             = useState(false);

  const filteredUsers = USERS.filter((r) => {
    const matchSearch = r.name.includes(search) || r.dept.includes(search);
    const matchRole   = roleFilter === "ทั้งหมด" || r.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleExport = () => {
    if (toastVisible) return;
    setToastVisible(true);
    setToastDone(false);
    setTimeout(() => setToastDone(true), 2000);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const fillDemo = () => {
    setLoginEmail("demo@nexus.co");
    setLoginPass("demo1234");
    setLoginError("");
  };

  const handleLogin = () => {
    if (!loginEmail.trim() || !loginPass.trim()) {
      setLoginError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    setLoginError("");
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setView("dashboard");
    }, 1000);
  };

  const NAV_ITEMS: { id: TabId; icon: React.ReactNode; label: string }[] = [
    { id: "Overview",  icon: <LayoutDashboard size={15} />, label: "Overview" },
    { id: "ผู้ใช้งาน", icon: <Users size={15} />,           label: "ผู้ใช้งาน" },
    { id: "รายงาน",   icon: <FileBarChart size={15} />,     label: "รายงาน" },
    { id: "ตั้งค่า",  icon: <Settings size={15} />,         label: "ตั้งค่า" },
  ];

  /* ── LOGIN VIEW ── */
  if (view === "login") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: BG, fontFamily: "sans-serif" }}
      >
        <div
          className="w-full max-w-[380px] rounded-2xl p-8"
          style={{ background: WHITE, border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(79,70,229,0.07)" }}
        >
          {/* logo */}
          <div className="flex items-center gap-2 justify-center mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ACCENT }}>
              <Database size={17} color="#fff" />
            </div>
            <div>
              <span className="text-[16px] font-bold" style={{ color: TEXT }}>Nexus</span>
              <span className="text-[16px] font-bold" style={{ color: ACCENT }}> Admin</span>
            </div>
          </div>
          <p className="text-center text-[12px] mb-7" style={{ color: MUTED }}>ระบบจัดการข้อมูลองค์กร</p>

          {/* email */}
          <div className="mb-3">
            <label className="block text-[12px] font-medium mb-1.5" style={{ color: TEXT }}>อีเมล</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none transition-all"
              style={{ border: `1px solid ${BORDER}`, background: BG, color: TEXT }}
              placeholder="email@nexus.co"
            />
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="block text-[12px] font-medium mb-1.5" style={{ color: TEXT }}>รหัสผ่าน</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={loginPass}
                onChange={(e) => { setLoginPass(e.target.value); setLoginError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none transition-all pr-10"
                style={{ border: `1px solid ${BORDER}`, background: BG, color: TEXT }}
                placeholder="รหัสผ่าน"
              />
              <button
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: "#94a3b8" }}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {loginError && (
            <p className="text-[11px] mb-3 text-center" style={{ color: "#ef4444" }}>{loginError}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full py-3 rounded-xl text-[13px] font-bold cursor-pointer mb-4 transition-all"
            style={{ background: loginLoading ? "#a5b4fc" : ACCENT, color: "#fff" }}
          >
            {loginLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          {/* demo credentials */}
          <div
            className="rounded-xl p-3 text-center cursor-pointer transition-all"
            style={{ background: "#eef2ff", border: `1px solid #c7d2fe` }}
            onClick={fillDemo}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: ACCENT }}>Demo Credentials</p>
            <p className="text-[11px]" style={{ color: MUTED }}>demo@nexus.co / demo1234</p>
            <p className="text-[10px] mt-1" style={{ color: "#a5b4fc" }}>คลิกเพื่อกรอกอัตโนมัติ</p>
          </div>

          <div className="mt-5 text-center">
            <Link href="/" className="text-[11px] flex items-center justify-center gap-1" style={{ color: "#94a3b8" }}>
              <ArrowLeft size={11} /> กลับพอร์ตโฟลิโอ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── DASHBOARD VIEW ── */
  return (
    <div className="min-h-screen flex" style={{ background: BG, fontFamily: "sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <div
        className="w-[210px] shrink-0 flex-col hidden sm:flex"
        style={{ background: WHITE, borderRight: `1px solid ${BORDER}` }}
      >
        {/* logo */}
        <div className="h-14 flex items-center px-5 gap-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: ACCENT }}>
            <Database size={14} color="#fff" />
          </div>
          <div>
            <span className="text-[13px] font-bold" style={{ color: TEXT }}>Nexus</span>
            <span className="text-[13px] font-bold" style={{ color: ACCENT }}> Admin</span>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] text-left transition-all cursor-pointer"
              style={
                tab === n.id
                  ? { background: "#eef2ff", color: ACCENT, fontWeight: 600 }
                  : { color: MUTED }
              }
            >
              <span style={{ color: tab === n.id ? ACCENT : "#94a3b8" }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 space-y-1" style={{ borderTop: `1px solid ${BORDER}` }}>
          <button
            onClick={() => { setView("login"); setTab("Overview"); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] text-left cursor-pointer transition-all"
            style={{ color: "#ef4444" }}
          >
            <LogOut size={14} color="#ef4444" />
            ออกจากระบบ
          </button>
          <Link href="/" className="flex items-center gap-1.5 text-[11px] px-3 py-1" style={{ color: "#94a3b8" }}>
            <ArrowLeft size={11} /> กลับหน้าหลัก
          </Link>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* topbar */}
        <div
          className="flex items-center justify-between px-5 h-14 shrink-0"
          style={{ background: WHITE, borderBottom: `1px solid ${BORDER}` }}
        >
          <div>
            <p className="text-[14px] font-bold" style={{ color: TEXT }}>{tab}</p>
            <p className="text-[10px]" style={{ color: "#94a3b8" }}>อัปเดตล่าสุด: 05/06/2026 · 10:32</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="sm:hidden flex items-center gap-1 text-[12px]" style={{ color: "#94a3b8" }}>
              <ArrowLeft size={13} /> กลับ
            </Link>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-xl transition-colors cursor-pointer"
              style={{ background: "#eef2ff", color: ACCENT, border: `1px solid #c7d2fe` }}
            >
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* toast */}
        {toastVisible && (
          <div
            className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all"
            style={{
              background: toastDone ? "#f0fdf4" : WHITE,
              border: `1px solid ${toastDone ? "#bbf7d0" : BORDER}`,
              color: toastDone ? "#059669" : TEXT,
            }}
          >
            {toastDone ? "✓ ดาวน์โหลดแล้ว" : "กำลัง Export..."}
          </div>
        )}

        {/* ════ OVERVIEW ════ */}
        {tab === "Overview" && (
          <div className="flex-1 p-5 space-y-4 overflow-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "ผู้ใช้งานทั้งหมด", val: "1,248", delta: "+48",  up: true,  data: [30,45,42,60,55,72,68,80], color: ACCENT },
                { label: "Active วันนี้",      val: "342",   delta: "+12%", up: true,  data: [20,18,35,30,40,38,45,42], color: "#06b6d4" },
                { label: "เอกสาร",            val: "8,432", delta: "+203", up: true,  data: [50,52,58,55,70,68,75,80], color: "#10b981" },
                { label: "DB Size",            val: "2.4 GB",delta: "+0.1", up: false, data: [60,62,63,65,64,67,68,70], color: "#f59e0b" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl px-4 py-3 flex flex-col gap-1"
                  style={{ background: WHITE, border: `1px solid ${BORDER}` }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[11px]" style={{ color: "#94a3b8" }}>{s.label}</p>
                    <Sparkline data={s.data} color={s.color} />
                  </div>
                  <p className="text-[22px] font-black leading-tight" style={{ color: TEXT }}>{s.val}</p>
                  <div className="flex items-center gap-1">
                    {s.up ? <TrendingUp size={11} color="#10b981" /> : <TrendingDown size={11} color="#ef4444" />}
                    <span className="text-[10px]" style={{ color: s.up ? "#10b981" : "#ef4444" }}>
                      {s.delta} จากเดือนที่แล้ว
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
              <div className="rounded-2xl overflow-hidden" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <div className="flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl" style={{ border: `1px solid ${BORDER}`, background: BG }}>
                    <Search size={12} color="#94a3b8" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="text-[12px] outline-none flex-1 bg-transparent"
                      style={{ color: TEXT }}
                      placeholder="ค้นหาผู้ใช้งาน..."
                    />
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                      {["ชื่อ", "แผนก", "Role", "Status", "แนวโน้ม"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium" style={{ color: "#94a3b8" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.filter((r) => r.name.includes(search) || r.dept.includes(search)).map((r, i) => (
                      <tr key={i} className="hover:bg-[#f8fafc] transition-colors" style={{ borderBottom: `1px solid #f8fafc` }}>
                        <td className="px-4 py-2.5 text-[12px] font-medium" style={{ color: TEXT }}>{r.name}</td>
                        <td className="px-4 py-2.5 text-[11px]" style={{ color: MUTED }}>{r.dept}</td>
                        <td className="px-4 py-2.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-lg" style={ROLE_COLORS[r.role]}>{r.role}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${r.status === "Active" ? "bg-emerald-400" : "bg-slate-300"}`} />
                            <span className="text-[11px]" style={{ color: r.status === "Active" ? "#10b981" : "#94a3b8" }}>{r.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1">
                            {r.trend > 0 ? <TrendingUp size={11} color="#10b981" /> : <TrendingDown size={11} color="#ef4444" />}
                            <span className="text-[11px]" style={{ color: r.trend > 0 ? "#10b981" : "#ef4444" }}>
                              {r.trend > 0 ? "+" : ""}{r.trend}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl p-4" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                <p className="text-[12px] font-semibold mb-4" style={{ color: TEXT }}>ผู้ใช้แยกตามแผนก</p>
                <div className="space-y-3">
                  {[
                    { label: "IT",        pct: 70, val: "342" },
                    { label: "HR",        pct: 45, val: "218" },
                    { label: "Finance",   pct: 55, val: "267" },
                    { label: "Marketing", pct: 35, val: "168" },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span style={{ color: MUTED }}>{b.label}</span>
                        <span className="font-medium" style={{ color: TEXT }}>{b.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: "#f1f5f9" }}>
                        <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: ACCENT }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ ผู้ใช้งาน ════ */}
        {tab === "ผู้ใช้งาน" && (
          <div className="flex-1 p-5 overflow-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-3 px-4 py-3 flex-wrap" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-1.5 flex-1 min-w-[160px] px-3 py-2 rounded-xl" style={{ border: `1px solid ${BORDER}`, background: BG }}>
                  <Search size={12} color="#94a3b8" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-[12px] outline-none flex-1 bg-transparent"
                    style={{ color: TEXT }}
                    placeholder="ค้นหา..."
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["ทั้งหมด", "Admin", "Editor", "Viewer"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRoleFilter(r)}
                      className="text-[11px] px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-all"
                      style={
                        roleFilter === r
                          ? { background: ACCENT, color: "#fff" }
                          : { background: BG, color: MUTED, border: `1px solid ${BORDER}` }
                      }
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    {["ชื่อ", "แผนก", "Role", "Status", "แนวโน้ม", ""].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium" style={{ color: "#94a3b8" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((r, i) => (
                    <tr
                      key={i}
                      className="hover:bg-[#f8fafc] transition-colors cursor-pointer"
                      style={{ borderBottom: `1px solid #f8fafc` }}
                      onClick={() => setSelectedUser(r)}
                    >
                      <td className="px-4 py-2.5 text-[12px] font-medium" style={{ color: TEXT }}>{r.name}</td>
                      <td className="px-4 py-2.5 text-[11px]" style={{ color: MUTED }}>{r.dept}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-lg" style={ROLE_COLORS[r.role]}>{r.role}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${r.status === "Active" ? "bg-emerald-400" : "bg-slate-300"}`} />
                          <span className="text-[11px]" style={{ color: r.status === "Active" ? "#10b981" : "#94a3b8" }}>{r.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          {r.trend > 0 ? <TrendingUp size={11} color="#10b981" /> : <TrendingDown size={11} color="#ef4444" />}
                          <span className="text-[11px]" style={{ color: r.trend > 0 ? "#10b981" : "#ef4444" }}>
                            {r.trend > 0 ? "+" : ""}{r.trend}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <ChevronRight size={13} color="#94a3b8" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2.5" style={{ borderTop: `1px solid ${BORDER}` }}>
                <span className="text-[11px]" style={{ color: "#94a3b8" }}>
                  แสดง {filteredUsers.length} จาก {USERS.length} รายการ
                </span>
              </div>
            </div>

            {selectedUser && (
              <>
                <div className="fixed inset-0 z-20" style={{ background: "rgba(15,23,42,0.3)" }} onClick={() => setSelectedUser(null)} />
                <div
                  className="fixed right-0 top-0 bottom-0 z-30 flex flex-col"
                  style={{ width: 300, background: WHITE, borderLeft: `1px solid ${BORDER}`, boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <p className="text-[13px] font-bold" style={{ color: TEXT }}>ข้อมูลผู้ใช้</p>
                    <button onClick={() => setSelectedUser(null)} className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: BG }}>
                      <X size={14} color={MUTED} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#eef2ff" }}>
                      <span className="text-xl font-bold" style={{ color: ACCENT }}>{selectedUser.name[0]}</span>
                    </div>
                    <p className="text-[16px] font-bold mb-0.5" style={{ color: TEXT }}>{selectedUser.name}</p>
                    <span className="text-[11px] px-2 py-0.5 rounded-lg" style={ROLE_COLORS[selectedUser.role]}>{selectedUser.role}</span>
                    <div className="mt-5 space-y-3">
                      {[
                        ["แผนก", selectedUser.dept],
                        ["อีเมล", selectedUser.email],
                        ["วันที่เข้าร่วม", selectedUser.joined],
                        ["สถานะ", selectedUser.status],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-[10px] tracking-wide uppercase mb-0.5" style={{ color: "#94a3b8" }}>{k}</p>
                          <p className="text-[13px]" style={{ color: TEXT }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ════ รายงาน ════ */}
        {tab === "รายงาน" && (
          <div className="flex-1 p-5 space-y-4 overflow-auto">
            <div className="rounded-2xl p-5" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-bold" style={{ color: TEXT }}>กิจกรรมรายเดือน (ม.ค. – มิ.ย. 2569)</p>
              </div>
              <LineChart />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "คำขอทั้งหมด",  val: "3,650", sub: "6 เดือน",  up: true  },
                { label: "เอกสารที่สร้าง", val: "842",   sub: "เดือนนี้", up: true  },
                { label: "ข้อผิดพลาด",   val: "12",    sub: "เดือนนี้", up: false },
                { label: "Uptime",        val: "99.8%", sub: "30 วัน",   up: true  },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl px-4 py-3" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                  <p className="text-[11px] mb-1" style={{ color: "#94a3b8" }}>{s.label}</p>
                  <p className="text-[22px] font-black leading-tight" style={{ color: TEXT }}>{s.val}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: s.up ? "#10b981" : "#ef4444" }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ ตั้งค่า ════ */}
        {tab === "ตั้งค่า" && (
          <div className="flex-1 p-5 overflow-auto">
            <div className="max-w-[560px] space-y-4">

              <div className="rounded-2xl p-5" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <Bell size={15} color={ACCENT} />
                  <p className="text-[13px] font-bold" style={{ color: TEXT }}>การแจ้งเตือน</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px]" style={{ color: TEXT }}>แจ้งเตือนทางอีเมล</p>
                      <p className="text-[11px]" style={{ color: MUTED }}>รับสรุปรายสัปดาห์</p>
                    </div>
                    <Toggle on={notifEmail} onToggle={() => setNotifEmail((v) => !v)} />
                  </div>
                  <div className="flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                    <div>
                      <p className="text-[13px]" style={{ color: TEXT }}>การแจ้งเตือนในระบบ</p>
                      <p className="text-[11px]" style={{ color: MUTED }}>แสดง badge บน icon</p>
                    </div>
                    <Toggle on={notifSystem} onToggle={() => setNotifSystem((v) => !v)} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={15} color={ACCENT} />
                  <p className="text-[13px] font-bold" style={{ color: TEXT }}>ความปลอดภัย</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px]" style={{ color: TEXT }}>Two-Factor Authentication</p>
                    <p className="text-[11px]" style={{ color: MUTED }}>
                      {twoFA ? "เปิดใช้งานอยู่ — บัญชีปลอดภัย" : "แนะนำให้เปิดใช้งาน"}
                    </p>
                  </div>
                  <Toggle on={twoFA} onToggle={() => setTwoFA((v) => !v)} />
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <Database size={15} color={ACCENT} />
                  <p className="text-[13px] font-bold" style={{ color: TEXT }}>ข้อมูลระบบ</p>
                </div>
                <div className="space-y-2">
                  {[
                    ["เวอร์ชัน",   "Nexus Admin v2.4.1"],
                    ["Build",      "20260605-prod"],
                    ["Environment","Production"],
                    ["Node",       "v22.3.0"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[12px]">
                      <span style={{ color: MUTED }}>{k}</span>
                      <span className="font-mono" style={{ color: TEXT }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
