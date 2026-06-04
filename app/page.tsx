import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import FlashDeals from "@/components/FlashDeals";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      {/* Banner + sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-3">
        <Banner />
        {/* Sidebar mini-banners */}
        <div className="hidden md:flex flex-col gap-3">
          <div className="rounded overflow-hidden bg-gradient-to-br from-pink-400 to-orange-300 p-4 flex flex-col justify-end h-full">
            <p className="text-white font-bold text-sm">แฟชั่นสุดฮิต</p>
            <p className="text-white/80 text-xs mt-0.5">ลดถึง 70%</p>
          </div>
          <div className="rounded overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500 p-4 flex flex-col justify-end h-full">
            <p className="text-white font-bold text-sm">เทคโนโลยี</p>
            <p className="text-white/80 text-xs mt-0.5">ส่งฟรีทั่วไทย</p>
          </div>
        </div>
      </div>

      {/* Category shortcuts */}
      <CategoryGrid />

      {/* Flash Sale */}
      <FlashDeals />

      {/* Just for you */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#EE4D2D] rounded-full" />
            <h2 className="font-semibold text-gray-700 text-base uppercase tracking-wide">แนะนำสำหรับคุณ</h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-[#EE4D2D] hover:opacity-80">
            ดูทั้งหมด <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
