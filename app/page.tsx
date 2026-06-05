"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode, Zap, Database, Globe, Wind,
  Code2, Server, ArrowUpRight,
  MessageCircle, Mail, ChevronDown,
  Sun, Moon,
} from "lucide-react";

/* ─── themes ─── */
const THEMES = {
  dark: {
    bg:          "#060b14",
    card:        "#0d1321",
    accent:      "#2563eb",
    cyan:        "#06b6d4",
    border:      "#1a2744",
    text:        "#e2e8f0",
    muted:       "#475569",
    heading:     "#ffffff",
    section1:    "#07090e",
    section2:    "#0a0f1a",
    footer:      "#02040a",
    footerText:  "#1e2d45",
    footerBrand: "#1a2744",
    navBg:       "rgba(6,11,20,0.95)",
    heroGlow:    "rgba(37,99,235,0.16) 0%, rgba(6,182,212,0.07) 50%, transparent 80%",
    gridOp:      "0.07",
    scrollHint:  "#1e2d45",
    diffBg:      "rgba(37,99,235,0.05)",
    diffBorder:  "rgba(37,99,235,0.12)",
    diffText:    "#93c5fd",
    toggleBg:    "#1a2744",
    toggleColor: "#94a3b8",
  },
  light: {
    bg:          "#f8faff",
    card:        "#ffffff",
    accent:      "#2563eb",
    cyan:        "#0891b2",
    border:      "#dde6f5",
    text:        "#334155",
    muted:       "#64748b",
    heading:     "#0f172a",
    section1:    "#eef2fb",
    section2:    "#f0f5ff",
    footer:      "#e2eaf8",
    footerText:  "#94a3b8",
    footerBrand: "#94a3b8",
    navBg:       "rgba(248,250,255,0.95)",
    heroGlow:    "rgba(37,99,235,0.09) 0%, rgba(8,145,178,0.04) 50%, transparent 80%",
    gridOp:      "0.035",
    scrollHint:  "#c0cfe8",
    diffBg:      "rgba(37,99,235,0.04)",
    diffBorder:  "rgba(37,99,235,0.12)",
    diffText:    "#1d4ed8",
    toggleBg:    "#e2eaf8",
    toggleColor: "#64748b",
  },
};

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
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered]   = useState<string | null>(null);
  const [dark, setDark]         = useState(false);
  const t = dark ? THEMES.dark : THEMES.light;

  const projects  = useCounter(50);
  const delivered = useCounter(100);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "sans-serif", transition: "background 0.35s, color 0.35s" }}>
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
        @keyframes theme-spin {
          from { transform: rotate(0deg) scale(0.7); opacity: 0; }
          to   { transform: rotate(360deg) scale(1); opacity: 1; }
        }
      `}</style>

      {/* ── STICKY NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? t.navBg : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${t.border}` : "none",
          transition: "background 0.35s, border-color 0.35s",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-black tracking-tight" style={{ color: t.heading }}>
            Ren<span style={{ color: t.accent }}>Stack</span>
          </span>
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "ผลงาน",  id: "projects" },
              { label: "ทักษะ",   id: "skills" },
              { label: "ติดต่อ", id: "contact" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-[13px] cursor-pointer transition-colors"
                style={{ color: t.muted }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {/* dark/light toggle */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? "สลับโหมดสว่าง" : "สลับโหมดมืด"}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all"
              style={{ background: t.toggleBg, color: t.toggleColor }}
            >
              <span key={String(dark)} style={{ display: "flex", animation: "theme-spin 0.35s ease both" }}>
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[12px] font-bold px-4 py-2 rounded-xl cursor-pointer"
              style={{ background: t.accent, color: "#fff" }}
            >
              จ้างงาน
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-16 pb-20 relative overflow-hidden">
        {/* animated glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${t.heroGlow})`,
            animation: "hero-glow 6s ease-in-out infinite",
            transition: "background 0.35s",
          }}
        />
        {/* grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: Number(t.gridOp),
            backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transition: "opacity 0.35s",
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
                background: `${t.accent}15`, border: `1px solid ${t.accent}30`, color: t.cyan,
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
            style={{ fontSize: "clamp(2.8rem, 9vw, 6rem)", color: t.heading, animation: "fade-up 0.7s 0.1s ease both", opacity: 0 }}
          >
            <span className="block">สร้างเว็บ</span>
            <span className="block">ที่ธุรกิจ</span>
            <span className="block" style={{ color: t.cyan }}>เติบโตจริง</span>
          </h1>

          <p className="text-[16px] leading-relaxed mb-8 max-w-[520px]"
            style={{ color: t.muted, animation: "fade-up 0.7s 0.2s ease both", opacity: 0 }}
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
              style={{ background: `linear-gradient(90deg, #1d4ed8, ${t.accent})`, color: "#fff" }}
            >
              ดูผลงาน <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[14px] font-medium px-7 py-3.5 rounded-2xl cursor-pointer"
              style={{ border: `1.5px solid ${t.border}`, color: t.muted }}
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
                <p className="text-[2.2rem] font-black leading-tight" style={{ color: t.heading }}>{val}</p>
                <p className="text-[12px]" style={{ color: t.muted }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          style={{ color: t.scrollHint, animation: "fade-up 1s 0.8s ease both", opacity: 0 }}
        >
          <span className="text-[11px]">เลื่อนดูผลงาน</span>
          <ChevronDown size={18} />
        </button>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════ */}
      <section id="projects" className="py-24 px-6" style={{ background: t.section1, transition: "background 0.35s" }}>
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: t.cyan }}>PORTFOLIO</p>
          <h2 className="text-[2.2rem] font-black mb-3" style={{ color: t.heading }}>ผลงาน</h2>
          <p className="text-[14px] mb-14" style={{ color: t.muted }}>โปรเจคที่พร้อม Demo ใช้งานได้จริง — กดที่การ์ดเพื่อเปิด Demo</p>

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
                    background: t.card,
                    border: `1px solid ${isHov ? p.accent + "60" : t.border}`,
                    transform: isHov ? "translateY(-6px)" : "none",
                    boxShadow: isHov ? `0 24px 48px rgba(0,0,0,0.15), 0 0 0 1px ${p.accent}30` : "none",
                    transition: "background 0.35s, border-color 0.2s, transform 0.2s, box-shadow 0.2s",
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
                    <p className="text-[15px] font-bold mb-1.5" style={{ color: t.heading }}>{p.name}</p>
                    <p className="text-[12px] leading-relaxed mb-3" style={{ color: t.muted }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techs.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-lg font-medium"
                          style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}25` }}
                        >
                          {tech}
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
      <section id="skills" className="py-24 px-6" style={{ background: t.section2, transition: "background 0.35s" }}>
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: t.cyan }}>STACK</p>
          <h2 className="text-[2.2rem] font-black mb-4" style={{ color: t.heading }}>ทักษะและเทคโนโลยี</h2>
          <p className="text-[14px] mb-12" style={{ color: t.muted }}>
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
                icon: <Code2 size={20} color={t.cyan} />,
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
                style={{ background: t.card, border: `1px solid ${t.border}`, transition: "background 0.35s, border-color 0.35s" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {col.icon}
                  <p className="font-bold text-[14px]" style={{ color: t.heading }}>{col.title}</p>
                </div>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px]" style={{ color: t.muted }}>
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
            style={{ background: t.diffBg, border: `1px solid ${t.diffBorder}`, transition: "background 0.35s, border-color 0.35s" }}
          >
            <p className="text-[13px] leading-relaxed" style={{ color: t.diffText }}>
              <span className="font-bold" style={{ color: t.heading }}>จุดต่างที่แท้จริง:</span>{" "}
              มีประสบการณ์ด้าน Infrastructure จริงจากโครงการระดับองค์กร ครอบคลุมทั้ง Azure Virtual Desktop, VMware vSphere และ Windows Server
              — สามารถส่งมอบ Production-ready ครบวงจรตั้งแต่พัฒนาจนถึง Deploy
            </p>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6" style={{ background: t.bg, transition: "background 0.35s" }}>
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] mb-3" style={{ color: t.cyan }}>CONTACT</p>
          <h2 className="text-[2.2rem] font-black mb-3" style={{ color: t.heading }}>เริ่มต้นโปรเจคด้วยกัน</h2>
          <p className="text-[14px] mb-12" style={{ color: t.muted }}>ปรึกษาฟรี ไม่มีค่าใช้จ่าย ตอบกลับภายใน 24 ชั่วโมง</p>

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
                <p className="font-bold text-[14px] mb-0.5" style={{ color: t.heading }}>LINE Official</p>
                <p className="text-[12px]" style={{ color: "#06C755" }}>คุยเร็วที่สุด — ตอบทันที</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:renrawin.work@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all cursor-pointer"
              style={{ background: `${t.accent}14`, border: `1px solid ${t.accent}30` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${t.accent}20`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${t.accent}14`; }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: t.accent }}
              >
                <Mail size={20} color="#fff" />
              </div>
              <div>
                <p className="font-bold text-[14px] mb-0.5" style={{ color: t.heading }}>อีเมล</p>
                <p className="text-[12px]" style={{ color: dark ? "#93c5fd" : "#1d4ed8" }}>renrawin.work@gmail.com</p>
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
                <p className="font-bold text-[14px] mb-0.5" style={{ color: t.heading }}>โทรศัพท์</p>
                <p className="text-[12px]" style={{ color: dark ? "#6ee7b7" : "#059669" }}>09-8992-6022</p>
              </div>
            </a>

            {/* Response time card */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ background: t.card, border: `1px solid ${t.border}`, transition: "background 0.35s, border-color 0.35s" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: dark ? "#1a2744" : "#e2eaf8" }}
              >
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <p className="font-bold text-[14px] mb-0.5" style={{ color: t.heading }}>ตอบกลับไว</p>
                <p className="text-[12px]" style={{ color: t.muted }}>ภายใน 24 ชม. ทุกวัน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6" style={{ background: t.footer, borderTop: `1px solid ${t.border}`, transition: "background 0.35s, border-color 0.35s" }}>
        <div className="max-w-[1080px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <span className="text-[13px] font-black" style={{ color: t.footerBrand }}>
            Ren<span style={{ color: t.accent }}>Stack</span>
          </span>
          <p className="text-[12px]" style={{ color: t.footerText }}>© 2026 Renrawin Nuanin · Full Stack Developer</p>
        </div>
      </footer>
    </div>
  );
}
