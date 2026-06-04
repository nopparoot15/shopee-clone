"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: "",
    budget: "",
    detail: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const serviceTypes = [
    "Landing Page",
    "Company Profile Website",
    "Portfolio Website",
    "เว็บร้านอาหาร / คาเฟ่",
    "เว็บร้านค้าออนไลน์",
    "เว็บประชาสัมพันธ์",
    "เว็บแนะนำสินค้า",
    "Full-Stack Web Application",
    "E-commerce ครบวงจร",
    "อื่น ๆ",
  ];

  const budgets = [
    "ต่ำกว่า ฿5,000",
    "฿5,000 – ฿10,000",
    "฿10,000 – ฿20,000",
    "฿20,000 – ฿50,000",
    "มากกว่า ฿50,000",
    "ยังไม่แน่ใจ / ขอคำแนะนำ",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#2563EB]">หน้าหลัก</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700">ปรึกษา / ติดต่อ</span>
      </div>

      {sent ? (
        <div className="bg-white rounded-sm py-20 text-center">
          <CheckCircle size={56} className="mx-auto mb-4 text-[#2563EB]" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">ส่งข้อมูลเรียบร้อยแล้ว</h2>
          <p className="text-gray-500 text-sm mb-6">จะติดต่อกลับภายใน 24 ชั่วโมง ขอบคุณที่ไว้วางใจครับ</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-[#2563EB] text-white rounded text-sm hover:bg-[#1D4ED8] transition-colors"
          >
            ดูบริการทั้งหมด
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
          {/* Form */}
          <div className="bg-white rounded-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={20} className="text-[#2563EB]" />
              <h1 className="font-semibold text-gray-800 text-lg">ปรึกษาฟรี — บอกความต้องการ</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">ชื่อ-นามสกุล / ชื่อธุรกิจ <span className="text-red-400">*</span></label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-colors"
                    placeholder="เช่น คุณสมชาย / ร้านกาแฟสีดา"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">LINE ID / เบอร์โทร <span className="text-red-400">*</span></label>
                  <input
                    required
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-colors"
                    placeholder="@lineid หรือ 08x-xxx-xxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">ประเภทเว็บไซต์ที่ต้องการ</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-colors bg-white"
                  >
                    <option value="">-- เลือกประเภท --</option>
                    {serviceTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">งบประมาณโดยประมาณ</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-colors bg-white"
                  >
                    <option value="">-- เลือกงบ --</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">รายละเอียดเพิ่มเติม</label>
                <textarea
                  value={form.detail}
                  onChange={(e) => setForm({ ...form, detail: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-colors resize-none"
                  placeholder="บอกสิ่งที่ต้องการ เช่น ต้องการเว็บร้านกาแฟ มีเมนูสินค้า แผนที่ ปุ่มสั่งผ่าน LINE มีโทน Minimal สีขาว-น้ำตาล..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#2563EB] text-white rounded font-medium hover:bg-[#1D4ED8] transition-colors"
              >
                <Send size={16} />
                ส่งข้อมูลปรึกษาฟรี
              </button>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="space-y-3">
            <div className="bg-white rounded-sm p-4 space-y-3">
              <h3 className="font-semibold text-gray-700 text-sm">ทำไมต้องเรา?</h3>
              <ul className="space-y-2.5 text-xs text-gray-600">
                {[
                  "ประสบการณ์ Infrastructure จากโครงการองค์กร",
                  "ส่งมอบพร้อม Deploy ใช้งานจริงบน Production",
                  "ไม่ใช่แค่ส่ง Source Code แล้วจบ",
                  "ตั้งค่า Domain + DNS ให้ด้วย",
                  "ปรึกษาก่อน ไม่มีค่าใช้จ่าย",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#2563EB] mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#EFF6FF] rounded-sm p-4">
              <h3 className="font-semibold text-[#2563EB] text-sm mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Next.js", "Tailwind", "Node.js", "Express", "MySQL", "PostgreSQL", "Docker", "Cloudflare", "Linux VPS"].map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-white text-[#2563EB] text-xs rounded border border-blue-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-sm p-4">
              <h3 className="font-semibold text-gray-700 text-sm mb-2">ค่าใช้จ่ายเพิ่มเติม</h3>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Domain (.com)</span>
                  <span className="font-medium text-gray-700">~฿300-500/ปี</span>
                </div>
                <div className="flex justify-between">
                  <span>Hosting (Vercel)</span>
                  <span className="font-medium text-green-600">ฟรี ✓</span>
                </div>
                <div className="flex justify-between">
                  <span>VPS (ถ้าต้องการ)</span>
                  <span className="font-medium text-gray-700">~฿150-250/เดือน</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
