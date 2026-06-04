import { getProductById, products, formatPrice, formatSold } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { Star, Clock, Shield, Code2, Rocket, CheckCircle, ChevronRight } from "lucide-react";
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

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 >= 0.5;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-[#2563EB]">หน้าหลัก</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-[#2563EB]">บริการ</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 truncate max-w-xs">{product.name.split("—")[0].trim()}</span>
      </div>

      {/* Main */}
      <div className="bg-white rounded-sm p-5 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium text-gray-800 leading-snug">{product.name}</h1>

          {/* Rating + projects */}
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
            <span className="text-gray-500">{formatSold(product.sold)} โปรเจค</span>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={13} />
              <span>{product.location}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-[#EFF6FF] rounded px-4 py-4 flex items-end gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">ราคาเริ่มต้น</p>
              <span className="text-[#2563EB] text-3xl font-light">฿{formatPrice(product.price)}</span>
            </div>
            <span className="text-gray-400 text-lg line-through mb-0.5">฿{formatPrice(product.originalPrice)}</span>
            <span className="bg-[#2563EB] text-white text-xs px-2 py-0.5 rounded mb-1">-{product.discount}%</span>
          </div>

          {/* Features included */}
          {product.features && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">สิ่งที่ได้รับ</p>
              <ul className="space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-[#2563EB] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AddToCartButton product={product} />

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Code2 size={20} className="text-[#2563EB]" />
              <span className="text-xs text-gray-500">ส่ง Source Code ครบ</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Rocket size={20} className="text-[#2563EB]" />
              <span className="text-xs text-gray-500">Deploy พร้อมใช้งาน</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Shield size={20} className="text-[#2563EB]" />
              <span className="text-xs text-gray-500">ปรึกษาฟรีก่อนจ้าง</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-sm p-5">
        <h2 className="font-semibold text-gray-700 text-base mb-4 pb-3 border-b border-gray-100">
          รายละเอียดบริการ
        </h2>
        <p className="text-sm text-gray-600 leading-7">{product.description}</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-gray-400">ประเภท: </span>
            <span className="text-gray-700">{product.shopName}</span>
          </div>
          <div>
            <span className="text-gray-400">ระยะเวลา: </span>
            <span className="text-gray-700">{product.location}</span>
          </div>
          <div>
            <span className="text-gray-400">คะแนน: </span>
            <span className="text-gray-700">{product.rating}/5.0</span>
          </div>
          <div>
            <span className="text-gray-400">โปรเจคที่ทำ: </span>
            <span className="text-gray-700">{product.sold} โปรเจค</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-white rounded-sm p-5">
          <h2 className="font-semibold text-gray-700 text-base mb-4">บริการที่เกี่ยวข้อง</h2>
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
