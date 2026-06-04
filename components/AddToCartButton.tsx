"use client";

import { useState } from "react";
import { MessageSquare, Heart, CheckCircle } from "lucide-react";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [contacted, setContacted] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleContact = () => {
    setContacted(true);
    setTimeout(() => setContacted(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Delivery info */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="w-24 shrink-0">ระยะเวลา</span>
        <span className="text-gray-700">{product.location}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleContact}
          className={`flex items-center gap-2 px-6 py-3 rounded border text-sm font-medium transition-all ${
            contacted
              ? "border-green-500 text-green-600 bg-green-50"
              : "border-[#2563EB] text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE]"
          }`}
        >
          {contacted ? <CheckCircle size={16} /> : <MessageSquare size={16} />}
          {contacted ? "ส่งแล้ว กรุณารอการติดต่อ" : "สอบถามรายละเอียด"}
        </button>
        <button className="flex-1 md:flex-none px-8 py-3 bg-[#2563EB] text-white rounded text-sm font-medium hover:bg-[#1D4ED8] transition-colors">
          จ้างงานเลย
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          className={`p-3 rounded border transition-colors ${
            saved ? "border-red-300 text-red-500 bg-red-50" : "border-gray-200 text-gray-400 hover:border-gray-300"
          }`}
          title="บันทึก"
        >
          <Heart size={18} className={saved ? "fill-red-500" : ""} />
        </button>
      </div>

      <p className="text-xs text-gray-400">
        💬 ทักมาปรึกษาฟรีก่อนได้เลย — แนะนำแนวทางและราคาทั้งหมดก่อนตกลงงาน
      </p>
    </div>
  );
}
