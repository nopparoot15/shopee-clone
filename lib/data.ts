import { Product, Category } from "./types";

export const categories: Category[] = [
  { id: "landing", name: "Landing Page", icon: "🌐", color: "#2563EB" },
  { id: "company", name: "Company Profile", icon: "🏢", color: "#7C3AED" },
  { id: "portfolio", name: "Portfolio", icon: "👨‍💻", color: "#0891B2" },
  { id: "restaurant", name: "ร้านอาหาร", icon: "🍜", color: "#EA580C" },
  { id: "ecommerce", name: "ร้านค้าออนไลน์", icon: "🛍️", color: "#16A34A" },
  { id: "promote", name: "ประชาสัมพันธ์", icon: "📢", color: "#DC2626" },
  { id: "product", name: "แนะนำสินค้า", icon: "📦", color: "#D97706" },
  { id: "fullstack", name: "Full-Stack App", icon: "⚙️", color: "#475569" },
  { id: "seo", name: "SEO Package", icon: "🔍", color: "#059669" },
  { id: "consult", name: "ปรึกษาฟรี", icon: "💬", color: "#9333EA" },
];

export const banners = [
  {
    id: 1,
    title: "รับทำเว็บไซต์ครบวงจร",
    subtitle: "ตั้งแต่ออกแบบ UI จนถึง Deploy บน Production จริง",
    bg: "from-blue-600 to-blue-800",
    image: "https://picsum.photos/seed/web1/1200/400",
  },
  {
    id: 2,
    title: "Next.js + Tailwind CSS",
    subtitle: "เร็ว, SEO-friendly, Responsive ทุกหน้าจอ",
    bg: "from-indigo-600 to-purple-700",
    image: "https://picsum.photos/seed/web2/1200/400",
  },
  {
    id: 3,
    title: "ปรึกษาฟรีก่อนตกลงงาน",
    subtitle: "บอกความต้องการ เราแนะนำแนวทางและราคาให้ก่อนเลย",
    bg: "from-blue-500 to-cyan-600",
    image: "https://picsum.photos/seed/web3/1200/400",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Landing Page Starter — 1 หน้า Responsive + SEO + Deploy",
    price: 2500,
    originalPrice: 4500,
    discount: 44,
    image: "https://picsum.photos/seed/lp1/400/400",
    images: [
      "https://picsum.photos/seed/lp1/400/400",
      "https://picsum.photos/seed/lp1b/400/400",
    ],
    rating: 5.0,
    sold: 38,
    shopName: "Landing Page",
    location: "ส่งมอบ 5–7 วัน",
    category: "landing",
    stock: 999,
    deliveryDays: 7,
    description:
      "Landing Page 1 หน้า ออกแบบ UI ตามสไตล์ที่ต้องการ รองรับทุกหน้าจอ ทำด้วย Next.js + Tailwind CSS โหลดเร็ว SEO พื้นฐาน (Meta, OG Tag) Deploy บน Vercel ฟรี ส่ง Source Code ทั้งหมด",
    features: [
      "ออกแบบ UI ตามต้องการ",
      "Responsive ทุกหน้าจอ",
      "SEO Meta + OG Tag",
      "Deploy บน Vercel ฟรี",
      "ส่ง Source Code ครบ",
    ],
  },
  {
    id: 2,
    name: "Landing Page Pro — Multi-section + Animation + Form ติดต่อ",
    price: 4500,
    originalPrice: 7500,
    discount: 40,
    image: "https://picsum.photos/seed/lp2/400/400",
    images: [
      "https://picsum.photos/seed/lp2/400/400",
      "https://picsum.photos/seed/lp2b/400/400",
    ],
    rating: 5.0,
    sold: 24,
    shopName: "Landing Page",
    location: "ส่งมอบ 7–10 วัน",
    category: "landing",
    stock: 999,
    deliveryDays: 10,
    description:
      "Landing Page หลาย section มี Animation เลื่อน smooth, Form ติดต่อส่ง Email, Google Maps, SEO ครบ, Deploy พร้อมใช้งาน เหมาะสำหรับสินค้า / บริการ / โปรโมชัน",
    features: [
      "หลาย section + Scroll animation",
      "Form ติดต่อส่ง Email จริง",
      "Google Maps embed",
      "SEO + Sitemap",
      "Deploy + Domain setup",
    ],
  },
  {
    id: 3,
    name: "Company Profile Website — 5–8 หน้า ครบทุก Section",
    price: 7500,
    originalPrice: 12000,
    discount: 38,
    image: "https://picsum.photos/seed/cp1/400/400",
    images: [
      "https://picsum.photos/seed/cp1/400/400",
      "https://picsum.photos/seed/cp1b/400/400",
      "https://picsum.photos/seed/cp1c/400/400",
    ],
    rating: 4.9,
    sold: 17,
    shopName: "Company Profile",
    location: "ส่งมอบ 10–14 วัน",
    category: "company",
    stock: 999,
    deliveryDays: 14,
    description:
      "เว็บบริษัท / องค์กร ครบทุก section: หน้าหลัก, เกี่ยวกับเรา, บริการ, ผลงาน, ทีมงาน, ติดต่อ ออกแบบ Professional รองรับ SEO ระดับ On-page ส่งมอบพร้อม Deploy",
    features: [
      "5–8 หน้า ครบทุก section",
      "หน้า About / Services / Portfolio",
      "ฟอร์มติดต่อ + แผนที่",
      "SEO On-page + Sitemap",
      "ตั้งค่า Domain + DNS ให้",
    ],
  },
  {
    id: 4,
    name: "Portfolio Website — แสดงผลงาน + Blog + ติดต่อ",
    price: 3500,
    originalPrice: 6000,
    discount: 42,
    image: "https://picsum.photos/seed/pf1/400/400",
    images: [
      "https://picsum.photos/seed/pf1/400/400",
      "https://picsum.photos/seed/pf1b/400/400",
    ],
    rating: 4.9,
    sold: 31,
    shopName: "Portfolio",
    location: "ส่งมอบ 7–10 วัน",
    category: "portfolio",
    stock: 999,
    deliveryDays: 10,
    description:
      "Portfolio Website สำหรับ Freelancer / Developer / Designer แสดงผลงาน, Bio, ทักษะ, บทความ Blog, ช่องทางติดต่อ ออกแบบให้ดูเป็นมืออาชีพ เหมาะสำหรับหางานหรือรับงาน",
    features: [
      "หน้าแสดงผลงาน + Gallery",
      "หน้า About + Skills",
      "Blog / บทความ",
      "Contact form",
      "Deploy + Custom domain",
    ],
  },
  {
    id: 5,
    name: "เว็บร้านอาหาร — เมนู + Gallery + ที่อยู่ + ช่องทางสั่ง",
    price: 5500,
    originalPrice: 9000,
    discount: 39,
    image: "https://picsum.photos/seed/rest1/400/400",
    images: [
      "https://picsum.photos/seed/rest1/400/400",
      "https://picsum.photos/seed/rest1b/400/400",
    ],
    rating: 4.8,
    sold: 12,
    shopName: "ร้านอาหาร",
    location: "ส่งมอบ 7–10 วัน",
    category: "restaurant",
    stock: 999,
    deliveryDays: 10,
    description:
      "เว็บร้านอาหาร / คาเฟ่ แสดงเมนูพร้อมรูปและราคา, Gallery บรรยากาศ, แผนที่ Google Maps, เวลาเปิด-ปิด, ปุ่มสั่งผ่าน LINE / Grab / อื่น ๆ",
    features: [
      "หน้าเมนูพร้อมรูปและราคา",
      "Gallery บรรยากาศร้าน",
      "Google Maps + เวลาเปิด-ปิด",
      "ปุ่มสั่งผ่าน LINE / Grab",
      "Responsive มือถือ 100%",
    ],
  },
  {
    id: 6,
    name: "เว็บร้านค้าออนไลน์ — แสดงสินค้า + ตะกร้า + ช่องทางชำระ",
    price: 8500,
    originalPrice: 15000,
    discount: 43,
    image: "https://picsum.photos/seed/shop1/400/400",
    images: [
      "https://picsum.photos/seed/shop1/400/400",
      "https://picsum.photos/seed/shop1b/400/400",
    ],
    rating: 4.9,
    sold: 8,
    shopName: "ร้านค้าออนไลน์",
    location: "ส่งมอบ 14–21 วัน",
    category: "ecommerce",
    stock: 999,
    deliveryDays: 21,
    description:
      "เว็บร้านค้าออนไลน์แสดงสินค้า, ระบบตะกร้า, ช่องทางชำระเงิน (QR / โอนเงิน), ระบบ Order management พื้นฐาน เหมาะสำหรับร้านค้าที่ต้องการ Digital presence",
    features: [
      "หน้าสินค้า + ตะกร้า",
      "ช่องทางชำระ QR/โอน",
      "ระบบ Order basic",
      "Admin จัดการสินค้า",
      "Deploy พร้อมใช้งาน",
    ],
  },
  {
    id: 7,
    name: "เว็บประชาสัมพันธ์องค์กร — ข่าวสาร + กิจกรรม + Gallery",
    price: 6500,
    originalPrice: 10000,
    discount: 35,
    image: "https://picsum.photos/seed/org1/400/400",
    images: [
      "https://picsum.photos/seed/org1/400/400",
      "https://picsum.photos/seed/org1b/400/400",
    ],
    rating: 4.8,
    sold: 9,
    shopName: "ประชาสัมพันธ์",
    location: "ส่งมอบ 10–14 วัน",
    category: "promote",
    stock: 999,
    deliveryDays: 14,
    description:
      "เว็บไซต์สำหรับองค์กร หน่วยงาน หรือชมรม แสดงข่าวสาร, กิจกรรม, รูปภาพ Gallery, สมาชิกทีมงาน, ประวัติองค์กร, ดาวน์โหลดเอกสาร",
    features: [
      "หน้าข่าวสาร + กิจกรรม",
      "Gallery รูปภาพ",
      "หน้าทีมงาน",
      "ดาวน์โหลดเอกสาร",
      "SEO + Deploy ครบ",
    ],
  },
  {
    id: 8,
    name: "เว็บแนะนำสินค้า — Product Showcase + Features + CTA",
    price: 4000,
    originalPrice: 7000,
    discount: 43,
    image: "https://picsum.photos/seed/prod1/400/400",
    images: [
      "https://picsum.photos/seed/prod1/400/400",
      "https://picsum.photos/seed/prod1b/400/400",
    ],
    rating: 4.9,
    sold: 20,
    shopName: "แนะนำสินค้า",
    location: "ส่งมอบ 7–10 วัน",
    category: "product",
    stock: 999,
    deliveryDays: 10,
    description:
      "เว็บนำเสนอสินค้า 1 ตัวหรือหลายตัว แสดง Features, Specs, รูปภาพ Gallery, Testimonials, Call-to-Action ชัดเจน เหมาะสำหรับสินค้า Dropship หรือแบรนด์ใหม่",
    features: [
      "Product showcase + Gallery",
      "Features / Specs section",
      "Testimonials / Reviews",
      "CTA + ช่องทางสั่ง",
      "SEO + Deploy ฟรี",
    ],
  },
  {
    id: 9,
    name: "Full-Stack Web Application — Frontend + Backend + Database",
    price: 25000,
    originalPrice: 40000,
    discount: 38,
    image: "https://picsum.photos/seed/fs1/400/400",
    images: [
      "https://picsum.photos/seed/fs1/400/400",
      "https://picsum.photos/seed/fs1b/400/400",
    ],
    rating: 5.0,
    sold: 5,
    shopName: "Full-Stack App",
    location: "ส่งมอบ 21–30 วัน",
    category: "fullstack",
    stock: 999,
    deliveryDays: 30,
    description:
      "ระบบ Web Application ครบวงจร Next.js Frontend + Node.js/Express Backend + MySQL/PostgreSQL Database, Authentication, Admin Dashboard, Deploy บน VPS / Cloud ประสบการณ์จากโครงการระดับองค์กรจริง",
    features: [
      "Next.js + Node.js + Express",
      "MySQL / PostgreSQL",
      "Authentication ระบบ Login",
      "Admin Dashboard",
      "Deploy บน VPS / DigitalOcean",
    ],
  },
  {
    id: 10,
    name: "E-commerce ครบวงจร — ร้านออนไลน์ + Payment + Order System",
    price: 15000,
    originalPrice: 25000,
    discount: 40,
    image: "https://picsum.photos/seed/ec1/400/400",
    images: [
      "https://picsum.photos/seed/ec1/400/400",
      "https://picsum.photos/seed/ec1b/400/400",
      "https://picsum.photos/seed/ec1c/400/400",
    ],
    rating: 4.9,
    sold: 6,
    shopName: "ร้านค้าออนไลน์",
    location: "ส่งมอบ 21–30 วัน",
    category: "ecommerce",
    stock: 999,
    deliveryDays: 30,
    description:
      "ร้านออนไลน์เต็มรูปแบบ Next.js + Backend API + Database ระบบสินค้า, ตะกร้า, ชำระเงิน (QR / PromptPay / บัตรเครดิต), จัดการ Order, Shipping status, Admin panel",
    features: [
      "ระบบสินค้า + ตะกร้าเต็มรูปแบบ",
      "Payment QR / PromptPay / บัตร",
      "Order management + Tracking",
      "Admin panel จัดการทุกอย่าง",
      "Deploy Production-ready",
    ],
  },
  {
    id: 11,
    name: "SEO Package — On-page Optimization + Meta + Sitemap รายเดือน",
    price: 1500,
    originalPrice: 3000,
    discount: 50,
    image: "https://picsum.photos/seed/seo1/400/400",
    images: [
      "https://picsum.photos/seed/seo1/400/400",
    ],
    rating: 4.8,
    sold: 22,
    shopName: "SEO Package",
    location: "ต่อเนื่องรายเดือน",
    category: "seo",
    stock: 999,
    deliveryDays: 30,
    description:
      "บริการ SEO On-page รายเดือน ปรับ Meta Tag, Title, Description, OG Tag, Sitemap, Robot.txt, ปรับ Page Speed, Schema Markup ช่วยให้ Google ค้นหาเว็บเจอและ Ranking ดีขึ้น",
    features: [
      "Meta Tag + OG Tag optimization",
      "Sitemap + Robot.txt",
      "Page Speed optimization",
      "Schema Markup",
      "รายงานผลทุกเดือน",
    ],
  },
  {
    id: 12,
    name: "เว็บ + ระบบ Backend API — REST API + Database + Dashboard",
    price: 18000,
    originalPrice: 28000,
    discount: 36,
    image: "https://picsum.photos/seed/api1/400/400",
    images: [
      "https://picsum.photos/seed/api1/400/400",
      "https://picsum.photos/seed/api1b/400/400",
    ],
    rating: 5.0,
    sold: 7,
    shopName: "Full-Stack App",
    location: "ส่งมอบ 14–21 วัน",
    category: "fullstack",
    stock: 999,
    deliveryDays: 21,
    description:
      "เว็บไซต์พร้อม Backend API Node.js/Express, Database MySQL/PostgreSQL, Dashboard จัดการข้อมูล, Deploy บน VPS พร้อม Docker, Nginx, SSL ประสบการณ์ Infrastructure จากโครงการองค์กรจริง",
    features: [
      "REST API Node.js/Express",
      "MySQL / PostgreSQL",
      "Admin Dashboard",
      "Docker + Nginx + SSL",
      "Deploy VPS พร้อมใช้งาน",
    ],
  },
];

export const flashDeals = products.filter((p) => p.discount >= 40).slice(0, 8);

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("th-TH");
}

export function formatSold(sold: number): string {
  if (sold >= 1000) return `${(sold / 1000).toFixed(1)}k`;
  return sold.toString();
}
