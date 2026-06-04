"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Search, Bell, MessageSquare, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const trendingSearches = ["เสื้อยืด", "หูฟัง bluetooth", "ครีมกันแดด", "กระเป๋าเป้"];

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#BF360C] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <span>ขายของบน Shoppe</span>
            </Link>
            <span className="opacity-40">|</span>
            <Link href="#" className="hover:opacity-80">ดาวน์โหลด App</Link>
            <span className="opacity-40">|</span>
            <Link href="#" className="hover:opacity-80">ติดตามเราบน</Link>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <Bell size={12} />
              <span>การแจ้งเตือน</span>
            </Link>
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <MessageSquare size={12} />
              <span>ช่วยเหลือ</span>
            </Link>
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <span>ภาษา / ไทย</span>
              <ChevronDown size={10} />
            </Link>
            <Link href="#" className="hover:opacity-80">สมัครสมาชิก</Link>
            <span className="opacity-40">|</span>
            <Link href="#" className="hover:opacity-80">เข้าสู่ระบบ</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div style={{ background: "linear-gradient(to bottom, #EE4D2D, #F75433)" }} className="py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <div className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "Arial Black, sans-serif" }}>
              Shoppe
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-l-sm outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#EE4D2D] text-white rounded-r-sm hover:bg-[#D73211] transition-colors"
                style={{ background: "#f05d40" }}
              >
                <Search size={18} />
              </button>
            </div>
            {/* Trending under search */}
            <div className="flex gap-3 mt-1.5 overflow-hidden">
              {trendingSearches.map((term) => (
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

          {/* Cart */}
          <Link href="/cart" className="shrink-0 text-white flex flex-col items-center group">
            <div className="relative">
              <ShoppingCart size={26} />
              <span className="absolute -top-2 -right-2 bg-white text-[#EE4D2D] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                0
              </span>
            </div>
            <span className="text-xs mt-0.5">ตะกร้า</span>
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-6 text-sm text-gray-600 h-10 overflow-x-auto scrollbar-hide">
            {["แฟชั่น", "อิเล็กทรอนิกส์", "บ้าน & ชีวิต", "ความงาม", "กีฬา", "อาหาร", "หนังสือ", "ของเล่น", "ยานยนต์", "สัตว์เลี้ยง"].map(
              (cat) => (
                <li key={cat}>
                  <Link href={`/products?cat=${encodeURIComponent(cat)}`} className="whitespace-nowrap hover:text-[#EE4D2D] transition-colors">
                    {cat}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
