"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode, Zap, Database, Globe, Wind,
  Code2, Server, ArrowUpRight,
  MessageCircle, Mail, ChevronDown,
} from "lucide-react";

/* ─── palette ─── */
const BG     = "#060b14";
const CARD   = "#0d1321";
const ACCENT = "#2563eb";
const CYAN   = "#06b6d4";
const BORDER = "#1a2744";
const TEXT   = "#e2e8f0";
const MUTED  = "#475569";

/* ─── data ─── */
const PROJECTS = [
  {
    id: "qr-order",
    name: "QR Order System",
    tag: "ร้านอาหาร",
    desc: "สั่งอาหารผ่าน QR Code เพิ่ม/ลดออเดอร์แบบ Realtime มีตะกร้า โน้ต และจำกัดเวลาต่อโต๊ะ",
    techs: ["Next.js", "Node.js", "MySQL"],
    gradient: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #f59e0b 100%)",
    icon: "🍜",
    href: "/demo/qr-order",
    external: false,
    accent: "#f59e0b",
  },
  {
    id: "topup",
    name: "VOLT — Game Top-Up",
    tag: "Gaming Platform",
    desc: "แพลตฟอร์มเติมเงินเกมออนไลน์ PromptPay / Card / TrueMoney รองรับ 50+ เกม เสร็จใน 30 วินาที",
    techs: ["React", "Express", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #3b82f6 100%)",
    icon: "⚡",
    href: "/demo/topup",
    external: false,
    accent: "#3b82f6",
  },
  {
    id: "data-management",
    name: "Nexus Admin",
    tag: "Enterprise Dashboard",
    desc: "ระบบจัดการข้อมูลองค์กร Dashboard สรุปข้อมูล จัดการผู้ใช้ รายงาน Export ตามสิทธิ์ Role",
    techs: ["Next.js", "MySQL", "Docker"],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 55%, #818cf8 100%)",
    icon: "📊",
    href: "/demo/data-management",
    external: false,
    accent: "#818cf8",
  },
  {
    id: "company-profile",
    name: "Krit.Studio",
    tag: "Agency Website",
    desc: "เว็บ Studio นักพัฒนา Scrollable ครบ บริการ ผลงาน ราคา ฟอร์มติดต่อ พร้อม SEO",
    techs: ["Next.js", "Tailwind", "Vercel"],
    gradient: "linear-gradient(135deg, #1c1917 0%, #292524 55%, #78716c 100%)",
    icon: "🎨",
    href: "/demo/company-profile",
    external: false,
    accent: "#d97706",
  },
  {
    id: "pipe-company",
    name: "Thai Duct & HVAC Co.",
    tag: "Static Website",
    desc: "เว็บบริษัทผลิตและติดตั้งท่อดักท์ HVAC ดีไซน์อุตสาหกรรม SEO ภาษาไทย ฟอร์มขอใบเสนอราคา",
    techs: ["HTML", "CSS", "JavaScript"],
    gradient: "linear-gradient(135deg, #1c2e1c 0%, #2d4a2d 50%, #4a7c4a 100%)",
    icon: "🏭",
    href: "https://pipe-company-demo.vercel.app/",
    external: true,
    accent: "#4ade80",
  },
];

const SKILLS = [
  { label: "React / Next.js", color: "#61dafb", bg: "rgba(97,218,251,0.1)" },
  { label: "TypeScript",      color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { label: "Node.js",         color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  { label: "MySQL",           color: "#06b6d4", bg: "rgba(6,182,212,0.1)"  },
  { label: "PostgreSQL",      color: "#818cf8", bg: "rgba(129,140,248,0.1)"},
  { label: "Docker",          color: "#38bdf8", bg: "rgba(56,189,248,0.1)" },
  { label: "Linux / Server",  color: "#a3e635", bg: "rgba(163,230,53,0.1)" },
  { label: "Cloudflare",      color: "#f97316", bg: "rgba(249,115,22,0.1)" },
  { label: "REST API",        color: "#e879f9", bg: "rgba(232,121,249,0.1)"},
  { label: "Git / CI",        color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
];

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return val;
}

export default function PortfolioPage() {
  const [scrolled, setScrolled]       = useState(false);
  const [hovered, setHovered]         = useState<string | null>(null);
  const projects  = useCounter(50);
  const delivered = useCounter(100);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "sans-serif" }}>
      <style>{`
        @keyframes hero-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.06); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      {/* ── STICKY NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(6,11,20,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-black tracking-tight" style={{ color: "#fff" }}>
            Ren<span style={{ color: ACCENT }}>Stack</span>
          </span>
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "ผลงาน",     id: "projects" },
              { label: "ทักษะ",      id: "skills" },
              { label: "ติดต่อ",    id: "contact" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-[13px] cursor-pointer transition-colors"
                style={{ color: MUTED }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-[12px] font-bold px-4 py-2 rounded-xl cursor-pointer"
            style={{ background: ACCENT, color: "#fff" }}
          >
            จ้างงาน
          </button>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-16 pb-20 relative overflow-hidden">
        {/* animated glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(37,99,235,0.16) 0%, rgba(6,182,212,0.07) 50%, transparent 80%)",
            animation: "hero-glow 6s ease-in-out infinite",
          }}
        />
        {/* grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-[900px] mx-auto w-full relative z-10">
          {/* availability badge */}
          <div className="inline-flex items-center gap-2 mb-8"
            style={{ animation: "fade-up 0.6s ease both" }}
          >
            <span
              className="flex items-center gap-2 text-[12px] font-semibold px-4 py-2 rounded-full"
              style={{
                background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, color: CYAN,
                animation: "badge-pulse 3s ease-in-out infinite",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                style={{ animation: "dot-blink 2s ease-in-out infinite" }}
              />
              พร้อมรับงาน Freelance · ตอบกลับภายใน 24 ชม.
            </span>
          </div>

          <h1
            className="font-black leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 6rem)", color: "#fff", animation: "fade-up 0.7s 0.1s ease both", opacity: 0 }}
          >
            <span className="block">สร้างเว็บ</span>
            <span className="block">ที่ธุรกิจ</span>
            <span className="block" style={{ color: CYAN }}>เติบโตจริง</span>
          </h1>

          <p className="text-[16px] leading-relaxed mb-8 max-w-[520px]"
            style={{ color: MUTED, animation: "fade-up 0.7s 0.2s ease both", opacity: 0 }}
          >
            Full Stack Developer รับพัฒนา Web Application ทุกประเภท<br />
            ออกแบบ → พัฒนา → Deploy พร้อมใช้งานจริง ครบในที่เดียว
          </p>

          <div className="flex flex-wrap gap-3 mb-14"
            style={{ animation: "fade-up 0.7s 0.3s ease both", opacity: 0 }}
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-[14px] font-bold px-7 py-3.5 rounded-2xl cursor-pointer transition-all"
              style={{ background: `linear-gradient(90deg, #1d4ed8, ${ACCENT})`, color: "#fff" }}
            >
              ดูผลงาน <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[14px] font-medium px-7 py-3.5 rounded-2xl cursor-pointer"
              style={{ border: `1.5px solid ${BORDER}`, color: "#94a3b8" }}
            >
              ติดต่อจ้างงาน
            </button>
          </div>

          {/* stats */}
          <div className="flex flex-wrap gap-12"
            style={{ animation: "fade-up 0.7s 0.4s ease both", opacity: 0 }}
          >
            {[
              { val: `${projects}+`, label: "โปรเจคที่ส่งมอบ" },
              { val: `${delivered}%`, label: "ส่งงานตรงเวลา" },
              { val: "3 ปี",          label: "ประสบการณ์" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-[2.2rem] font-black leading-tight" style={{ color: "#fff" }}>{val}</p>
                <p className="text-[12px]" style={{ color: MUTED }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          style={{ color: "#1e2d45", animation: "fade-up 1s 0.8s ease both", opacity: 0 }}
        >
          <span className="text-[11px]">เลื่อนดูผลงาน</span>
          <ChevronDown size={18} />
        </button>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════ */}
      <section id="projects" className="py-24 px-6" style={{ background: "#07090e" }}>
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>PORTFOLIO</p>
          <h2 className="text-[2.2rem] font-black mb-3 text-white">ผลงาน</h2>
          <p className="text-[14px] mb-14" style={{ color: MUTED }}>โปรเจคที่พร้อม Demo ใช้งานได้จริง — กดที่การ์ดเพื่อเปิด Demo</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p) => {
              const isHov = hovered === p.id;
              const inner = (
                <div
                  key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                  style={{
                    background: CARD,
                    border: `1px solid ${isHov ? p.accent + "60" : BORDER}`,
                    transform: isHov ? "translateY(-6px)" : "none",
                    boxShadow: isHov ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${p.accent}30` : "none",
                  }}
                >
                  {/* gradient preview */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: p.gradient }}>
                    <div className="absolute inset-0 flex items-center justify-center text-5xl select-none">
                      {p.icon}
                    </div>
                    {/* hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all"
                      style={{ background: isHov ? "rgba(0,0,0,0.45)" : "transparent" }}
                    >
                      {isHov && (
                        <span
                          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", backdropFilter: "blur(4px)" }}
                        >
                          ดู Demo <ArrowUpRight size={15} />
                        </span>
                      )}
                    </div>
                    {/* tag */}
                    <span
                      className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(4px)" }}
                    >
                      {p.tag}
                    </span>
                    {p.external && (
                      <span className="absolute top-3 right-3">
                        <ArrowUpRight size={14} color="rgba(255,255,255,0.7)" />
                      </span>
                    )}
                  </div>

                  {/* card body */}
                  <div className="p-4">
                    <p className="text-[15px] font-bold text-white mb-1.5">{p.name}</p>
                    <p className="text-[12px] leading-relaxed mb-3" style={{ color: MUTED }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techs.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-lg font-medium"
                          style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}25` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );

              if (p.external) return <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
              return <Link key={p.id} href={p.href}>{inner}</Link>;
            })}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ════════════════════════════════════════════════ */}
      <section id="skills" className="py-24 px-6" style={{ background: "#0a0f1a" }}>
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>STACK</p>
          <h2 className="text-[2.2rem] font-black mb-4 text-white">ทักษะและเทคโนโลยี</h2>
          <p className="text-[14px] mb-12" style={{ color: MUTED }}>
            ครอบคลุมตั้งแต่ Frontend → Backend → Infrastructure Deploy จริง
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            {SKILLS.map((s) => (
              <span
                key={s.label}
                className="text-[13px] font-semibold px-4 py-2 rounded-xl"
                style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}25` }}
              >
                {s.label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <Code2 size={20} color={CYAN} />,
                title: "Frontend",
                items: ["React 18 + Next.js 14", "TypeScript ชำนาญ", "Tailwind CSS + Custom CSS", "Responsive ทุกขนาดหน้าจอ"],
              },
              {
                icon: <Server size={20} color="#818cf8" />,
                title: "Backend & Database",
                items: ["Node.js / Express / REST API", "MySQL + PostgreSQL", "Docker + Docker Compose", "Authentication & RBAC"],
              },
              {
                icon: <Globe size={20} color="#4ade80" />,
                title: "Infrastructure",
                items: ["Linux Server Admin", "Cloudflare DNS + CDN", "Azure, VMware vSphere", "CI/CD Pipeline"],
              },
            ].map((col) => (
              <div
                key={col.title}
                className="rounded-2xl p-6"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {col.icon}
                  <p className="font-bold text-white text-[14px]">{col.title}</p>
                </div>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px]" style={{ color: MUTED }}>
                      <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-2xl p-6"
            style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}20` }}
          >
            <p className="text-[13px] leading-relaxed" style={{ color: "#93c5fd" }}>
              <span className="font-bold text-white">จุดต่างที่แท้จริง:</span>{" "}
              มีประสบการณ์ด้าน Infrastructure จริงจากโครงการระดับองค์กร ครอบคลุมทั้ง Azure Virtual Desktop, VMware vSphere และ Windows Server
              — สามารถส่งมอบ Production-ready ครบวงจรตั้งแต่พัฒนาจนถึง Deploy
            </p>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6" style={{ background: BG }}>
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: CYAN }}>CONTACT</p>
          <h2 className="text-[2.2rem] font-black mb-3 text-white">เริ่มต้นโปรเจคด้วยกัน</h2>
          <p className="text-[14px] mb-12" style={{ color: MUTED }}>ปรึกษาฟรี ไม่มีค่าใช้จ่าย ตอบกลับภายใน 24 ชั่วโมง</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[640px]">
            {/* LINE */}
            <a
              href="https://line.me/ti/p/xxbdszUQPO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all cursor-pointer"
              style={{ background: "#06C75514", border: "1px solid #06C75530" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#06C75520"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#06C75514"; }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "#06C755" }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: "#fff" }}>
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-[14px] mb-0.5">LINE Official</p>
                <p className="text-[12px]" style={{ color: "#06C755" }}>คุยเร็วที่สุด — ตอบทันที</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:renrawin.work@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all cursor-pointer"
              style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}30` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${ACCENT}20`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${ACCENT}14`; }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: ACCENT }}
              >
                <Mail size={20} color="#fff" />
              </div>
              <div>
                <p className="font-bold text-white text-[14px] mb-0.5">อีเมล</p>
                <p className="text-[12px]" style={{ color: "#93c5fd" }}>renrawin.work@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:0989926022"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all cursor-pointer"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(16,185,129,0.14)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(16,185,129,0.08)"; }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "#10b981" }}
              >
                <MessageCircle size={20} color="#fff" />
              </div>
              <div>
                <p className="font-bold text-white text-[14px] mb-0.5">โทรศัพท์</p>
                <p className="text-[12px]" style={{ color: "#6ee7b7" }}>09-8992-6022</p>
              </div>
            </a>

            {/* Response time card */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "#1a2744" }}
              >
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <p className="font-bold text-white text-[14px] mb-0.5">ตอบกลับไว</p>
                <p className="text-[12px]" style={{ color: MUTED }}>ภายใน 24 ชม. ทุกวัน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6" style={{ background: "#02040a", borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1080px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <span className="text-[13px] font-black" style={{ color: "#1a2744" }}>
            Ren<span style={{ color: ACCENT }}>Stack</span>
          </span>
          <p className="text-[12px]" style={{ color: "#1e2d45" }}>© 2026 Renrawin Nuanin · Full Stack Developer</p>
        </div>
      </footer>
    </div>
  );
}
