"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Download, Users, FileText, TrendingUp, Database, ChevronLeft, ChevronRight } from "lucide-react";

const ROWS = [
  { id: 1, name: "สมชาย ใจดี", dept: "IT", role: "Admin", status: "Active", updated: "04/06/2026" },
  { id: 2, name: "สุดา มานะ", dept: "HR", role: "Editor", status: "Active", updated: "03/06/2026" },
  { id: 3, name: "วิชัย สำราญ", dept: "Finance", role: "Viewer", status: "Inactive", updated: "01/06/2026" },
  { id: 4, name: "นภา รักไทย", dept: "Marketing", role: "Editor", status: "Active", updated: "04/06/2026" },
  { id: 5, name: "พงษ์ศักดิ์ ดี", dept: "IT", role: "Viewer", status: "Active", updated: "02/06/2026" },
  { id: 6, name: "กนกวรรณ แก้ว", dept: "Finance", role: "Admin", status: "Active", updated: "04/06/2026" },
];

const STATS = [
  { label: "ผู้ใช้งานทั้งหมด", value: "1,248", icon: <Users size={18} />, color: "#1A56DB", bg: "#EFF6FF" },
  { label: "เอกสารในระบบ", value: "8,432", icon: <FileText size={18} />, color: "#059669", bg: "#F0FDF4" },
  { label: "Active วันนี้", value: "342", icon: <TrendingUp size={18} />, color: "#9333ea", bg: "#FDF4FF" },
  { label: "ขนาดฐานข้อมูล", value: "2.4 GB", icon: <Database size={18} />, color: "#ea580c", bg: "#FFF7ED" },
];

export default function DataManagementDemo() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ทั้งหมด");
  const [page, setPage] = useState(1);

  const filtered = ROWS.filter((r) => {
    const matchSearch = r.name.includes(search) || r.dept.includes(search);
    const matchRole = roleFilter === "ทั้งหมด" || r.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen" style={{ background: "#f8faff" }}>
      {/* Top bar */}
      <div className="bg-white flex items-center justify-between px-4 h-[52px]" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[13px] text-[#64748b] hover:text-[#1A56DB] transition-colors">
          <ArrowLeft size={15} /> กลับหน้าหลัก
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-[#EFF6FF] text-[#1A56DB] px-2 py-0.5 rounded-full" style={{ border: "0.5px solid #BFDBFE" }}>Demo</span>
          <span className="text-[13px] font-medium text-[#0f172a]">Data Management System</span>
        </div>
        <div className="w-24" />
      </div>

      <div className="max-w-[860px] mx-auto px-4 py-4 flex flex-col gap-4">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3" style={{ border: "0.5px solid #e2e8f0" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div>
                <p className="text-[16px] font-semibold text-[#0f172a] leading-tight">{s.value}</p>
                <p className="text-[10px] text-[#94a3b8]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: "0.5px solid #e2e8f0" }}>
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-3 flex-wrap" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
            <div className="flex items-center gap-1.5 flex-1 min-w-[160px] px-3 py-1.5 rounded-lg" style={{ border: "0.5px solid #e2e8f0" }}>
              <Search size={13} className="text-[#94a3b8]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-[12px] outline-none flex-1 text-[#0f172a]"
                placeholder="ค้นหาชื่อ / แผนก..."
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-[12px] px-3 py-1.5 rounded-lg outline-none text-[#475569]"
              style={{ border: "0.5px solid #e2e8f0" }}
            >
              {["ทั้งหมด", "Admin", "Editor", "Viewer"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <button className="flex items-center gap-1.5 text-[12px] text-[#1A56DB] px-3 py-1.5 rounded-lg hover:bg-[#EFF6FF] transition-colors" style={{ border: "0.5px solid #BFDBFE" }}>
              <Download size={13} /> Export
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  {["#", "ชื่อ", "แผนก", "Role", "Status", "อัปเดตล่าสุด"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[11px] text-[#94a3b8] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#f8faff] transition-colors" style={{ borderBottom: "0.5px solid #f1f5f9" }}>
                    <td className="px-4 py-2.5 text-[#94a3b8]">{r.id}</td>
                    <td className="px-4 py-2.5 font-medium text-[#0f172a]">{r.name}</td>
                    <td className="px-4 py-2.5 text-[#475569]">{r.dept}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px]" style={{
                        background: r.role === "Admin" ? "#EFF6FF" : r.role === "Editor" ? "#F0FDF4" : "#f1f5f9",
                        color: r.role === "Admin" ? "#1A56DB" : r.role === "Editor" ? "#059669" : "#475569",
                      }}>
                        {r.role}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${r.status === "Active" ? "bg-[#10b981]" : "bg-[#e2e8f0]"}`} />
                        <span className={r.status === "Active" ? "text-[#059669]" : "text-[#94a3b8]"}>{r.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[#94a3b8]">{r.updated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[12px] text-[#94a3b8]">ไม่พบข้อมูล</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: "0.5px solid #e2e8f0" }}>
            <span className="text-[11px] text-[#94a3b8]">แสดง {filtered.length} จาก {ROWS.length} รายการ</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-1.5 rounded hover:bg-[#f1f5f9] transition-colors text-[#475569]">
                <ChevronLeft size={14} />
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-6 h-6 rounded text-[11px] transition-colors ${page === n ? "bg-[#1A56DB] text-white" : "text-[#475569] hover:bg-[#f1f5f9]"}`}
                >
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(3, p + 1))} className="p-1.5 rounded hover:bg-[#f1f5f9] transition-colors text-[#475569]">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
