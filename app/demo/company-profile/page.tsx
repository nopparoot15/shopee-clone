"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Star, GitBranch, MessageCircle, Code2, Server, Globe, ExternalLink } from "lucide-react";

/* ─── palette ─── */
const DARK    = "#080808";
const BODY    = "#f9f7f3";
const AMBER   = "#d97706";
const AMBER2  = "#f59e0b";
const CHAR    = "#111111";
const MUTED   = "#6b7280";
const GRAY_BG = "#f0ede7";
const CARD    = "#ffffff";

const NAV_LINKS = [
  { label: "บริการ",  id: "services"  },
  { label: "ผลงาน",  id: "portfolio" },
  { label: "ราคา",   id: "pricing"   },
  { label: "ติดต่อ", id: "contact"   },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const SERVICES = [
  { num: "01", icon: "🖥", title: "Landing Page",    desc: "หน้าแรกที่ดึงดูด ขาย Concept ได้ในทันที Responsive ทุกอุปกรณ์ ส่งงานภายใน 7 วัน" },
  { num: "02", icon: "⚙️", title: "Web Application", desc: "ระบบที่ใช้งานได้จริง Dashboard, Auth, Real-time โครงสร้างยืดหยุ่นขยายง่าย" },
  { num: "03", icon: "🛒", title: "E-Commerce",       desc: "ร้านค้าออนไลน์ครบวงจร ตะกร้า ชำระเงิน จัดการสต็อก รายงานยอดขาย" },
  { num: "04", icon: "🔌", title: "API & Backend",    desc: "REST API, Database design, Third-party integration รองรับ scale ตั้งแต่วันแรก" },
];

const PORTFOLIO = [
  { title: "QR Order System",  cat: "Restaurant Tech",      year: "2566", gradient: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)", emoji: "🍜" },
  { title: "VOLT Top-Up",      cat: "Gaming Platform",      year: "2566", gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #3b82f6 100%)", emoji: "⚡" },
  { title: "Nexus Admin",      cat: "Enterprise Dashboard", year: "2567", gradient: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 55%, #818cf8 100%)", emoji: "📊" },
  { title: "Thai Duct Co.",    cat: "Industrial Website",   year: "2568", gradient: "linear-gradient(135deg, #1c1917 0%, #292524 55%, #44403c 100%)", emoji: "🏭" },
];

const TESTIMONIALS = [
  { name: "คุณวิภา S.",  role: "CEO, QR Order",    quote: "ทีมทำงานเร็ว ส่งงานตรงเวลา UI/UX สวยกว่าที่คิดไว้มาก ลูกค้าใช้งานง่ายจริงๆ", avatar: "ว" },
  { name: "คุณธนา P.",  role: "CTO, Nexus Corp",  quote: "Code quality ดีมาก โครงสร้างชัดเจน ทีม IT ต่อยอดได้ทันที ประทับใจ",         avatar: "ธ" },
  { name: "คุณมานพ K.", role: "MD, Thai Duct Co.", quote: "เว็บบริษัทดูโปรขึ้นมาก ลูกค้าต่างประเทศ Comment ทุกครั้ง แนะนำเลย",         avatar: "ม" },
];

const PLANS = [
  {
    name: "Basic",  price: "฿12,000", period: "/ โปรเจค",
    badge: null as string | null,
    features: ["Landing Page 1 หน้า", "Responsive Design", "SEO พื้นฐาน", "ส่งงานใน 7 วัน", "แก้ไข 2 รอบ"],
    highlight: false,
  },
  {
    name: "Pro",    price: "฿29,000", period: "/ โปรเจค",
    badge: "แนะนำ" as string | null,
    features: ["Multi-page Website", "CMS จัดการเนื้อหา", "Analytics Dashboard", "ส่งงานใน 14 วัน", "แก้ไข 5 รอบ"],
    highlight: true,
  },
  {
    name: "Custom", price: "ตกลงกัน", period: "",
    badge: null as string | null,
    features: ["Full Stack Application", "Custom API", "Database Design", "Timeline ตามตกลง", "Support ต่อเนื่อง"],
    highlight: false,
  },
];

interface FormErrors { name?: string; email?: string; message?: string; }
function validateEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

export default function CompanyProfilePage() {
  const [scrolled,    setScrolled]    = useState(false);
  const [formName,    setFormName]    = useState("");
  const [formEmail,   setFormEmail]   = useState("");
  const [formType,    setFormType]    = useState("");
  const [formMsg,     setFormMsg]     = useState("");
  const [errors,      setErrors]      = useState<FormErrors>({});
  const [formDone,    setFormDone]    = useState(false);
  const [hoveredPort, setHoveredPort] = useState<number | null>(null);

  const projectCount = useCounter(50);
  const deliveryRate = useCounter(100);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
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
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-text-1 { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-text-2 { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-text-3 { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float-shape {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* back */}
      <Link href="/" className="fixed top-4 left-4 z-50 flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl" style={{ background: "rgba(0,0,0,0.6)", color: "#d1d5db", backdropFilter: "blur(6px)" }}>
        <ArrowLeft size={13} /> กลับ
      </Link>

      {/* sticky nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid #e8e3da` : "none",
        }}
      >
        <div className="max-w-[960px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <span className="text-[17px] font-black" style={{ color: scrolled ? CHAR : "#fff" }}>Krit</span>
            <span className="text-[17px] font-black" style={{ color: AMBER }}>.Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-[13px] font-medium transition-colors cursor-pointer" style={{ color: scrolled ? MUTED : "rgba(255,255,255,0.75)" }}>
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("contact")} className="text-[13px] font-bold px-5 py-2 rounded-xl cursor-pointer transition-all" style={{ background: AMBER, color: "#fff" }}>
            จ้างงาน
          </button>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 relative overflow-hidden" style={{ background: DARK }}>
        {/* floating shapes */}
        <div className="absolute pointer-events-none rounded-full" style={{ width: 500, height: 500, top: "5%", right: "-8%", background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)", filter: "blur(40px)", animation: "float-shape 8s ease-in-out infinite" }} />
        <div className="absolute pointer-events-none rounded-full" style={{ width: 350, height: 350, bottom: "10%", left: "3%", background: "radial-gradient(circle, rgba(217,119,6,0.05) 0%, transparent 70%)", filter: "blur(30px)", animation: "float-shape 10s ease-in-out infinite reverse" }} />
        {/* grain */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

        <div className="max-w-[960px] mx-auto w-full relative z-10">
          <div className="flex items-center gap-2 mb-8" style={{ animation: "fade-up 0.6s ease both" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: AMBER, animation: "dot-pulse 2s ease-in-out infinite" }} />
            <span className="text-[11px] font-semibold tracking-[0.2em]" style={{ color: AMBER }}>WEB DEVELOPMENT STUDIO · กรุงเทพฯ</span>
          </div>

          <h1 className="font-black leading-[1.35] mb-8" style={{ fontSize: "clamp(2rem, 6vw, 3.8rem)", color: "#fff" }}>
            <span className="block" style={{ animation: "hero-text-1 0.7s 0.1s ease both", opacity: 0 }}>สร้างเว็บ</span>
            <span className="block" style={{ animation: "hero-text-2 0.7s 0.2s ease both", opacity: 0 }}>ที่คน</span>
            <span className="block" style={{ color: AMBER, animation: "hero-text-3 0.7s 0.3s ease both", opacity: 0 }}>จำได้</span>
          </h1>

          <p className="text-[16px] leading-relaxed mb-10 max-w-[480px]" style={{ color: "#9ca3af", animation: "fade-up 0.7s 0.4s ease both", opacity: 0 }}>
            พัฒนาเว็บไซต์และระบบสำหรับธุรกิจไทย<br />
            ตั้งแต่ Start-up จนถึงองค์กร ส่งงานตรงเวลาทุกครั้ง
          </p>

          <div className="flex flex-wrap gap-3 mb-16" style={{ animation: "fade-up 0.7s 0.5s ease both", opacity: 0 }}>
            <button onClick={() => scrollTo("portfolio")} className="flex items-center gap-2 text-[14px] font-bold px-7 py-3.5 rounded-2xl cursor-pointer transition-all" style={{ background: AMBER, color: "#fff" }}>
              ดูผลงาน <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("contact")} className="text-[14px] font-medium px-7 py-3.5 rounded-2xl cursor-pointer" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)" }}>
              ปรึกษาฟรี
            </button>
          </div>

          {/* animated stats */}
          <div className="flex flex-wrap gap-10" style={{ animation: "fade-up 0.7s 0.6s ease both", opacity: 0 }}>
            {[
              { val: `${projectCount}+`, label: "โปรเจค" },
              { val: "3 ปี",             label: "ประสบการณ์" },
              { val: `${deliveryRate}%`, label: "ส่งงานทุกกำหนด" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[1.7rem] font-black leading-tight" style={{ color: "#fff" }}>{s.val}</p>
                <p className="text-[12px]" style={{ color: "#4b5563" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STRIP ═══════════════════════════════════════════ */}
      <section className="py-10 px-6 overflow-hidden" style={{ background: "#fff", borderBottom: `1px solid #e8e3da` }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-5 text-center" style={{ color: "#94a3b8" }}>TECH STACK</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "React",      color: "#61dafb", bg: "#e0f7ff" },
              { label: "Next.js",    color: "#111",    bg: "#f1f1f1" },
              { label: "TypeScript", color: "#3178c6", bg: "#dbeafe" },
              { label: "Node.js",    color: "#3c873a", bg: "#dcfce7" },
              { label: "MySQL",      color: "#4479a1", bg: "#dbeafe" },
              { label: "Docker",     color: "#2496ed", bg: "#dbeafe" },
            ].map((t) => (
              <span key={t.label} className="text-[12px] font-semibold px-4 py-2 rounded-xl" style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}20` }}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6" style={{ background: BODY }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>SERVICES</p>
          <h2 className="text-[1.6rem] font-black mb-14" style={{ color: CHAR }}>บริการ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl p-7 cursor-default transition-all"
                style={{ background: CARD, border: `1px solid #e8e3da`, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeft = `4px solid ${AMBER}`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(217,119,6,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeft = `1px solid #e8e3da`;
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[11px] font-black tracking-widest" style={{ color: "#e8e3da" }}>{s.num}</span>
                </div>
                <p className="text-[17px] font-black mb-2" style={{ color: CHAR }}>{s.title}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                <button onClick={() => scrollTo("contact")} className="mt-4 flex items-center gap-1 text-[12px] font-semibold cursor-pointer" style={{ color: AMBER }}>
                  สอบถามราคา <ChevronRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════════ */}
      <section id="portfolio" className="py-24 px-6" style={{ background: GRAY_BG }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>WORK</p>
          <h2 className="text-[1.6rem] font-black mb-14" style={{ color: CHAR }}>ผลงานล่าสุด</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO.map((p, idx) => (
              <div
                key={p.title}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                style={{
                  border: `1px solid #e8e3da`,
                  transform: hoveredPort === idx ? "translateY(-8px)" : "none",
                  boxShadow: hoveredPort === idx ? "0 20px 48px rgba(0,0,0,0.14)" : "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={() => setHoveredPort(idx)}
                onMouseLeave={() => setHoveredPort(null)}
              >
                <div className="w-full relative flex items-center justify-center" style={{ aspectRatio: "4/3", background: p.gradient }}>
                  <span className="text-5xl">{p.emoji}</span>
                  {hoveredPort === idx && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
                      <span className="text-white font-bold text-sm flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}>
                        ดูโปรเจค <ExternalLink size={13} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4" style={{ background: CARD }}>
                  <p className="text-[14px] font-bold mb-2" style={{ color: CHAR }}>{p.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#fef3c7", color: "#92400e" }}>{p.cat}</span>
                    <span className="text-[11px]" style={{ color: MUTED }}>{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: BODY }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>REVIEWS</p>
          <h2 className="text-[1.6rem] font-black mb-14" style={{ color: CHAR }}>ลูกค้าพูดถึงเรา</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid #e8e3da`, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill={AMBER} color={AMBER} />)}
                </div>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: MUTED }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm" style={{ background: "#fef3c7", color: AMBER }}>{t.avatar}</div>
                  <div>
                    <p className="text-[13px] font-bold" style={{ color: CHAR }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color: "#94a3b8" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6" style={{ background: GRAY_BG }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>PRICING</p>
          <h2 className="text-[1.6rem] font-black mb-3" style={{ color: CHAR }}>ราคา</h2>
          <p className="text-[14px] mb-14" style={{ color: MUTED }}>ราคาเริ่มต้น ปรับได้ตามขอบเขตงาน</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-7 flex flex-col relative transition-all"
                style={{
                  background: plan.highlight ? DARK : CARD,
                  border: plan.highlight ? `2px solid ${AMBER}` : `1px solid #e8e3da`,
                  boxShadow: plan.highlight ? "0 24px 48px rgba(217,119,6,0.2)" : "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black px-4 py-1.5 rounded-full" style={{ background: AMBER, color: "#fff" }}>
                    {plan.badge}
                  </span>
                )}
                <p className="text-[12px] font-semibold mb-2" style={{ color: plan.highlight ? "#9ca3af" : MUTED }}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <p className="text-[30px] font-black" style={{ color: plan.highlight ? "#fff" : CHAR }}>{plan.price}</p>
                  {plan.period && <span className="text-[12px]" style={{ color: plan.highlight ? "#6b7280" : "#9ca3af" }}>{plan.period}</span>}
                </div>
                <div className="flex-1 space-y-3 my-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0" style={{ background: plan.highlight ? `${AMBER}20` : "#fef3c7" }}>
                        <ChevronRight size={11} color={AMBER} />
                      </span>
                      <span className="text-[13px]" style={{ color: plan.highlight ? "#9ca3af" : MUTED }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3.5 rounded-xl text-[13px] font-bold cursor-pointer transition-all"
                  style={
                    plan.highlight
                      ? { background: AMBER, color: "#fff" }
                      : { background: GRAY_BG, color: CHAR, border: `1px solid #e8e3da` }
                  }
                >
                  เริ่มต้น →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6" style={{ background: BODY }}>
        <div className="max-w-[960px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: AMBER }}>CONTACT</p>
          <h2 className="text-[1.6rem] font-black mb-14" style={{ color: CHAR }}>เริ่มต้นโปรเจค</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">
            {formDone ? (
              <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center" style={{ background: CARD, border: `1px solid #e8e3da` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#fef3c7" }}>
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-[19px] font-black mb-2" style={{ color: CHAR }}>ส่งข้อมูลแล้ว!</p>
                <p className="text-[13px]" style={{ color: MUTED }}>จะติดต่อกลับภายใน 24 ชั่วโมง</p>
                <button onClick={() => setFormDone(false)} className="mt-6 text-[12px] cursor-pointer" style={{ color: AMBER }}>ส่งข้อมูลอีกครั้ง</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-7 space-y-4" style={{ background: CARD, border: `1px solid #e8e3da`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                {[
                  { label: "ชื่อ", key: "name", value: formName, setter: setFormName, error: errors.name, type: "text", ph: "ชื่อ-นามสกุล", req: true },
                  { label: "อีเมล", key: "email", value: formEmail, setter: setFormEmail, error: errors.email, type: "email", ph: "your@email.com", req: true },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: CHAR }}>
                      {f.label} {f.req && <span style={{ color: "#ef4444" }}>*</span>}
                    </label>
                    <input
                      type={f.type} value={f.value} onChange={(e) => f.setter(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-[13px] outline-none transition-all"
                      style={{ border: f.error ? "2px solid #ef4444" : "1.5px solid #e8e3da", background: BODY, color: CHAR }}
                      placeholder={f.ph}
                    />
                    {f.error && <p className="text-[11px] mt-1" style={{ color: "#ef4444" }}>{f.error}</p>}
                  </div>
                ))}

                <div>
                  <label className="block text-[12px] font-semibold mb-1.5" style={{ color: CHAR }}>ประเภทโปรเจค</label>
                  <select
                    value={formType} onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-[13px] outline-none cursor-pointer"
                    style={{ border: "1.5px solid #e8e3da", background: BODY, color: CHAR }}
                  >
                    <option value="">เลือกประเภท...</option>
                    <option value="landing">Landing Page</option>
                    <option value="webapp">Web Application</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold mb-1.5" style={{ color: CHAR }}>รายละเอียด <span style={{ color: "#ef4444" }}>*</span></label>
                  <textarea
                    value={formMsg} onChange={(e) => setFormMsg(e.target.value)} rows={4}
                    className="w-full px-4 py-3 rounded-xl text-[13px] outline-none resize-none transition-all"
                    style={{ border: errors.message ? "2px solid #ef4444" : "1.5px solid #e8e3da", background: BODY, color: CHAR }}
                    placeholder="บอกเล่าโปรเจคของคุณ..."
                  />
                  {errors.message && <p className="text-[11px] mt-1" style={{ color: "#ef4444" }}>{errors.message}</p>}
                </div>

                <button type="submit" className="w-full py-4 rounded-xl text-[14px] font-black cursor-pointer transition-all" style={{ background: AMBER, color: "#fff" }}>
                  ส่งข้อมูล →
                </button>
              </form>
            )}

            <div className="space-y-4 pt-2">
              {[
                { label: "อีเมล",  value: "hello@krit.studio",    sub: "ตอบกลับใน 2–4 ชม." },
                { label: "Line",   value: "@kritstudio",           sub: "ทักได้เลย 24 ชม." },
                { label: "โทร",   value: "08x-xxx-xxxx",          sub: "วันทำการ 9:00–18:00" },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid #e8e3da` }}>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "#94a3b8" }}>{c.label}</p>
                  <p className="text-[14px] font-bold" style={{ color: CHAR }}>{c.value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>{c.sub}</p>
                </div>
              ))}

              <div className="rounded-2xl p-5" style={{ background: DARK }}>
                <p className="text-[13px] font-bold text-white mb-1">ปรึกษาฟรี</p>
                <p className="text-[12px]" style={{ color: "#6b7280" }}>ไม่มีค่าใช้จ่าย ไม่มีข้อผูกมัด แค่อยากฟังโจทย์ของคุณก่อน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="py-10 px-6" style={{ background: DARK }}>
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-0.5">
              <span className="text-[16px] font-black text-white">Krit</span>
              <span className="text-[16px] font-black" style={{ color: AMBER }}>.Studio</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ background: "#1f2937", border: "1px solid #374151" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#374151"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1f2937"; }}
              >
                <GitBranch size={14} color="#9ca3af" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ background: "#063818", border: "1px solid #14532d" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#14532d"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#063818"; }}
              >
                <MessageCircle size={14} color="#4ade80" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6" style={{ borderTop: "1px solid #1f2937" }}>
            <p className="text-[12px]" style={{ color: "#374151" }}>© 2026 Krit.Studio · All rights reserved</p>
            <div className="flex gap-4">
              {NAV_LINKS.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-[11px] cursor-pointer" style={{ color: "#374151" }}>{l.label}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
