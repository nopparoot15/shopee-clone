import CategoryGrid from "@/components/CategoryGrid";
import FlashDeals from "@/components/FlashDeals";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      {/* Category shortcuts */}
      <CategoryGrid />

      {/* Flash Sale */}
      <FlashDeals />

      {/* Recommended products */}
      <section className="bg-white rounded-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#2563EB] rounded-full" />
            <h2 className="font-semibold text-gray-700 text-base">สินค้าแนะนำ</h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-[#2563EB] hover:opacity-80">
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
