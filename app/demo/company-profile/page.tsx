"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Star } from "lucide-react";

const SERVICES = [
  { emoji: "🌐", title: "เว็บไซต์บริษัท", desc: "สร้าง First Impression ที่ดีกับลูกค้า Responsive ทุกอุปกรณ์" },
  { emoji: "🛒", title: "ร้านค้าออนไลน์", desc: "ขายสินค้าได้ทันที ระบบตะกร้า ชำระเงิน จัดการออเดอร์" },
  { emoji: "⚙️", title: "ระบบ Backend", desc: "API, Database, Dashboard บริหารจัดการข้อมูลองค์กร" },
  { emoji: "📈", title: "SEO & Performance", desc: "ติดอันดับ Google เร็วขึ้น โหลดเร็ว ประหยัดค่า Ads" },
];

const REVIEWS = [
  { name: "คุณมนต์ชัย", role: "เจ้าของร้านอาหาร", text: "ระบบ QR Order ช่วยลดพนักงานได้มาก ลูกค้าสั่งเองได้ง่ายมาก", stars: 5 },
  { name: "คุณปิยะ", role: "CEO บริษัท XYZ", text: "เว็บ Company Profile ดูดีมาก ลูกค้าต่างชาติชมว่า Professional มาก", stars: 5 },
  { name: "คุณนิสา", role: "Admin บริษัท ABC", text: "ระบบจัดการข้อมูลใช้งานง่าย ทีมงานเรียนรู้ได้เร็วมาก", stars: 5 },
];

