"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, formatPrice } from "@/lib/data";
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";

const mockCartItems = [
  { product: products[0], quantity: 2, selected: true },
  { product: products[1], quantity: 1, selected: true },
  { product: products[6], quantity: 1, selected: false },
];

export default function CartPage() {
  const [items, setItems] = useState(mockCartItems);

  const toggleSelect = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = () => {
    const allSelected = items.every((i) => i.selected);
    setItems((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const selectedItems = items.filter((i) => i.selected);
  const total = selectedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const savings = selectedItems.reduce(
    (sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#EE4D2D]">หน้าหลัก</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700">ตะกร้าสินค้า</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-sm py-20 text-center text-gray-400">
          <ShoppingBag size={56} className="mx-auto mb-4 text-gray-200" />
          <p className="text-lg mb-2">ตะกร้าสินค้าว่างเปล่า</p>
          <p className="text-sm mb-6">เพิ่มสินค้าที่ชอบลงในตะกร้า</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-[#EE4D2D] text-white rounded text-sm hover:bg-[#D73211] transition-colors"
          >
            ช้อปเลย
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Items */}
          <div className="flex-1 space-y-3 w-full">
            {/* Header */}
            <div className="bg-white rounded-sm px-4 py-3 hidden md:grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm text-gray-500">
              <input
                type="checkbox"
                checked={items.every((i) => i.selected)}
                onChange={toggleAll}
                className="w-4 h-4 accent-[#EE4D2D]"
              />
              <span>สินค้า</span>
              <span className="text-center">ราคา</span>
              <span className="text-center">จำนวน</span>
              <span className="text-center">รวม</span>
              <span className="text-center">ลบ</span>
            </div>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-sm px-4 py-4 grid grid-cols-[auto_1fr] md:grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 items-center"
              >
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelect(item.product.id)}
                  className="w-4 h-4 accent-[#EE4D2D]"
                />

                {/* Product info */}
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="text-sm text-gray-700 hover:text-[#EE4D2D] line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">{item.product.shopName}</p>
                    {/* Mobile price */}
                    <p className="text-[#EE4D2D] font-medium mt-2 md:hidden">
                      ฿{formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden md:block text-center">
                  <p className="text-[#EE4D2D] text-sm">฿{formatPrice(item.product.price)}</p>
                  <p className="text-gray-300 text-xs line-through">฿{formatPrice(item.product.originalPrice)}</p>
                </div>

                {/* Qty */}
                <div className="flex items-center justify-center border border-gray-200 rounded w-fit mx-auto">
                  <button
                    onClick={() => updateQty(item.product.id, -1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm border-x border-gray-200 h-8 flex items-center justify-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.product.id, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 disabled:opacity-30"
                    disabled={item.quantity >= item.product.stock}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Total */}
                <div className="hidden md:block text-center text-[#EE4D2D] font-medium text-sm">
                  ฿{formatPrice(item.product.price * item.quantity)}
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors mx-auto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80 shrink-0 sticky top-28">
            <div className="bg-white rounded-sm p-5 space-y-4">
              <h2 className="font-semibold text-gray-700">สรุปคำสั่งซื้อ</h2>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>สินค้า ({selectedItems.reduce((s, i) => s + i.quantity, 0)} ชิ้น)</span>
                  <span>฿{formatPrice(total + savings)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>ส่วนลดรวม</span>
                  <span>-฿{formatPrice(savings)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>ค่าจัดส่ง</span>
                  <span>ฟรี</span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-semibold text-base">
                  <span>ยอดรวม</span>
                  <span className="text-[#EE4D2D]">฿{formatPrice(total)}</span>
                </div>
              </div>

              {savings > 0 && (
                <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded">
                  ประหยัดไปทั้งหมด ฿{formatPrice(savings)}
                </div>
              )}

              <button
                className={`w-full py-3 rounded text-white font-medium text-sm transition-colors ${
                  selectedItems.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#EE4D2D] hover:bg-[#D73211]"
                }`}
                disabled={selectedItems.length === 0}
              >
                ชำระเงิน ({selectedItems.length} รายการ)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
