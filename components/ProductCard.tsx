import Link from "next/link";
import { formatPrice, formatSold } from "@/lib/data";
import { Product } from "@/lib/types";
import { Star, Clock, ArrowRight } from "lucide-react";
import ServiceMockup from "./ServiceMockup";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "flash";
}

export default function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  if (variant === "flash") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="shrink-0 w-44 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group border border-gray-100 hover:border-blue-200"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <ServiceMockup category={product.category} name={product.name} />
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-600 line-clamp-1 mb-1.5 font-medium">
            {product.name.split("—")[0].trim()}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-[#2563EB] font-bold text-sm">฿{formatPrice(product.price)}</p>
            <span className="text-xs bg-blue-100 text-[#2563EB] px-1.5 py-0.5 rounded font-medium">-{product.discount}%</span>
          </div>
          <p className="text-gray-400 text-xs line-through">฿{formatPrice(product.originalPrice)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-200 group flex flex-col border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5"
    >
      {/* Mockup preview */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <ServiceMockup category={product.category} name={product.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
          <span className="flex items-center gap-1 text-white text-xs font-medium bg-[#2563EB] px-3 py-1.5 rounded-full">
            ดูรายละเอียด <ArrowRight size={12} />
          </span>
        </div>
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#2563EB] text-white text-xs px-2 py-0.5 font-bold rounded">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-sm text-gray-800 line-clamp-2 flex-1 mb-2 leading-5 font-medium">{product.name}</p>

        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[#2563EB] font-bold text-base">฿{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">฿{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-[#FFCA11] fill-[#FFCA11]" />
            <span className="font-medium text-gray-700">{product.rating}</span>
            <span className="text-gray-300">·</span>
            <span>{formatSold(product.sold)} โปรเจค</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={10} />
            <span>{(product.location ?? "").split("ส่งมอบ ")[1] ?? product.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
