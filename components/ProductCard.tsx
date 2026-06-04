import Link from "next/link";
import Image from "next/image";
import { formatPrice, formatSold } from "@/lib/data";
import { Product } from "@/lib/types";
import { Star, Clock } from "lucide-react";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "flash";
}

export default function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  if (variant === "flash") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="shrink-0 w-40 bg-white rounded overflow-hidden hover:shadow-md transition-shadow group"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="160px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#2563EB] text-white text-center py-1">
            <span className="text-sm font-bold">-{product.discount}%</span>
          </div>
        </div>
        <div className="p-2">
          <p className="text-xs text-gray-600 line-clamp-2 mb-1 leading-4">{product.name.split("—")[0].trim()}</p>
          <p className="text-[#2563EB] font-semibold text-sm">฿{formatPrice(product.price)}</p>
          <p className="text-gray-400 text-xs line-through">฿{formatPrice(product.originalPrice)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded overflow-hidden hover:shadow-md transition-shadow duration-200 group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {product.discount > 0 && (
          <div className="absolute top-0 left-0 bg-[#2563EB] text-white text-xs px-1.5 py-0.5 font-medium">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-sm text-gray-700 line-clamp-2 flex-1 mb-2 leading-5">{product.name}</p>
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-[#2563EB] font-semibold">฿{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">฿{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-[#FFCA11] fill-[#FFCA11]" />
            <span>{product.rating}</span>
            <span className="text-gray-300">·</span>
            <span>{formatSold(product.sold)} โปรเจค</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={10} />
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