export default function CompanyProfileDemo() {
  const [activeReview, setActiveReview] = useState(0);
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "sans-serif" }}>

      {/* Demo bar */}
      <div className="flex items-center justify-between px-5 h-[40px] bg-[#f8fafc]" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[11px] text-[#94a3b8] hover:text-[#64748b] transition-colors">
          <ArrowLeft size={12} /> กลับหน้าหลัก
        </Link>
        <span className="text-[11px] text-[#94a3b8]">Demo — Company Profile Website</span>
        <div className="w-24" />
      </div>

      {/* Site nav */}
      <nav className="bg-white sticky top-0 z-10" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 flex items-center justify-between h-[52px]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white text-[13px] font-bold">G</span>
            </div>
            <span className="text-[14px] font-semibold text-[#0f172a]">GreenTech</span>
          </div>
          <div className="hidden sm:flex gap-5 text-[13px] text-[#64748b]">
            <a href="#services" className="hover:text-emerald-600 transition-colors cursor-pointer">บริการ</a>
            <a href="#reviews" className="hover:text-emerald-600 transition-colors cursor-pointer">รีวิว</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors cursor-pointer">ติดต่อ</a>
          </div>
          <button className="bg-emerald-500 text-white text-[13px] px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer">
            คุยกับเรา
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-[860px] mx-auto px-6 py-14">
        <div className="max-w-[560px]">
          <p className="text-[12px] text-[#94a3b8] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
            พร้อมดูแลโปรเจคของคุณ
          </p>
          <h1 className="text-[34px] font-bold text-[#0f172a] leading-[1.2] mb-4">
            เทคโนโลยีที่ช่วยให้<br />
            <span className="text-emerald-500">ธุรกิจเติบโต</span>
          </h1>
          <p className="text-[14px] text-[#64748b] leading-relaxed mb-7">
            เราพัฒนาเว็บไซต์และระบบสำหรับธุรกิจ ตั้งแต่ Start-Up ถึงองค์กรขนาดใหญ่ ส่งมอบงานพร้อมใช้จริงทุกครั้ง
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="flex items-center gap-2 bg-emerald-500 text-white text-[13px] px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer">
              เริ่มต้นโปรเจค <ArrowRight size={15} />
            </button>
            <button className="text-[#0f172a] text-[13px] px-5 py-2.5 rounded-lg hover:bg-[#f8fafc] transition-colors cursor-pointer" style={{ border: "0.5px solid #e2e8f0" }}>
              ดูผลงาน
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["🧑", "👩", "👨", "🧑"].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center text-sm" style={{ border: "2px solid white" }}>
                  {e}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-[12px] text-[#94a3b8] mt-0.5">150+ ลูกค้าพึงพอใจ · ประสบการณ์ 3+ ปี · โปรเจค 180+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="max-w-[860px] mx-auto px-6 py-12">
        <h2 className="text-[22px] font-bold text-[#0f172a] mb-7">บริการของเรา</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-xl p-4 hover:shadow-sm transition-all cursor-pointer group" style={{ border: "0.5px solid #e2e8f0" }}>
              <span className="text-3xl block mb-3">{s.emoji}</span>
              <p className="text-[13px] font-semibold text-[#0f172a] mb-1.5 group-hover:text-emerald-600 transition-colors">{s.title}</p>
              <p className="text-[11px] text-[#64748b] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" style={{ background: "#f8fafc", borderTop: "0.5px solid #e2e8f0", borderBottom: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 py-10">
          <h2 className="text-[20px] font-bold text-[#0f172a] mb-6">รีวิวจากลูกค้า</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                onClick={() => setActiveReview(i)}
                className="rounded-xl p-4 cursor-pointer transition-all"
                style={{
                  background: activeReview === i ? "#fff" : "#f8fafc",
                  border: activeReview === i ? "1px solid #6ee7b7" : "0.5px solid #e2e8f0",
                  boxShadow: activeReview === i ? "0 2px 12px #10b98120" : "none",
                }}
              >
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={11} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-[12px] text-[#475569] leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <p className="text-[12px] font-medium text-[#0f172a]">{r.name}</p>
                  <p className="text-[10px] text-[#94a3b8]">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why */}
      <div className="max-w-[860px] mx-auto px-6 py-10">
        <h2 className="text-[18px] font-bold text-[#0f172a] mb-5">ทุกโปรเจครวมถึง</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["ส่งมอบตรงเวลา", "Source Code 100% ของคุณ", "Responsive ทุก Device", "SEO พื้นฐาน", "Deploy พร้อมใช้งาน", "ปรึกษาฟรีก่อนตกลง"].map((w) => (
            <div key={w} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
              <span className="text-[12px] text-[#475569]">{w}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div id="contact" style={{ background: "#f8fafc", borderTop: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 py-10">
          <h2 className="text-[18px] font-bold text-[#0f172a] mb-6">เริ่มต้นโปรเจคของคุณ</h2>
          {formSent ? (
            <div className="rounded-xl p-6 text-center max-w-[360px]" style={{ background: "#f0fdf4", border: "0.5px solid #bbf7d0" }}>
              <div className="text-3xl mb-2">✅</div>
              <p className="text-[14px] font-semibold text-emerald-700">ส่งข้อมูลแล้ว!</p>
              <p className="text-[12px] text-emerald-600 mt-1">เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            </div>
          ) : (
            <div className="rounded-xl p-5 max-w-[440px] bg-white" style={{ border: "0.5px solid #e2e8f0" }}>
              <div className="space-y-3 mb-4">
                <input className="w-full text-[13px] px-3 py-2.5 rounded-lg outline-none transition-colors" style={{ border: "0.5px solid #e2e8f0" }} placeholder="ชื่อของคุณ" onFocus={(e) => e.currentTarget.style.borderColor = "#6ee7b7"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
                <input className="w-full text-[13px] px-3 py-2.5 rounded-lg outline-none transition-colors" style={{ border: "0.5px solid #e2e8f0" }} placeholder="Line ID / เบอร์โทร" onFocus={(e) => e.currentTarget.style.borderColor = "#6ee7b7"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
                <textarea className="w-full text-[13px] px-3 py-2.5 rounded-lg outline-none resize-none transition-colors" rows={3} style={{ border: "0.5px solid #e2e8f0" }} placeholder="บอกเล่าโปรเจคของคุณ..." onFocus={(e) => e.currentTarget.style.borderColor = "#6ee7b7"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
              </div>
              <button onClick={() => setFormSent(true)} className="w-full bg-emerald-500 text-white text-[13px] py-2.5 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer font-medium">
                ส่งข้อมูล
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-[12px] text-[#94a3b8]">© 2026 GreenTech</span>
          <span className="text-[12px] text-[#94a3b8]">Built with Next.js</span>
        </div>
      </div>

    </div>
  );
}
