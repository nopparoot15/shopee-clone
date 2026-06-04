"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  Gem,
  Database,
  Globe,
  Code2,
  Server,
  User,
  MessageCircle,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";

type Tab = "projects" | "restaurant" | "topup" | "database" | "about" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "projects", label: "ผลงานทั้งหมด" },
  { id: "restaurant", label: "ระบบร้านอาหาร" },
  { id: "topup", label: "เว็บเติมเงิน" },
  { id: "database", label: "ระบบจัดการข้อมูล" },
  { id: "about", label: "เกี่ยวกับฉัน" },
  { id: "contact", label: "ติดต่อ" },
];

const W = "max-w-[860px] mx-auto w-full px-6";

export default function PortfolioPage() {
  const [active, setActive] = useState<Tab>("projects");

  return (
    <div className="min-h-screen flex flex-col">

      {/* Nav */}
      <nav style={{ borderBottom: "0.5px solid #e2e8f0" }} className="bg-white">
        <div className={`${W} flex items-center justify-between h-[52px]`}>
          <Link href="/" className="text-[15px] font-medium text-[#0f172a] tracking-tight hover:opacity-70 transition-opacity">
            RenStack<span className="text-[#1A56DB]"> Solutions</span>
          </Link>
          <div className="hidden sm:flex items-center gap-5">
            <button onClick={() => setActive("projects")} className="text-[13px] text-[#64748b] hover:text-[#1A56DB] cursor-pointer transition-colors">ผลงาน</button>
            <button onClick={() => setActive("about")} className="text-[13px] text-[#64748b] hover:text-[#1A56DB] cursor-pointer transition-colors">เกี่ยวกับฉัน</button>
            <button onClick={() => setActive("contact")} className="text-[13px] text-[#64748b] hover:text-[#1A56DB] cursor-pointer transition-colors">ติดต่อ</button>
          </div>
          <button
            onClick={() => setActive("contact")}
            className="bg-[#1A56DB] text-white text-[13px] px-4 py-[7px] rounded-md hover:bg-[#1446c0] transition-colors cursor-pointer"
          >
            จ้างงาน
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#f8faff", borderBottom: "0.5px solid #e2e8f0" }}>
        <div className={`${W} pt-10 pb-9`}>
          <div className="max-w-[560px]">
            <p className="text-[12px] text-[#94a3b8] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB] inline-block" />
              พร้อมรับงาน Freelance
            </p>
            <h1 className="text-[28px] font-semibold text-[#0f172a] leading-[1.25] mb-3">
              Renrawin Nuanin<br />
              <span className="text-[#1A56DB]">Full Stack Project Manager</span>
            </h1>
            <p className="text-[14px] text-[#64748b] leading-[1.75] mb-5">
              รับพัฒนา Web Application สำหรับธุรกิจทุกประเภท ครบตั้งแต่ออกแบบไปจนถึง Deploy พร้อมใช้งานจริง
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <button
                onClick={() => setActive("projects")}
                className="bg-[#1A56DB] text-white text-[13px] px-5 py-[9px] rounded-md hover:bg-[#1446c0] transition-colors cursor-pointer"
              >
                ดูผลงาน
              </button>
              <button
                onClick={() => setActive("contact")}
                className="bg-white text-[#1A56DB] text-[13px] px-5 py-[9px] rounded-md hover:bg-[#EFF6FF] transition-colors cursor-pointer"
                style={{ border: "0.5px solid #1A56DB" }}
              >
                ติดต่อจ้างงาน
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {["React", "Next.js", "Tailwind CSS", "Node.js", "MySQL", "Docker", "Cloudflare"].map((t) => (
                <span key={t} className="bg-white text-[#475569] text-[11px] px-2.5 py-1 rounded-full" style={{ border: "0.5px solid #e2e8f0" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white" style={{ borderBottom: "0.5px solid #e2e8f0" }}>
        <div className={`${W} flex gap-0 overflow-x-auto`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-[18px] py-[13px] text-[13px] whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                active === tab.id
                  ? "text-[#1A56DB] border-[#1A56DB] font-medium"
                  : "text-[#64748b] border-transparent hover:text-[#1A56DB]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className={`${W} py-5`}>

          {/* All projects */}
          {active === "projects" && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <ProjectCard
                  bg="#EFF6FF"
                  icon={<QrCode size={32} style={{ color: "#1A56DB" }} />}
                  tag={{ label: "ร้านอาหาร", bg: "#DBEAFE", color: "#1e40af" }}
                  name="QR Order System"
                  desc="ระบบสั่งอาหารผ่าน QR Code จำกัดเวลา 2 ชม. เพิ่ม/ลดออเดอร์ได้แบบ Realtime"
                  techs={["Next.js", "Node.js", "MySQL"]}
                  demoHref="/demo/qr-order"
                  onClick={() => setActive("restaurant")}
                />
                <ProjectCard
                  bg="#F0FDF4"
                  icon={<Gem size={32} style={{ color: "#059669" }} />}
                  tag={{ label: "เติมเงินเกม", bg: "#DCFCE7", color: "#166534" }}
                  name="Game Top-Up Platform"
                  desc="เว็บเติมเงินเกม รองรับหลาย Gateway ตรวจสอบสถานะ Transaction แบบ Realtime"
                  techs={["React", "Express", "PostgreSQL"]}
                  demoHref="/demo/topup"
                  onClick={() => setActive("topup")}
                />
                <ProjectCard
                  bg="#FFF7ED"
                  icon={<Database size={32} style={{ color: "#ea580c" }} />}
                  tag={{ label: "ฐานข้อมูล", bg: "#FFEDD5", color: "#9a3412" }}
                  name="Data Management System"
                  desc="ระบบจัดเก็บและจัดการฐานข้อมูลองค์กร Dashboard สรุปข้อมูล Export Excel/PDF"
                  techs={["Next.js", "MySQL", "Docker"]}
                  demoHref="/demo/data-management"
                  onClick={() => setActive("database")}
                />
                <ProjectCard
                  bg="#FDF4FF"
                  icon={<Globe size={32} style={{ color: "#9333ea" }} />}
                  tag={{ label: "Landing Page", bg: "#FAE8FF", color: "#6b21a8" }}
                  name="Company Profile Website"
                  desc="เว็บไซต์แนะนำบริษัท Responsive ทุกอุปกรณ์ SEO พื้นฐาน พร้อม Deploy"
                  techs={["Next.js", "Tailwind", "Vercel"]}
                  demoHref="/demo/company-profile"
                />
              </div>
            </div>
          )}

          {/* Restaurant */}
          {active === "restaurant" && (
            <DetailPanel
              sectionTitle="ระบบร้านอาหาร — QR Order System"
              bg="#EFF6FF"
              icon={<QrCode size={48} style={{ color: "#1A56DB" }} />}
              tag={{ label: "Demo พร้อม", bg: "#DBEAFE", color: "#1e40af" }}
              name="ระบบสั่งอาหารผ่าน QR Code"
              desc="ลูกค้าสแกน QR Code บนโต๊ะ → เปิดเมนูบนมือถือ → สั่ง เพิ่ม/ลด ได้ทันที ระบบจำกัดเวลา 2 ชั่วโมงต่อการนั่ง ครัวได้รับออเดอร์แบบ Realtime ไม่ต้องรอพนักงาน"
              techs={["Next.js", "Node.js", "MySQL", "Socket.io", "Docker"]}
              badges={[
                { label: "✓ QR Code ต่อโต๊ะ", bg: "#EFF6FF", color: "#1e40af" },
                { label: "✓ จำกัดเวลา 2 ชม.", bg: "#EFF6FF", color: "#1e40af" },
                { label: "✓ Realtime Kitchen", bg: "#EFF6FF", color: "#1e40af" },
              ]}
              demoHref="/demo/qr-order"
            />
          )}

          {/* Top-up */}
          {active === "topup" && (
            <DetailPanel
              sectionTitle="เว็บเติมเงินเกม — Game Top-Up Platform"
              bg="#F0FDF4"
              icon={<Gem size={48} style={{ color: "#059669" }} />}
              tag={{ label: "Demo พร้อม", bg: "#DCFCE7", color: "#166534" }}
              name="ระบบเติมเงินเกมออนไลน์"
              desc="แพลตฟอร์มเติมเงินเกม รองรับหลายเกมในระบบเดียว ตรวจสอบสถานะการชำระเงินแบบ Realtime มีระบบประวัติ Transaction และแจ้งเตือนอัตโนมัติ"
              techs={["React", "Express", "PostgreSQL", "REST API"]}
              badges={[
                { label: "✓ หลาย Payment Gateway", bg: "#F0FDF4", color: "#166534" },
                { label: "✓ ประวัติ Transaction", bg: "#F0FDF4", color: "#166534" },
                { label: "✓ แจ้งเตือน Realtime", bg: "#F0FDF4", color: "#166634" },
              ]}
              demoHref="/demo/topup"
            />
          )}

          {/* Database */}
          {active === "database" && (
            <DetailPanel
              sectionTitle="ระบบจัดการฐานข้อมูล — Data Management"
              bg="#FFF7ED"
              icon={<Database size={48} style={{ color: "#ea580c" }} />}
              tag={{ label: "Demo พร้อม", bg: "#FFEDD5", color: "#9a3412" }}
              name="ระบบจัดเก็บและจัดการข้อมูลองค์กร"
              desc="ระบบ Backend สำหรับจัดการข้อมูลองค์กร มี Dashboard สรุปภาพรวม ค้นหา กรอง Export ข้อมูลเป็น Excel/PDF จัดการสิทธิ์ผู้ใช้แยกตาม Role"
              techs={["Next.js", "MySQL", "Docker", "REST API"]}
              badges={[
                { label: "✓ Dashboard สรุปข้อมูล", bg: "#FFF7ED", color: "#9a3412" },
                { label: "✓ Export Excel/PDF", bg: "#FFF7ED", color: "#9a3412" },
                { label: "✓ Role-based Access", bg: "#FFF7ED", color: "#9a3412" },
              ]}
              demoHref="/demo/data-management"
            />
          )}

          {/* About */}
          {active === "about" && (
            <div className="space-y-5">
              {/* Skills */}
              <div>
                <p className="text-[12px] text-[#94a3b8] mb-3">ทักษะและเทคโนโลยี</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-[10px] p-4" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
                    <h3 className="text-[13px] font-medium text-[#0f172a] mb-3 flex items-center gap-1.5">
                      <Code2 size={15} className="text-[#1A56DB]" /> Frontend
                    </h3>
                    <SkillRow name="React" pct={85} />
                    <SkillRow name="Next.js" pct={85} />
                    <SkillRow name="TypeScript" pct={72} />
                  </div>
                  <div className="rounded-[10px] p-4" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
                    <h3 className="text-[13px] font-medium text-[#0f172a] mb-3 flex items-center gap-1.5">
                      <Server size={15} className="text-[#1A56DB]" /> Backend
                    </h3>
                    <SkillRow name="Node.js" pct={78} />
                    <SkillRow name="MySQL" pct={74} />
                    <SkillRow name="PostgreSQL" pct={68} />
                  </div>
                  <div className="rounded-[10px] p-4" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
                    <h3 className="text-[13px] font-medium text-[#0f172a] mb-3 flex items-center gap-1.5">
                      <Globe size={15} className="text-[#1A56DB]" /> Infrastructure
                    </h3>
                    <SkillRow name="Docker" pct={80} />
                    <SkillRow name="Linux" pct={78} />
                    <SkillRow name="Cloudflare" pct={72} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <div className="rounded-[10px] p-4" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
                    <h3 className="text-[13px] font-medium text-[#0f172a] mb-3 flex items-center gap-1.5">
                      <Database size={15} className="text-[#1A56DB]" /> Cloud &amp; Tools
                    </h3>
                    <SkillRow name="Azure" pct={65} />
                    <SkillRow name="VMware" pct={62} />
                    <SkillRow name="Git" pct={85} />
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <div>
                <p className="text-[12px] text-[#94a3b8] mb-3">จุดเด่นพิเศษ</p>
                <div className="rounded-[10px] p-4" style={{ background: "#EFF6FF", border: "0.5px solid #BFDBFE" }}>
                  <p className="text-[13px] text-[#1e40af] leading-[1.75]">
                    มีประสบการณ์ด้าน Infrastructure &amp; Deployment จริงจากโครงการระดับองค์กร ครอบคลุมทั้ง Azure Virtual Desktop, VMware vSphere และ Windows Server จึงสามารถส่งมอบเว็บไซต์ที่พร้อมใช้งานได้จริงใน Production Environment ครบวงจรตั้งแต่พัฒนาไปจนถึงนำระบบขึ้นใช้งาน
                  </p>
                </div>
              </div>

              {/* Service types */}
              <div>
                <p className="text-[12px] text-[#94a3b8] mb-3">รับงานประเภท</p>
                <div className="flex flex-wrap gap-2">
                  {["Landing Page", "Company Profile", "QR Order System", "Game Top-Up", "Data Management", "Portfolio Website", "REST API", "Deploy & Server Setup"].map((t) => (
                    <span key={t} className="text-[12px] text-[#475569] px-3 py-1.5 rounded-lg" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {active === "contact" && (
            <div>
              <div className="rounded-[10px] p-4 max-w-[360px]" style={{ background: "#f8faff", border: "0.5px solid #e2e8f0" }}>
                <h3 className="text-[13px] font-medium text-[#0f172a] mb-3 flex items-center gap-1.5">
                  <User size={16} className="text-[#1A56DB]" /> Renrawin Nuanin
                </h3>
                <div className="space-y-2.5 mt-2.5">
                  <ContactRow icon={<Mail size={15} className="text-[#1A56DB]" />} text="renrawin.work@gmail.com" />
                  <ContactRow icon={<MessageCircle size={15} className="text-[#1A56DB]" />} text="09-8992-6022" />
                  <ContactRow icon={<Clock size={15} className="text-[#1A56DB]" />} text="ตอบกลับภายใน 24 ชั่วโมง" />
                </div>
                <button className="w-full mt-3 bg-[#1A56DB] text-white text-[13px] py-[9px] rounded-md hover:bg-[#1446c0] transition-colors cursor-pointer">
                  ทักหาเลย
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#f8faff", borderTop: "0.5px solid #e2e8f0" }}>
        <div className={`${W} flex justify-center items-center py-3`}>
          <span className="text-[12px] text-[#94a3b8]">© 2026 RenStack Solutions</span>
        </div>
      </div>

    </div>
  );
}

/* ── Sub-components ── */

function ProjectCard({
  bg, icon, tag, name, desc, techs, demoHref, onClick,
}: {
  bg: string;
  icon: React.ReactNode;
  tag: { label: string; bg: string; color: string };
  name: string;
  desc: string;
  techs: string[];
  demoHref?: string;
  onClick?: () => void;
}) {
  const inner = (
    <div
      className="bg-white rounded-[10px] overflow-hidden flex flex-col h-full"
      style={{ border: "0.5px solid #e2e8f0" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#93c5fd"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
    >
      <div className="h-[100px] flex items-center justify-center relative" style={{ background: bg }}>
        {icon}
        <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full" style={{ background: tag.bg, color: tag.color }}>
          {tag.label}
        </span>
        {demoHref && (
          <span className="absolute bottom-2 right-2 flex items-center gap-0.5 text-[10px] text-[#94a3b8]">
            ดู Demo <ArrowUpRight size={10} />
          </span>
        )}
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[13px] font-medium text-[#0f172a] mb-1">{name}</p>
        <p className="text-[11px] text-[#64748b] leading-[1.5] mb-2">{desc}</p>
        <div className="flex flex-wrap gap-1">
          {techs.map((t) => (
            <span key={t} className="text-[10px] bg-[#f1f5f9] text-[#475569] px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );

  if (demoHref) {
    return <Link href={demoHref} className="block">{inner}</Link>;
  }
  return <button onClick={onClick} className="text-left w-full">{inner}</button>;
}

function DetailPanel({
  sectionTitle, bg, icon, tag, name, desc, techs, badges, demoHref,
}: {
  sectionTitle: string;
  bg: string;
  icon: React.ReactNode;
  tag: { label: string; bg: string; color: string };
  name: string;
  desc: string;
  techs: string[];
  badges: { label: string; bg: string; color: string }[];
  demoHref?: string;
}) {
  return (
    <div>
      <p className="text-[13px] text-[#94a3b8] mb-4">{sectionTitle}</p>
      <div className="bg-white rounded-[10px] overflow-hidden max-w-[480px]" style={{ border: "0.5px solid #e2e8f0" }}>
        <div className="h-[120px] flex items-center justify-center relative" style={{ background: bg }}>
          {icon}
          <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full" style={{ background: tag.bg, color: tag.color }}>
            {tag.label}
          </span>
        </div>
        <div className="px-3 py-3">
          <p className="text-[13px] font-medium text-[#0f172a] mb-1.5">{name}</p>
          <p className="text-[11px] text-[#64748b] leading-[1.6] mb-3">{desc}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {techs.map((t) => (
              <span key={t} className="text-[10px] bg-[#f1f5f9] text-[#475569] px-1.5 py-0.5 rounded">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((b) => (
              <span key={b.label} className="text-[11px] px-2 py-1 rounded" style={{ background: b.bg, color: b.color }}>{b.label}</span>
            ))}
          </div>
          {demoHref && (
            <Link
              href={demoHref}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-white px-4 py-2 rounded-md transition-colors"
              style={{ background: "#1A56DB" }}
            >
              ดู Demo <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillRow({ name, pct }: { name: string; pct: number }) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="text-[12px] text-[#475569]">{name}</span>
      <div className="w-[100px] h-[5px] bg-[#e2e8f0] rounded-full overflow-hidden">
        <div className="h-full bg-[#1A56DB] rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-[#475569]">
      {icon}
      {text}
    </div>
  );
}
