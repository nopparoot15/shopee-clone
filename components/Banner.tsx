"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/lib/data";

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <div className="relative overflow-hidden rounded-sm aspect-[3/1] bg-gray-200 group">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center px-10">
            <h2 className="text-white font-bold text-3xl md:text-4xl drop-shadow">{banner.title}</h2>
            <p className="text-white/90 text-base md:text-lg mt-2 drop-shadow">{banner.subtitle}</p>
            <button className="mt-4 w-fit px-6 py-2 bg-[#EE4D2D] text-white text-sm font-medium rounded hover:bg-[#D73211] transition-colors">
              ช้อปเลย
            </button>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
