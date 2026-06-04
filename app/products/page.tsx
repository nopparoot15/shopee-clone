import { products, categories, formatPrice } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface SearchParams {
  q?: string;
  cat?: string;
  sort?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { q, cat, sort } = params;

  let filtered = [...products];

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.shopName.toLowerCase().includes(lower)
    );
  }

  if (cat) {
    filtered = filtered.filter(
      (p) => p.category === cat || p.category.includes(cat)
    );
  }

  if (sort === "price_asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "popular") filtered.sort((a, b) => b.sold - a.sold);
  else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const activeCategory = categories.find((c) => c.id === cat);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#2563EB]">หน้าหลัก</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700">{q ? `"${q}"` : activeCategory?.name ?? "บริการทั้งหมด"}</span>
      </div>

      <div className="flex gap-4">
        {/* Sidebar filter */}
        <aside className="hidden md:block w-48 shrink-0 space-y-4">
          <div className="bg-white rounded-sm p-3">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">หมวดหมู่</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/products"
                  className={`block text-sm py-1 px-2 rounded hover:text-[#2563EB] ${!cat ? "text-[#2563EB] font-medium" : "text-gray-600"}`}
                >
                  ทั้งหมด
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/products?cat=${c.id}`}
                    className={`flex items-center gap-2 text-sm py-1 px-2 rounded hover:text-[#2563EB] ${cat === c.id ? "text-[#2563EB] font-medium" : "text-gray-600"}`}
                  >
                    <span>{c.icon}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-sm p-3">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">ช่วงราคา</h3>
            <div className="space-y-2">
              {[
                { label: "ต่ำกว่า ฿500", href: "/products" },
                { label: "฿500 – ฿1,000", href: "/products" },
                { label: "฿1,000 – ฿3,000", href: "/products" },
                { label: "มากกว่า ฿3,000", href: "/products" },
              ].map((r) => (
                <Link key={r.label} href={r.href} className="block text-sm text-gray-600 py-1 px-2 rounded hover:text-[#2563EB]">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="bg-[#FAFAFA] border border-gray-100 rounded-sm px-4 py-3 flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <SlidersHorizontal size={14} />
              <span>เรียงตาม</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "ความเกี่ยวข้อง", value: "" },
                { label: "ขายดีที่สุด", value: "popular" },
                { label: "คะแนนสูงสุด", value: "rating" },
                { label: "ราคาต่ำสุด", value: "price_asc" },
                { label: "ราคาสูงสุด", value: "price_desc" },
              ].map((option) => {
                const currentSort = sort ?? "";
                const isActive = currentSort === option.value;
                const href = `?${new URLSearchParams({ ...(q ? { q } : {}), ...(cat ? { cat } : {}), ...(option.value ? { sort: option.value } : {}) }).toString()}`;
                return (
                  <Link
                    key={option.value}
                    href={href}
                    className={`px-3 py-1.5 text-sm rounded transition-colors ${
                      isActive
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
            <span className="ml-auto text-sm text-gray-400">{filtered.length} สินค้า</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-lg">ไม่พบบริการที่ค้นหา</p>
              <Link href="/products" className="mt-4 inline-block text-[#2563EB] hover:underline text-sm">
                ดูบริการทั้งหมด
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
