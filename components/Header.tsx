"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Bell, MessageSquare, ChevronDown, Code2, Phone } from "lucide-react";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const quickSearch = ["Landing Page", "Company Profile", "ร้านอาหาร", "Full-Stack"];

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#1E3A8A] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/products" className="hover:opacity-80">ผลงานทั้งหมด</Link>
            <span className="opacity-40">|</span>
            <Link href="#techstack" className="hover:opacity-80">Tech Stack</Link>
            <span className="opacity-40">|</span>
            <span className="opacity-80">Next.js · React · Node.js · Docker</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <Bell size={12} />
              <span>LINE: @webpro</span>
            </Link>
            <Link href="tel:" className="hover:opacity-80 flex items-center gap-1">
              <Phone size={12} />
              <span>ติดต่อ</span>
            </Link>
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <span>ปรึกษาฟรี</span>
              <ChevronDown size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div style={{ background: "linear-gradient(to bottom, #2563EB, #1D4ED8)" }} className="py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Code2 size={28} className="text-white" />
            <div>
              <div className="text-white font-bold text-xl leading-none tracking-tight">WebPro</div>
              <div className="text-white/70 text-[10px] leading-none">รับทำเว็บไซต์ครบวงจร</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาบริการ เช่น Landing Page, ร้านอาหาร..."
                className="w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-l-sm outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-white rounded-r-sm transition-colors"
                style={{ background: "#1D4ED8" }}
              >
                <Search size={18} />
              </button>
            </div>
            <div className="flex gap-3 mt-1.5 overflow-hidden">
              {quickSearch.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => { setQuery(term); router.push(`/products?q=${encodeURIComponent(term)}`); }}
                  className="text-white/80 text-xs hover:text-white whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>

          {/* CTA */}
          <Link
            href="/cart"
            className="shrink-0 bg-white text-[#2563EB] font-semibold text-sm px-4 py-2.5 rounded hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare size={16} />
            ทักมาปรึกษา
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-6 text-sm text-gray-600 h-10 overflow-x-auto scrollbar-hide">
            {[
              { label: "Landing Page", id: "landing" },
              { label: "Company Profile", id: "company" },
              { label: "Portfolio", id: "portfolio" },
              { label: "ร้านอาหาร", id: "restaurant" },
              { label: "ร้านค้าออนไลน์", id: "ecommerce" },
              { label: "ประชาสัมพันธ์", id: "promote" },
              { label: "แนะนำสินค้า", id: "product" },
              { label: "Full-Stack App", id: "fullstack" },
              { label: "SEO Package", id: "seo" },
            ].map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/products?cat=${cat.id}`}
                  className="whitespace-nowrap hover:text-[#2563EB] transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
