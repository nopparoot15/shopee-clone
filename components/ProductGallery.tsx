"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-100 rounded overflow-hidden group">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
          priority
        />
        <div className="absolute top-2 right-2 bg-black/30 text-white rounded p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-zoom-in">
          <ZoomIn size={16} />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                i === active ? "border-[#EE4D2D]" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
