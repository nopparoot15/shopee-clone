import { getProductById, products, formatPrice, formatSold } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { Star, MapPin, Shield, RefreshCw, Truck, ChevronRight } from "lucide-react";
import Link from "next/link";
export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 >= 0.5;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-[#2563EB]">หน้าหลัก</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-[#2563EB]">สินค้า</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 truncate max-w-xs">{product.name}</span>
      </div>

      {/* Product main */}
      <div className="bg-white rounded-sm p-5 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium text-gray-800 leading-snug">{product.name}</h1>

          {/* Rating + sold */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-[#2563EB] font-semibold border-b border-[#2563EB]">{product.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < fullStars
                        ? "text-[#FFCA11] fill-[#FFCA11]"
                        : i === fullStars && hasHalf
                        ? "text-[#FFCA11] fill-[#FFCA11]/50"
                        : "text-gray-300 fill-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            <span className="text-gray-300">|</span>
            <span className="border-b border-gray-500 text-gray-500">{formatSold(product.sold)}</span>
            <span className="text-gray-500">ขายแล้ว</span>
          </div>

          {/* Price */}
          <div className="bg-[#FAFAFA] rounded px-4 py-4 flex items-end gap-3">
            <span className="text-[#2563EB] text-3xl font-light">฿{formatPrice(product.price)}</span>
            <span className="text-gray-400 text-lg line-through mb-0.5">฿{formatPrice(product.originalPrice)}</span>
            <span className="bg-[#2563EB] text-white text-xs px-2 py-0.5 rounded mb-1">-{product.discount}%</span>
          </div>

          {/* Location & stock */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span>จัดส่งจาก: <span className="text-gray-700">{product.location}</span></span>
            </div>
            <div>
              คงเหลือ: <span className="text-gray-700">{product.stock} ชิ้น</span>
            </div>
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Guarantee */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Shield size={20} className="text-[#2563EB]" />
              <span className="text-xs text-gray-500">สินค้าของแท้ 100%</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck size={20} className="text-[#2563EB]" />
              <span className="text-xs text-gray-500">ส่งฟรีทั่วไทย</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RefreshCw size={20} className="text-[#2563EB]" />
              <span className="text-xs text-gray-500">คืนสินค้าฟรี 15 วัน</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-sm p-5">
        <h2 className="font-semibold text-gray-700 text-base mb-4 pb-3 border-b border-gray-100">
          รายละเอียดสินค้า
        </h2>
        <p className="text-sm text-gray-600 leading-7">{product.description}</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-gray-400">หมวดหมู่: </span>
            <span className="text-gray-700">{product.category}</span>
          </div>
          <div>
            <span className="text-gray-400">ร้านค้า: </span>
            <span className="text-gray-700">{product.shopName}</span>
          </div>
          <div>
            <span className="text-gray-400">คะแนน: </span>
            <span className="text-gray-700">{product.rating}/5.0</span>
          </div>
          <div>
            <span className="text-gray-400">ขายแล้ว: </span>
            <span className="text-gray-700">{product.sold.toLocaleString("th-TH")} ชิ้น</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-white rounded-sm p-5">
          <h2 className="font-semibold text-gray-700 text-base mb-4">สินค้าที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
