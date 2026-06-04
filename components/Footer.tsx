import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">เกี่ยวกับ Market</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-[#EE4D2D]">เกี่ยวกับเรา</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">ร่วมงานกับเรา</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">นโยบายความเป็นส่วนตัว</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">ข้อกำหนดการให้บริการ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">ช่วยเหลือ</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-[#EE4D2D]">ศูนย์ช่วยเหลือ</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">วิธีการซื้อ</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">การชำระเงิน</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">การจัดส่ง</Link></li>
              <li><Link href="#" className="hover:text-[#EE4D2D]">การคืนสินค้า</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">ชำระเงิน</h3>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "SCB", "KBank", "PromptPay", "True Money"].map((p) => (
                <span key={p} className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-500">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">จัดส่งโดย</h3>
            <div className="flex flex-wrap gap-2">
              {["Kerry", "Flash", "J&T", "Thailand Post", "DHL"].map((p) => (
                <span key={p} className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-500">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">ดาวน์โหลด App</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded hover:border-[#EE4D2D] cursor-pointer transition-colors">
                <span className="text-lg">📱</span>
                <div>
                  <p className="text-xs text-gray-400">ดาวน์โหลดจาก</p>
                  <p className="text-xs font-medium text-gray-700">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded hover:border-[#EE4D2D] cursor-pointer transition-colors">
                <span className="text-lg">🤖</span>
                <div>
                  <p className="text-xs text-gray-400">ดาวน์โหลดจาก</p>
                  <p className="text-xs font-medium text-gray-700">Google Play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © 2025 Market. All rights reserved. | ผู้ประกอบการที่ได้รับการรับรอง ETDA
      </div>
    </footer>
  );
}
