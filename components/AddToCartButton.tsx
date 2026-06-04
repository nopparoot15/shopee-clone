"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-20">จำนวน</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-30"
            disabled={qty <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="w-12 text-center text-sm border-x border-gray-300 h-9 flex items-center justify-center">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-30"
            disabled={qty >= product.stock}
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-sm text-gray-400">{product.stock} ชิ้นที่มีอยู่</span>
      </div>

      {/* Total */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="w-20">รวม</span>
        <span className="text-[#EE4D2D] text-lg font-medium">฿{formatPrice(product.price * qty)}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-2 px-6 py-3 rounded border text-sm font-medium transition-all ${
            added
              ? "border-green-500 text-green-600 bg-green-50"
              : "border-[#EE4D2D] text-[#EE4D2D] bg-[#FFF5F5] hover:bg-[#FFEEE9]"
          }`}
        >
          <ShoppingCart size={16} />
          {added ? "เพิ่มแล้ว ✓" : "เพิ่มลงตะกร้า"}
        </button>
        <button className="flex-1 md:flex-none px-8 py-3 bg-[#EE4D2D] text-white rounded text-sm font-medium hover:bg-[#D73211] transition-colors">
          ซื้อเลย
        </button>
        <button
          onClick={() => setWished((w) => !w)}
          className={`p-3 rounded border transition-colors ${
            wished ? "border-red-300 text-red-500 bg-red-50" : "border-gray-200 text-gray-400 hover:border-gray-300"
          }`}
        >
          <Heart size={18} className={wished ? "fill-red-500" : ""} />
        </button>
      </div>
    </div>
  );
}
