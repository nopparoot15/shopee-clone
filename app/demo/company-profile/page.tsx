"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

/* ─── palette ────────────────────────────── */
const DARK   = "#0a0a0a";
const BODY   = "#f9f7f4";
const AMBER  = "#d97706";
const CHAR   = "#1a1a1a";
const MUTED  = "#6b7280";
const GRAY_BG = "#f0ede8";

/* ─── nav links ──────────────────────────── */
const NAV_LINKS = [
  { label: "บริการ",    id: "services"  },
  { label: "ผลงาน",    id: "portfolio" },
  { label: "ราคา",     id: "pricing"   },
  { label: "ติดต่อ",   id: "contact"   },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── services ───────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Landing Page",
    desc: "หน้าแรกที่ดึงดูด ขาย Concept ได้ในทันที Responsive ทุกอุปกรณ์ ส่งงานภายใน 7 วัน",
  },
  {
    num: "02",
    title: "Web Application",
    desc: "ระบบที่ใช้งานได้จริง Dashboard, Auth, Real-time โครงสร้างยืดหยุ่นขยายง่าย",
  },
  {
    num: "03",
    title: "E-Commerce",
    desc: "ร้านค้าออนไลน์ครบวงจร ตะกร้า ชำระเงิน จัดการสต็อก รายงานยอดขาย",
  },
  {
    num: "04",
    title: "API & Backend",
    desc: "REST API, Database design, Third-party integration รองรับ scale ตั้งแต่วันแรก",
  },
];

/* ─── portfolio ──────────────────────────── */
const PORTFOLIO = [
  {
    title: "QR Order System",
    cat: "Restaurant Tech",
    year: "2566",
    gradient: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
  },
  {
    title: "VOLT Top-Up",
    cat: "Gaming Platform",
    year: "2566",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #3b82f6 100%)",
  },
  {
    title: "Nexus Admin",
    cat: "Enterprise Dashboard",
    year: "2567",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 55%, #818cf8 100%)",
  },
];

