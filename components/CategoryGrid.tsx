import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="bg-white rounded-sm p-4">
      <h2 className="text-gray-700 font-medium text-sm mb-3 uppercase tracking-wide">ประเภทบริการ</h2>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?cat=${cat.id}`}
            className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-blue-50 transition-colors group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${cat.color}18` }}
            >
              {cat.icon}
            </div>
            <span className="text-xs text-gray-600 group-hover:text-[#2563EB] text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
