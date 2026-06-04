import CategoryGrid from "@/components/CategoryGrid";
import FlashDeals from "@/components/FlashDeals";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ChevronRight, Code2, Rocket, Shield, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%)" }} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Grid pattern */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              พร้อมรับงาน — ปรึกษาฟรีก่อนตกลงทุกครั้ง
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              รับทำเว็บไซต์<br />
              <span className="text-blue-200">ครบวงจร</span> พร้อมใช้งาน
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              ตั้งแต่ออกแบบ UI ไปจนถึง Deploy บน Production จริง<br className="hidden md:block" />
              ประสบการณ์ Infrastructure จากโครงการระดับองค์กร
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cart"
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                <MessageSquare size={16} />
                ทักมาปรึกษาฟรี
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/30 text-sm"
              >
                ดูบริการทั้งหมด <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { label: "โปรเจคที่ส่งมอบ", value: "180+", icon: <Rocket size={18} className="text-[#2563EB]" /> },
              { label: "ลูกค้าพึงพอใจ", value: "150+", icon: <Star size={18} className="text-[#FFCA11] fill-[#FFCA11]" /> },
              { label: "คะแนนเฉลี่ย", value: "4.9/5", icon: <Star size={18} className="text-[#FFCA11] fill-[#FFCA11]" /> },
              { label: "ประสบการณ์", value: "3+ ปี", icon: <Code2 size={18} className="text-[#2563EB]" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-6 py-4">
                {stat.icon}
                <div>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {/* Categories */}
        <CategoryGrid />

        {/* Featured packages */}
        <FlashDeals />

        {/* Tech stack banner */}
        <div className="bg-[#1E3A8A] rounded-lg px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-base mb-1">Tech Stack ที่ใช้งานได้จริง</p>
            <p className="text-blue-300 text-sm">ทุกโปรเจคสร้างด้วยเทคโนโลยีที่ใช้ใน Production จริง ไม่ใช่แค่ Demo</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "MySQL", "PostgreSQL", "Docker", "Cloudflare", "Linux VPS"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-white/10 text-white text-xs rounded border border-white/20 hover:bg-white/20 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#2563EB] rounded-full" />
            สิ่งที่ได้รับในทุกโปรเจค
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: "🎨", title: "UI สวยงาม", desc: "ออกแบบตามสไตล์ที่ต้องการ" },
              { icon: "📱", title: "Responsive", desc: "รองรับทุกหน้าจอ" },
              { icon: "⚡", title: "โหลดเร็ว", desc: "Next.js Performance" },
              { icon: "🔍", title: "SEO พื้นฐาน", desc: "Meta, OG, Sitemap" },
              { icon: "🚀", title: "Deploy ให้", desc: "พร้อมใช้งานจริง" },
              { icon: "📦", title: "Source Code", desc: "เป็นเจ้าของทั้งหมด" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <span className="text-2xl mb-2">{item.icon}</span>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All services */}
        <section className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#2563EB] rounded-full" />
              <h2 className="font-bold text-gray-800 text-base">บริการทั้งหมด</h2>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-sm text-[#2563EB] hover:opacity-80 font-medium">
              ดูทั้งหมด <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <div className="rounded-lg overflow-hidden" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
          <div className="px-8 py-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">พร้อมเริ่มโปรเจคแล้วใช่ไหม?</h2>
            <p className="text-white/80 mb-6 text-sm">บอกความต้องการมาได้เลย จะแนะนำแนวทางและราคาทั้งหมดก่อนตกลงงาน</p>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#2563EB] font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <MessageSquare size={18} />
              ทักมาปรึกษาฟรี — ไม่มีค่าใช้จ่าย
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
