import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={20} className="text-[#2563EB]" />
              <span className="font-bold text-gray-800 text-base">WebPro</span>
            </div>
            <p className="text-gray-500 text-xs leading-5 mb-3">
              รับทำเว็บไซต์ครบวงจร ตั้งแต่ออกแบบ UI<br />
              ไปจนถึง Deploy บน Production จริง<br />
              มีประสบการณ์จากโครงการระดับองค์กร
            </p>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded">Next.js</span>
              <span className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded">React</span>
              <span className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded">Node.js</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">บริการ</h3>
            <ul className="space-y-2">
              <li><Link href="/products?cat=landing" className="hover:text-[#2563EB]">Landing Page</Link></li>
              <li><Link href="/products?cat=company" className="hover:text-[#2563EB]">Company Profile</Link></li>
              <li><Link href="/products?cat=ecommerce" className="hover:text-[#2563EB]">ร้านค้าออนไลน์</Link></li>
              <li><Link href="/products?cat=fullstack" className="hover:text-[#2563EB]">Full-Stack App</Link></li>
              <li><Link href="/products?cat=seo" className="hover:text-[#2563EB]">SEO Package</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Tech Stack</h3>
            <ul className="space-y-2">
              {["React / Next.js", "Tailwind CSS", "Node.js / Express", "MySQL / PostgreSQL", "Docker / Linux VPS", "Cloudflare / Vercel"].map((t) => (
                <li key={t} className="text-gray-500">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">ติดต่อ</h3>
            <div className="space-y-2 text-xs text-gray-500">
              <p>💬 ทักมาปรึกษาฟรีก่อนได้เลย</p>
              <p>📌 บอกความต้องการ เราแนะนำแนวทางและราคาให้ก่อนตกลงงาน</p>
              <div className="mt-3 space-y-2">
                <a
                  href="https://line.me/ti/p/xxbdszUQPO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded hover:border-[#06C755] cursor-pointer transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-[#06C755]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400">ช่องทางหลัก</p>
                    <p className="text-xs font-medium text-gray-700 group-hover:text-[#06C755] transition-colors">LINE Official</p>
                  </div>
                </a>
                <div className="px-3 py-2 border border-gray-200 rounded hover:border-[#2563EB] cursor-pointer transition-colors">
                  <p className="text-xs text-gray-400">ติดตามผลงาน</p>
                  <p className="text-xs font-medium text-gray-700">GitHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © 2026 WebPro — รับทำเว็บไซต์ครบวงจร | ส่งมอบงานพร้อมใช้งานจริง
      </div>
    </footer>
  );
}
