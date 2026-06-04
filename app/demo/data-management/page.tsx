"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, LayoutDashboard, Users, FileBarChart, Settings,
  Search, Download, TrendingUp, TrendingDown, MoreHorizontal,
} from "lucide-react";

const NAV = [
  { icon: <LayoutDashboard size={15} />, label: "Overview", active: true },
  { icon: <Users size={15} />, label: "ผู้ใช้งาน", active: false },
  { icon: <FileBarChart size={15} />, label: "รายงาน", active: false },
  { icon: <Settings size={15} />, label: "ตั้งค่า", active: false },
];

const ROWS = [
  { name: "สมชาย ใจดี", dept: "IT", role: "Admin", status: "Active", trend: +12 },
  { name: "สุดา มานะ", dept: "HR", role: "Editor", status: "Active", trend: +5 },
  { name: "วิชัย สำราญ", dept: "Finance", role: "Viewer", status: "Inactive", trend: -3 },
  { name: "นภา รักไทย", dept: "Marketing", role: "Editor", status: "Active", trend: +8 },
  { name: "พงษ์ศักดิ์ ดี", dept: "IT", role: "Viewer", status: "Active", trend: +1 },
  { name: "กนกวรรณ แก้ว", dept: "Finance", role: "Admin", status: "Active", trend: +20 },
];

const BARS = [
  { label: "IT", pct: 70, val: "342" },
  { label: "HR", pct: 45, val: "218" },
  { label: "Finance", pct: 55, val: "267" },
  { label: "Marketing", pct: 35, val: "168" },
];

export default function DataManagementDemo() {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("Overview");

  const filtered = ROWS.filter((r) => r.name.includes(search) || r.dept.includes(search));

  return (
    <div className="min-h-screen flex" style={{ background: "#f8fafc", fontFamily: "sans-serif" }}>

      {/* Sidebar */}
      <div className="w-[200px] shrink-0 flex flex-col hidden sm:flex" style={{ background: "#fff", borderRight: "0.5px solid #e2e8f0" }}>
        {/* Logo */}
        <div className="h-[52px] flex items-center px-4" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
          <span className="text-[13px] font-semibold text-[#0f172a]">DataCore</span>
          <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#94a3b8" }}>v2.4</span>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV.map((n) => (
            <button
              key={n.label}
              onClick={() => setActiveNav(n.label)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] text-left transition-colors cursor-pointer"
              style={
                activeNav === n.label
                  ? { background: "#EFF6FF", color: "#1A56DB" }
                  : { color: "#64748b" }
              }
            >
              <span style={{ color: activeNav === n.label ? "#1A56DB" : "#94a3b8" }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        {/* Back link */}
        <div className="px-4 py-3" style={{ borderTop: "0.5px solid #e2e8f0" }}>
          <Link href="/" className="flex items-center gap-1.5 text-[11px] text-[#94a3b8] hover:text-[#64748b] transition-colors">
            <ArrowLeft size={11} /> กลับหน้าหลัก
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-[52px] bg-white" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
          <div>
            <p className="text-[14px] font-semibold text-[#0f172a]">Overview</p>
            <p className="text-[11px] text-[#94a3b8]">อัปเดตล่าสุด: 04/06/2026 10:32</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 sm:hidden text-[12px] text-[#94a3b8] hover:text-[#64748b]">
              <ArrowLeft size={13} /> กลับ
            </Link>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1A56DB]" style={{ border: "0.5px solid #BFDBFE" }}>Demo</span>
            <button className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg transition-colors text-[#1A56DB] hover:bg-[#EFF6FF]" style={{ border: "0.5px solid #BFDBFE" }}>
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "ผู้ใช้งานทั้งหมด", val: "1,248", delta: "+48", up: true },
              { label: "Active วันนี้", val: "342", delta: "+12%", up: true },
              { label: "เอกสารในระบบ", val: "8,432", delta: "+203", up: true },
              { label: "ขนาด DB", val: "2.4 GB", delta: "+0.1", up: false },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl px-4 py-3" style={{ border: "0.5px solid #e2e8f0" }}>
                <p className="text-[11px] text-[#94a3b8] mb-1">{s.label}</p>
                <p className="text-[22px] font-bold text-[#0f172a] leading-tight">{s.val}</p>
                <div className="flex items-center gap-1 mt-1">
                  {s.up ? <TrendingUp size={11} className="text-emerald-500" /> : <TrendingDown size={11} className="text-red-400" />}
                  <span className={`text-[10px] ${s.up ? "text-emerald-500" : "text-red-400"}`}>{s.delta} จากเดือนที่แล้ว</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: "0.5px solid #e2e8f0" }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "0.5px solid #f1f5f9" }}>
                <div className="flex items-center gap-1.5 flex-1 px-3 py-1.5 rounded-lg" style={{ border: "0.5px solid #e2e8f0" }}>
                  <Search size={12} className="text-[#94a3b8]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-[12px] outline-none flex-1 bg-transparent text-[#0f172a]"
                    placeholder="ค้นหา..."
                  />
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "0.5px solid #f1f5f9" }}>
                    {["ชื่อ", "แผนก", "Role", "Status", "แนวโน้ม", ""].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] text-[#94a3b8] font-medium uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={i} className="hover:bg-[#f8fafc] transition-colors" style={{ borderBottom: "0.5px solid #f8fafc" }}>
                      <td className="px-4 py-2.5 text-[12px] font-medium text-[#0f172a]">{r.name}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#64748b]">{r.dept}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-[10px] px-2 py-0.5 rounded" style={{
                          background: r.role === "Admin" ? "#EFF6FF" : r.role === "Editor" ? "#F0FDF4" : "#f1f5f9",
                          color: r.role === "Admin" ? "#1A56DB" : r.role === "Editor" ? "#059669" : "#64748b",
                        }}>
                          {r.role}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${r.status === "Active" ? "bg-emerald-400" : "bg-[#e2e8f0]"}`} />
                          <span className={`text-[11px] ${r.status === "Active" ? "text-emerald-600" : "text-[#94a3b8]"}`}>{r.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          {r.trend > 0
                            ? <TrendingUp size={11} className="text-emerald-500" />
                            : <TrendingDown size={11} className="text-red-400" />}
                          <span className={`text-[11px] ${r.trend > 0 ? "text-emerald-500" : "text-red-400"}`}>
                            {r.trend > 0 ? "+" : ""}{r.trend}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <button className="p-1 rounded hover:bg-[#f1f5f9] transition-colors text-[#94a3b8]">
                          <MoreHorizontal size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderTop: "0.5px solid #f1f5f9" }}>
                <span className="text-[11px] text-[#94a3b8]">แสดง {filtered.length} รายการ</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((n) => (
                    <button key={n} className={`w-6 h-6 rounded text-[10px] transition-colors ${n === 1 ? "bg-[#1A56DB] text-white" : "text-[#94a3b8] hover:bg-[#f1f5f9]"}`}>{n}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="bg-white rounded-xl p-4" style={{ border: "0.5px solid #e2e8f0" }}>
              <p className="text-[12px] font-medium text-[#0f172a] mb-4">ผู้ใช้แยกตามแผนก</p>
              <div className="space-y-3">
                {BARS.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#475569]">{b.label}</span>
                      <span className="text-[#0f172a] font-medium">{b.val}</span>
                    </div>
                    <div className="h-[6px] bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1A56DB] rounded-full transition-all" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
