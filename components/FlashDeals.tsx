"use client";

import { useState, useEffect } from "react";
import { Zap, ChevronRight } from "lucide-react";
import { flashDeals } from "@/lib/data";
import ProductCard from "./ProductCard";
import Link from "next/link";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 5, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white rounded-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Zap size={20} className="text-[#EE4D2D] fill-[#EE4D2D]" />
            <h2 className="text-[#EE4D2D] font-bold text-lg uppercase tracking-wide">Flash Sale</h2>
          </div>
          {/* Countdown */}
          <div className="flex items-center gap-1">
            <div className="bg-[#222] text-white text-sm font-mono font-bold px-1.5 py-0.5 rounded">
              {pad(timeLeft.h)}
            </div>
            <span className="text-gray-600 font-bold text-sm">:</span>
            <div className="bg-[#222] text-white text-sm font-mono font-bold px-1.5 py-0.5 rounded">
              {pad(timeLeft.m)}
            </div>
            <span className="text-gray-600 font-bold text-sm">:</span>
            <div className="bg-[#222] text-white text-sm font-mono font-bold px-1.5 py-0.5 rounded">
              {pad(timeLeft.s)}
            </div>
          </div>
        </div>
        <Link href="/products" className="flex items-center gap-1 text-sm text-[#EE4D2D] hover:opacity-80">
          ดูทั้งหมด <ChevronRight size={16} />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {flashDeals.map((product) => (
          <ProductCard key={product.id} product={product} variant="flash" />
        ))}
      </div>
    </section>
  );
}
