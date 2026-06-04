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
                <div className="px-3 py-2 border border-gray-200 rounded hover:border-[#2563EB] cursor-pointer transition-colors">
                  <p className="text-xs text-gray-400">ช่องทางหลัก</p>
                  <p className="text-xs font-medium text-gray-700">LINE Official</p>
                </div>
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
        © 2025 WebPro — รับทำเว็บไซต์ครบวงจร | ส่งมอบงานพร้อมใช้งานจริง
      </div>
    </footer>
  );
}
