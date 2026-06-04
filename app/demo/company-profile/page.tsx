import Link from "next/link";
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin } from "lucide-react";

const SERVICES = [
  { emoji: "🎨", title: "ออกแบบ UI/UX", desc: "ออกแบบหน้าตาเว็บให้สวยงาม ใช้งานง่าย รองรับทุกอุปกรณ์" },
  { emoji: "⚡", title: "พัฒนาเว็บไซต์", desc: "สร้างเว็บด้วย Next.js + Tailwind CSS โหลดเร็ว SEO ดี" },
  { emoji: "🚀", title: "Deploy & Hosting", desc: "ติดตั้งบน Server จริง พร้อม SSL, CDN และ Backup อัตโนมัติ" },
  { emoji: "🔧", title: "ดูแลหลังการขาย", desc: "แก้ไข อัปเดต และดูแลระบบหลังส่งมอบงาน" },
];

const WHY = [
  "ส่งมอบงานตรงเวลา",
  "Source Code เป็นของลูกค้า 100%",
  "รองรับทุก Device และ Browser",
  "SEO พื้นฐานพร้อมใช้งาน",
  "Deploy บน Server จริง ไม่ใช่ Demo",
  "ปรึกษาฟรีก่อนตกลงงาน",
];

export default function CompanyProfileDemo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo top bar */}
      <div className="bg-white flex items-center justify-between px-4 h-[44px]" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <Link href="/" className="flex items-center gap-1.5 text-[13px] text-[#64748b] hover:text-[#1A56DB] transition-colors">
          <ArrowLeft size={15} /> กลับหน้าหลัก
        </Link>
        <span className="text-[11px] bg-[#EFF6FF] text-[#1A56DB] px-2 py-0.5 rounded-full" style={{ border: "0.5px solid #BFDBFE" }}>
          Demo — Company Profile Website
        </span>
        <div className="w-24" />
      </div>

      {/* === DEMO SITE STARTS HERE === */}

      {/* Site Nav */}
      <nav className="bg-white sticky top-0 z-10" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 flex items-center justify-between h-[52px]">
          <span className="text-[15px] font-semibold text-[#0f172a]">
            <span className="text-[#1A56DB]">●</span> TechCorp
          </span>
          <div className="hidden sm:flex gap-6 text-[13px] text-[#64748b]">
            <a href="#services" className="hover:text-[#1A56DB] transition-colors">บริการ</a>
            <a href="#about" className="hover:text-[#1A56DB] transition-colors">เกี่ยวกับ</a>
            <a href="#contact" className="hover:text-[#1A56DB] transition-colors">ติดต่อ</a>
          </div>
          <button className="bg-[#1A56DB] text-white text-[13px] px-4 py-2 rounded-lg hover:bg-[#1446c0] transition-colors">
            ติดต่อเรา
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1A56DB 60%, #3b82f6 100%)" }}>
        <div className="max-w-[860px] mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-[11px] px-3 py-1.5 rounded-full mb-5" style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            ให้บริการมากกว่า 5 ปี
          </div>
          <h1 className="text-[32px] md:text-[40px] font-bold text-white leading-tight mb-4">
            บริษัทที่คุณวางใจได้<br />
            <span className="text-blue-200">ด้านเทคโนโลยี</span>
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed mb-7 max-w-[460px]">
            เราให้บริการพัฒนาซอฟต์แวร์และเว็บแอปพลิเคชันครบวงจร พร้อมทีมงานมืออาชีพที่มีประสบการณ์
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white text-[#1A56DB] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              ดูบริการของเรา
            </button>
            <button className="text-white text-[13px] px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors" style={{ border: "0.5px solid rgba(255,255,255,0.35)" }}>
              ติดต่อฟรี
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 grid grid-cols-3 divide-x divide-[#f1f5f9]">
          {[
            { val: "180+", label: "โปรเจคที่ส่งมอบ" },
            { val: "150+", label: "ลูกค้าพึงพอใจ" },
            { val: "5+ ปี", label: "ประสบการณ์" },
          ].map((s) => (
            <div key={s.label} className="py-4 px-4 text-center">
              <p className="text-[20px] font-bold text-[#0f172a]">{s.val}</p>
              <p className="text-[11px] text-[#94a3b8]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div id="services" className="max-w-[860px] mx-auto px-6 py-12">
        <p className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-widest text-center mb-2">บริการของเรา</p>
        <h2 className="text-[22px] font-bold text-[#0f172a] text-center mb-8">ทุกอย่างที่คุณต้องการ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-xl p-4 text-center hover:shadow-sm transition-shadow" style={{ border: "0.5px solid #e2e8f0" }}>
              <span className="text-3xl block mb-3">{s.emoji}</span>
              <p className="text-[13px] font-semibold text-[#0f172a] mb-1.5">{s.title}</p>
              <p className="text-[11px] text-[#64748b] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
      <div id="about" style={{ background: "#f8faff", borderTop: "0.5px solid #e2e8f0", borderBottom: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 py-12">
          <h2 className="text-[20px] font-bold text-[#0f172a] mb-6">ทำไมต้องเลือกเรา</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY.map((w) => (
              <div key={w} className="flex items-center gap-2.5">
                <CheckCircle size={16} className="text-[#1A56DB] shrink-0" />
                <span className="text-[13px] text-[#475569]">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="max-w-[860px] mx-auto px-6 py-12">
        <h2 className="text-[20px] font-bold text-[#0f172a] mb-6">ติดต่อเรา</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[
              { icon: <Phone size={15} />, text: "02-xxx-xxxx" },
              { icon: <Mail size={15} />, text: "hello@techcorp.co.th" },
              { icon: <MapPin size={15} />, text: "กรุงเทพมหานคร, ประเทศไทย" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-2.5 text-[13px] text-[#475569]">
                <span className="text-[#1A56DB]">{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
            <p className="text-[13px] font-medium text-[#0f172a] mb-3">ส่งข้อความหาเรา</p>
            <input className="w-full text-[12px] px-3 py-2 rounded-lg mb-2 outline-none" style={{ border: "0.5px solid #e2e8f0" }} placeholder="ชื่อของคุณ" />
            <input className="w-full text-[12px] px-3 py-2 rounded-lg mb-2 outline-none" style={{ border: "0.5px solid #e2e8f0" }} placeholder="อีเมล" />
            <textarea className="w-full text-[12px] px-3 py-2 rounded-lg mb-3 outline-none resize-none" rows={3} style={{ border: "0.5px solid #e2e8f0" }} placeholder="ข้อความ..." />
            <button className="w-full bg-[#1A56DB] text-white text-[13px] py-2 rounded-lg hover:bg-[#1446c0] transition-colors">
              ส่งข้อความ
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#f8faff", borderTop: "0.5px solid #e2e8f0" }}>
        <div className="max-w-[860px] mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-[12px] text-[#94a3b8]">© 2026 TechCorp. All rights reserved.</span>
          <span className="text-[12px] text-[#94a3b8]">Built with Next.js</span>
        </div>
      </div>
    </div>
  );
}
