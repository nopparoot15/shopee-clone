import Link from "next/link";
import Image from "next/image";
import { formatPrice, formatSold } from "@/lib/data";
import { Product } from "@/lib/types";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "flash";
}

export default function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  if (variant === "flash") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="shrink-0 w-36 bg-white rounded overflow-hidden hover:shadow-md transition-shadow group"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="144px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#EE4D2D] to-transparent text-white text-center py-1">
            <span className="text-sm font-bold">-{product.discount}%</span>
          </div>
        </div>
        <div className="p-2">
          <p className="text-[#EE4D2D] font-semibold text-sm">฿{formatPrice(product.price)}</p>
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
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {product.discount >= 50 && (
          <div className="absolute top-0 left-0 bg-[#EE4D2D] text-white text-xs px-1.5 py-0.5 font-medium">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-sm text-gray-700 line-clamp-2 flex-1 mb-1.5 leading-5">{product.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#EE4D2D] font-semibold">฿{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">฿{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="text-[#FFCA11] fill-[#FFCA11]" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
          <span className="text-gray-300 text-xs">|</span>
          <span className="text-xs text-gray-500">ขายแล้ว {formatSold(product.sold)}</span>
        </div>
        <div className="mt-1">
          <span className="text-xs text-gray-400">{product.location}</span>
        </div>
      </div>
    </Link>
  );
}