/* ─── pricing ────────────────────────────── */
const PLANS = [
  {
    name: "Basic",
    price: "฿12,000",
    badge: null,
    features: ["Landing Page 1 หน้า", "Responsive Design", "SEO พื้นฐาน", "ส่งงานใน 7 วัน"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "฿29,000",
    badge: "แนะนำ",
    features: ["Multi-page Website", "CMS จัดการเนื้อหา", "Analytics Dashboard", "ส่งงานใน 14 วัน"],
    highlight: true,
  },
  {
    name: "Custom",
    price: "฿ตามตกลง",
    badge: null,
    features: ["Full Stack Application", "Custom API", "Database Design", "Timeline ตามตกลง"],
    highlight: false,
  },
];

/* ─── form validation ────────────────────── */
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export default function CompanyProfileDemo() {
  const [scrolled, setScrolled]     = useState(false);
  const [formName, setFormName]     = useState("");
  const [formEmail, setFormEmail]   = useState("");
  const [formType, setFormType]     = useState("");
  const [formMsg, setFormMsg]       = useState("");
  const [errors, setErrors]         = useState<FormErrors>({});
  const [formDone, setFormDone]     = useState(false);

  /* sticky nav background after 40px scroll */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: FormErrors = {};
    if (!formName.trim()) errs.name = "กรุณากรอกชื่อ";
    if (!validateEmail(formEmail)) errs.email = "กรุณากรอกอีเมลที่ถูกต้อง";
    if (!formMsg.trim()) errs.message = "กรุณากรอกข้อความ";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setFormDone(true);
  };

  return (
    <div style={{ background: BODY, color: CHAR, fontFamily: "sans-serif" }}>

      {/* ── back button (fixed top-left) ── */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl"
        style={{ background: "rgba(0,0,0,0.55)", color: "#d1d5db", backdropFilter: "blur(6px)" }}
      >
        <ArrowLeft size={13} /> กลับ
      </Link>

      {/* ── sticky nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all"
        style={{
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `1px solid #e8e3da` : "none",
        }}
      >
        <div className="max-w-[960px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <span className="text-[17px] font-black" style={{ color: scrolled ? CHAR : "#fff" }}>
              Krit
            </span>
            <span className="text-[17px] font-black" style={{ color: AMBER }}>.Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-[13px] font-medium transition-colors cursor-pointer"
                style={{ color: scrolled ? MUTED : "rgba(255,255,255,0.75)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="text-[13px] font-bold px-4 py-2 rounded-xl cursor-pointer"
            style={{ background: AMBER, color: "#fff" }}
          >
            จ้างงาน
          </button>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section
        className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16"
        style={{ background: DARK }}
      >
        <div className="max-w-[960px] mx-auto w-full">
          <p
            className="text-[11px] font-semibold tracking-[0.2em] mb-8 flex items-center gap-2"
            style={{ color: AMBER }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            WEB DEVELOPMENT STUDIO
          </p>

          <h1
            className="font-black leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", color: "#fff" }}
          >
            <span className="block">สร้างเว็บ</span>
            <span className="block">ที่คน</span>
            <span className="block" style={{ color: AMBER }}>จำได้</span>
          </h1>

          <p className="text-[15px] leading-relaxed mb-10 max-w-[480px]" style={{ color: "#9ca3af" }}>
            พัฒนาเว็บไซต์และระบบสำหรับธุรกิจไทย<br />
            ตั้งแต่ Start-up จนถึงองค์กร ส่งงานตรงเวลาทุกครั้ง
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <button
              onClick={() => scrollTo("portfolio")}
              className="flex items-center gap-2 text-[14px] font-bold px-6 py-3.5 rounded-2xl cursor-pointer"
              style={{ background: AMBER, color: "#fff" }}
            >
              ดูผลงาน <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-[14px] font-medium px-6 py-3.5 rounded-2xl cursor-pointer"
              style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)" }}
            >
              ปรึกษาฟรี
            </button>
          </div>

          {/* stats row */}
          <div className="flex flex-wrap gap-8">
            {[
              ["50+", "โปรเจค"],
              ["3 ปี", "ประสบการณ์"],
              ["100%", "ส่งงานทุกกำหนด"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-[26px] font-black leading-tight" style={{ color: "#fff" }}>{val}</p>
                <p className="text-[12px]" style={{ color: "#6b7280" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════ */}
      <section id="services" className="py-20 px-6" style={{ background: BODY }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>
            SERVICES
          </p>
          <h2 className="text-[2rem] font-black mb-12" style={{ color: CHAR }}>บริการ</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl p-6 group cursor-default transition-all"
                style={{
                  background: "#fff",
                  border: `1px solid #e8e3da`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeft = `3px solid ${AMBER}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeft = `1px solid #e8e3da`;
                }}
              >
                <p className="text-[11px] font-black tracking-widest mb-3" style={{ color: AMBER }}>
                  {s.num}
                </p>
                <p className="text-[16px] font-bold mb-2" style={{ color: CHAR }}>{s.title}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════ */}
      <section id="portfolio" className="py-20 px-6" style={{ background: BODY }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>
            WORK
          </p>
          <h2 className="text-[2rem] font-black mb-12" style={{ color: CHAR }}>ผลงาน</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PORTFOLIO.map((p) => (
              <div key={p.title} className="rounded-2xl overflow-hidden" style={{ border: `1px solid #e8e3da` }}>
                {/* colored gradient instead of image */}
                <div
                  className="w-full"
                  style={{ aspectRatio: "4/3", background: p.gradient }}
                />
                <div className="p-4" style={{ background: "#fff" }}>
                  <p className="text-[14px] font-bold mb-1" style={{ color: CHAR }}>{p.title}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "#fef3c7", color: "#92400e" }}
                    >
                      {p.cat}
                    </span>
                    <span className="text-[11px]" style={{ color: MUTED }}>{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════ */}
      <section id="pricing" className="py-20 px-6" style={{ background: GRAY_BG }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>
            PRICING
          </p>
          <h2 className="text-[2rem] font-black mb-12" style={{ color: CHAR }}>ราคา</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: "#fff",
                  border: plan.highlight ? `2px solid ${AMBER}` : `1px solid #e8e3da`,
                  position: "relative",
                }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: AMBER, color: "#fff" }}
                  >
                    {plan.badge}
                  </span>
                )}

                <p className="text-[13px] font-semibold mb-2" style={{ color: MUTED }}>{plan.name}</p>
                <p className="text-[28px] font-black mb-5" style={{ color: CHAR }}>{plan.price}</p>

                <div className="flex-1 space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0" style={{ background: "#fef3c7" }}>
                        <ChevronRight size={10} color={AMBER} />
                      </span>
                      <span className="text-[13px]" style={{ color: MUTED }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all"
                  style={
                    plan.highlight
                      ? { background: AMBER, color: "#fff" }
                      : { background: "#f9f7f4", color: CHAR, border: `1px solid #e8e3da` }
                  }
                >
                  เริ่มต้น
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════ */}
      <section id="contact" className="py-20 px-6" style={{ background: BODY }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>
            CONTACT
          </p>
          <h2 className="text-[2rem] font-black mb-12" style={{ color: CHAR }}>เริ่มต้นโปรเจค</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">

            {/* form */}
            {formDone ? (
              <div
                className="rounded-2xl p-8 flex flex-col items-center justify-center text-center"
                style={{ background: "#fff", border: `1px solid #e8e3da` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "#fef3c7" }}
                >
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-[17px] font-bold mb-2" style={{ color: CHAR }}>ส่งข้อมูลแล้ว!</p>
                <p className="text-[13px]" style={{ color: MUTED }}>
                  จะติดต่อกลับภายใน 24 ชั่วโมง
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 space-y-4"
                style={{ background: "#fff", border: `1px solid #e8e3da` }}
              >
                {/* name */}
                <div>
                  <label className="block text-[12px] font-medium mb-1.5" style={{ color: CHAR }}>
                    ชื่อ <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none transition-all"
                    style={{
                      border: errors.name ? "1px solid #ef4444" : "1px solid #e8e3da",
                      background: BODY,
                      color: CHAR,
                    }}
                    placeholder="ชื่อ-นามสกุล"
                  />
                  {errors.name && <p className="text-[11px] mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>}
                </div>

                {/* email */}
                <div>
                  <label className="block text-[12px] font-medium mb-1.5" style={{ color: CHAR }}>
                    อีเมล <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none transition-all"
                    style={{
                      border: errors.email ? "1px solid #ef4444" : "1px solid #e8e3da",
                      background: BODY,
                      color: CHAR,
                    }}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-[11px] mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>}
                </div>

                {/* project type */}
                <div>
                  <label className="block text-[12px] font-medium mb-1.5" style={{ color: CHAR }}>
                    ประเภทโปรเจค
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none cursor-pointer"
                    style={{ border: "1px solid #e8e3da", background: BODY, color: CHAR }}
                  >
                    <option value="">เลือกประเภท...</option>
                    <option value="landing">Landing Page</option>
                    <option value="webapp">Web Application</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                {/* message */}
                <div>
                  <label className="block text-[12px] font-medium mb-1.5" style={{ color: CHAR }}>
                    รายละเอียด <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none resize-none transition-all"
                    style={{
                      border: errors.message ? "1px solid #ef4444" : "1px solid #e8e3da",
                      background: BODY,
                      color: CHAR,
                    }}
                    placeholder="บอกเล่าโปรเจคของคุณ..."
                  />
                  {errors.message && <p className="text-[11px] mt-1" style={{ color: "#ef4444" }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-[14px] font-bold cursor-pointer"
                  style={{ background: AMBER, color: "#fff" }}
                >
                  ส่งข้อมูล
                </button>
              </form>
            )}

            {/* contact info */}
            <div className="space-y-6 pt-2">
              <div>
                <p className="text-[12px] font-semibold tracking-wide uppercase mb-2" style={{ color: "#94a3b8" }}>
                  อีเมล
                </p>
                <p className="text-[14px] font-medium" style={{ color: CHAR }}>
                  hello@krit.studio
                </p>
              </div>
              <div>
                <p className="text-[12px] font-semibold tracking-wide uppercase mb-2" style={{ color: "#94a3b8" }}>
                  Line
                </p>
                <p className="text-[14px] font-medium" style={{ color: CHAR }}>
                  @kritstudio
                </p>
              </div>
              <div
                className="rounded-2xl p-5"
                style={{ background: DARK, color: "#fff" }}
              >
                <p className="text-[13px] font-semibold mb-1.5">ตอบกลับเร็ว</p>
                <p className="text-[12px]" style={{ color: "#9ca3af" }}>
                  ปกติตอบภายใน 2–4 ชั่วโมง ในวันทำการ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer className="py-8 px-6" style={{ background: DARK }}>
        <div className="max-w-[960px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-0.5">
            <span className="text-[15px] font-black text-white">Krit</span>
            <span className="text-[15px] font-black" style={{ color: AMBER }}>.Studio</span>
          </div>
          <p className="text-[12px]" style={{ color: "#4b5563" }}>
            © 2567 Krit.Studio · สงวนลิขสิทธิ์
          </p>
        </div>
      </footer>
    </div>
  );
}
