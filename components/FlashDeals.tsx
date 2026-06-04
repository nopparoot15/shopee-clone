"use client";

import { useState, useEffect } from "react";
import { Tag, ChevronRight } from "lucide-react";
import { flashDeals } from "@/lib/data";
import ProductCard from "./ProductCard";
import Link from "next/link";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white rounded-sm overflow-hidden">
      <div className="bg-[#2563EB] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Tag size={18} className="text-white fill-white" />
            <h2 className="text-white font-bold text-base tracking-wide">แพ็กเกจโปรพิเศษ</h2>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-white/20 text-white text-sm font-mono font-bold px-1.5 py-0.5 rounded">
              {pad(timeLeft.h)}
            </div>
            <span className="text-white font-bold text-sm">:</span>
            <div className="bg-white/20 text-white text-sm font-mono font-bold px-1.5 py-0.5 rounded">
              {pad(timeLeft.m)}
            </div>
            <span className="text-white font-bold text-sm">:</span>
            <div className="bg-white/20 text-white text-sm font-mono font-bold px-1.5 py-0.5 rounded">
              {pad(timeLeft.s)}
            </div>
          </div>
        </div>
        <Link href="/products" className="flex items-center gap-1 text-sm text-white/90 hover:text-white">
          ดูทั้งหมด <ChevronRight size={16} />
        </Link>
      </div>
      <div className="p-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {flashDeals.map((product) => (
            <ProductCard key={product.id} product={product} variant="flash" />
          ))}
        </div>
      </div>
    </section>
  );
}
