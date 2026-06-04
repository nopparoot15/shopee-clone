import { Product, Category } from "./types";

export const categories: Category[] = [
  { id: "fashion", name: "แฟชั่น", icon: "👗", color: "#FF6B9D" },
  { id: "electronics", name: "อิเล็กทรอนิกส์", icon: "📱", color: "#4A90D9" },
  { id: "home", name: "บ้าน & ชีวิต", icon: "🏠", color: "#50C878" },
  { id: "beauty", name: "ความงาม", icon: "💄", color: "#FF8C94" },
  { id: "sports", name: "กีฬา", icon: "⚽", color: "#FFA500" },
  { id: "food", name: "อาหาร", icon: "🍜", color: "#FF6347" },
  { id: "books", name: "หนังสือ", icon: "📚", color: "#8B4513" },
  { id: "toys", name: "ของเล่น", icon: "🧸", color: "#9B59B6" },
  { id: "auto", name: "ยานยนต์", icon: "🚗", color: "#3498DB" },
  { id: "pets", name: "สัตว์เลี้ยง", icon: "🐾", color: "#E67E22" },
];

export const banners = [
  {
    id: 1,
    title: "ลดสูงสุด 90%",
    subtitle: "Flash Sale ทุกวัน เที่ยงคืน",
    bg: "from-orange-500 to-red-600",
    image: "https://picsum.photos/seed/shopee1/1200/400",
  },
  {
    id: 2,
    title: "สินค้าใหม่มาแล้ว",
    subtitle: "แฟชั่น Summer 2025",
    bg: "from-pink-500 to-orange-400",
    image: "https://picsum.photos/seed/shopee2/1200/400",
  },
  {
    id: 3,
    title: "ส่งฟรีทั่วไทย",
    subtitle: "ไม่มีขั้นต่ำ เฉพาะวันนี้",
    bg: "from-green-500 to-teal-600",
    image: "https://picsum.photos/seed/shopee3/1200/400",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "เสื้อยืด Oversize ผ้า Cotton 100% ลายเรขาคณิต",
    price: 189,
    originalPrice: 450,
    discount: 58,
    image: "https://picsum.photos/seed/p1/400/400",
    images: [
      "https://picsum.photos/seed/p1/400/400",
      "https://picsum.photos/seed/p1b/400/400",
      "https://picsum.photos/seed/p1c/400/400",
    ],
    rating: 4.8,
    sold: 12500,
    shopName: "Trendy Closet TH",
    location: "กรุงเทพมหานคร",
    category: "fashion",
    stock: 99,
    description:
      "เสื้อยืด Oversize คุณภาพสูง ผ้า Cotton 100% นุ่มสบาย ระบายอากาศดี เหมาะกับทุกโอกาส",
  },
  {
    id: 2,
    name: "หูฟังไร้สาย Bluetooth 5.3 ตัดเสียงรบกวน ANC",
    price: 899,
    originalPrice: 2990,
    discount: 70,
    image: "https://picsum.photos/seed/p2/400/400",
    images: [
      "https://picsum.photos/seed/p2/400/400",
      "https://picsum.photos/seed/p2b/400/400",
    ],
    rating: 4.7,
    sold: 8900,
    shopName: "TechHub Official",
    location: "เชียงใหม่",
    category: "electronics",
    stock: 50,
    description:
      "หูฟังไร้สายคุณภาพสูง เทคโนโลยี ANC ตัดเสียงรบกวนได้ถึง 40dB แบตเตอรี่ 30 ชั่วโมง",
  },
  {
    id: 3,
    name: "กระเป๋าหิ้ว Canvas ผู้หญิง ทรง Tote สีพาสเทล",
    price: 299,
    originalPrice: 699,
    discount: 57,
    image: "https://picsum.photos/seed/p3/400/400",
    images: [
      "https://picsum.photos/seed/p3/400/400",
      "https://picsum.photos/seed/p3b/400/400",
    ],
    rating: 4.9,
    sold: 23400,
    shopName: "Bag Studio",
    location: "กรุงเทพมหานคร",
    category: "fashion",
    stock: 200,
    description:
      "กระเป๋า Canvas น้ำหนักเบา จุสิ่งของได้เยอะ มีซิปด้านใน รับน้ำหนักได้ดี",
  },
  {
    id: 4,
    name: "สกินแคร์เซต Vitamin C Serum + Moisturizer ขนาด 30ml",
    price: 449,
    originalPrice: 990,
    discount: 55,
    image: "https://picsum.photos/seed/p4/400/400",
    images: [
      "https://picsum.photos/seed/p4/400/400",
      "https://picsum.photos/seed/p4b/400/400",
    ],
    rating: 4.8,
    sold: 15600,
    shopName: "Glow Lab Beauty",
    location: "กรุงเทพมหานคร",
    category: "beauty",
    stock: 150,
    description:
      "เซตดูแลผิวหน้าสูตรเข้มข้น Vitamin C 20% ช่วยลดริ้วรอย เพิ่มความกระจ่างใสให้ผิว",
  },
  {
    id: 5,
    name: "รองเท้าวิ่ง Lightweight Mesh สีขาว-ดำ",
    price: 790,
    originalPrice: 1890,
    discount: 58,
    image: "https://picsum.photos/seed/p5/400/400",
    images: [
      "https://picsum.photos/seed/p5/400/400",
      "https://picsum.photos/seed/p5b/400/400",
    ],
    rating: 4.6,
    sold: 5600,
    shopName: "Sport Zone TH",
    location: "นนทบุรี",
    category: "sports",
    stock: 80,
    description: "รองเท้าวิ่ง น้ำหนักเบา ระบายอากาศดี เหมาะสำหรับการวิ่งทุกระยะ",
  },
  {
    id: 6,
    name: "โคมไฟตั้งโต๊ะ LED ปรับแสงได้ 3 ระดับ USB Charging",
    price: 349,
    originalPrice: 790,
    discount: 56,
    image: "https://picsum.photos/seed/p6/400/400",
    images: [
      "https://picsum.photos/seed/p6/400/400",
      "https://picsum.photos/seed/p6b/400/400",
    ],
    rating: 4.7,
    sold: 9800,
    shopName: "Home Decor TH",
    location: "กรุงเทพมหานคร",
    category: "home",
    stock: 120,
    description:
      "โคมไฟ LED ประหยัดพลังงาน ปรับความสว่างได้ 3 ระดับ มีพอร์ต USB ชาร์จอุปกรณ์",
  },
  {
    id: 7,
    name: "กาแฟ Specialty เมล็ดอาราบิก้า 100% คั่วกลาง 250g",
    price: 280,
    originalPrice: 450,
    discount: 38,
    image: "https://picsum.photos/seed/p7/400/400",
    images: [
      "https://picsum.photos/seed/p7/400/400",
      "https://picsum.photos/seed/p7b/400/400",
    ],
    rating: 4.9,
    sold: 34200,
    shopName: "Roast Republic",
    location: "เชียงใหม่",
    category: "food",
    stock: 500,
    description:
      "กาแฟ Specialty Grade เมล็ดอาราบิก้าคัดสรร คั่วกลาง มีกลิ่นหอมผลไม้ ความเป็นกรดสมดุล",
  },
  {
    id: 8,
    name: "นาฬิกาสมาร์ทวอทช์ Sport Health Monitor กันน้ำ IP68",
    price: 1290,
    originalPrice: 3490,
    discount: 63,
    image: "https://picsum.photos/seed/p8/400/400",
    images: [
      "https://picsum.photos/seed/p8/400/400",
      "https://picsum.photos/seed/p8b/400/400",
    ],
    rating: 4.5,
    sold: 7800,
    shopName: "Smart Gadget",
    location: "กรุงเทพมหานคร",
    category: "electronics",
    stock: 60,
    description:
      "สมาร์ทวอทช์ติดตามสุขภาพ วัดชีพจร ออกซิเจนในเลือด GPS กันน้ำได้ลึก 50 เมตร",
  },
  {
    id: 9,
    name: "หมอนข้าง Memory Foam ปรับรูปทรงได้ ผ้าปก Bamboo",
    price: 590,
    originalPrice: 1290,
    discount: 54,
    image: "https://picsum.photos/seed/p9/400/400",
    images: [
      "https://picsum.photos/seed/p9/400/400",
      "https://picsum.photos/seed/p9b/400/400",
    ],
    rating: 4.8,
    sold: 11200,
    shopName: "Sleep Well Shop",
    location: "กรุงเทพมหานคร",
    category: "home",
    stock: 75,
    description:
      "หมอน Memory Foam รองรับสรีรวิทยา ปลอกหมอน Bamboo ระบายอากาศดี ป้องกันแบคทีเรีย",
  },
  {
    id: 10,
    name: "ชุดโยคะผู้หญิง Set 2 ชิ้น เสื้อ+กางเกง กันโปร่ง",
    price: 399,
    originalPrice: 890,
    discount: 55,
    image: "https://picsum.photos/seed/p10/400/400",
    images: [
      "https://picsum.photos/seed/p10/400/400",
      "https://picsum.photos/seed/p10b/400/400",
    ],
    rating: 4.7,
    sold: 18900,
    shopName: "Active Life",
    location: "นนทบุรี",
    category: "sports",
    stock: 200,
    description:
      "ชุดโยคะ ผ้ายืดหยุ่น 4-way stretch กันโปร่ง ดูดซับเหงื่อ เคลื่อนไหวสะดวก",
  },
  {
    id: 11,
    name: "ลิปสติก Matte Velvet 24Hr ไม่ติดแก้ว 12 เฉดสี",
    price: 249,
    originalPrice: 590,
    discount: 58,
    image: "https://picsum.photos/seed/p11/400/400",
    images: [
      "https://picsum.photos/seed/p11/400/400",
      "https://picsum.photos/seed/p11b/400/400",
    ],
    rating: 4.9,
    sold: 45600,
    shopName: "Gloss & Go",
    location: "กรุงเทพมหานคร",
    category: "beauty",
    stock: 300,
    description:
      "ลิปสติก Matte สีเข้มชัด ติดทนนาน 24 ชั่วโมง ไม่หลุด ไม่ติดแก้ว มี 12 เฉดให้เลือก",
  },
  {
    id: 12,
    name: "เครื่องทำกาแฟ Espresso อัตโนมัติ 15 Bar 1.5L",
    price: 2990,
    originalPrice: 6990,
    discount: 57,
    image: "https://picsum.photos/seed/p12/400/400",
    images: [
      "https://picsum.photos/seed/p12/400/400",
      "https://picsum.photos/seed/p12b/400/400",
    ],
    rating: 4.6,
    sold: 3400,
    shopName: "Coffee Corner",
    location: "กรุงเทพมหานคร",
    category: "home",
    stock: 30,
    description:
      "เครื่องทำกาแฟ Espresso แรงดัน 15 Bar ระบบทำฟองนมอัตโนมัติ ความจุ 1.5 ลิตร",
  },
  {
    id: 13,
    name: "กระเป๋าเป้ Backpack 30L กันน้ำ USB Charging Port",
    price: 649,
    originalPrice: 1490,
    discount: 56,
    image: "https://picsum.photos/seed/p13/400/400",
    images: [
      "https://picsum.photos/seed/p13/400/400",
      "https://picsum.photos/seed/p13b/400/400",
    ],
    rating: 4.8,
    sold: 21000,
    shopName: "Travel Gear TH",
    location: "กรุงเทพมหานคร",
    category: "fashion",
    stock: 150,
    description:
      "กระเป๋าเป้ กันน้ำ ความจุ 30 ลิตร มีพอร์ต USB ชาร์จมือถือขณะเดินทาง ช่องจัดระเบียบเยอะ",
  },
  {
    id: 14,
    name: "ของเล่น LEGO Technic รถบังคับไฟฟ้า 4WD 800+ ชิ้น",
    price: 1890,
    originalPrice: 3990,
    discount: 53,
    image: "https://picsum.photos/seed/p14/400/400",
    images: [
      "https://picsum.photos/seed/p14/400/400",
      "https://picsum.photos/seed/p14b/400/400",
    ],
    rating: 4.9,
    sold: 6700,
    shopName: "Toy Kingdom",
    location: "กรุงเทพมหานคร",
    category: "toys",
    stock: 40,
    description:
      "ชุดต่อของเล่น Technic 800+ ชิ้น สร้างรถ 4WD พร้อมระบบขับเคลื่อน ฝึกทักษะ STEM",
  },
  {
    id: 15,
    name: "พัดลมตั้งโต๊ะ DC Motor เงียบพิเศษ 8 ระดับ รีโมท",
    price: 890,
    originalPrice: 1990,
    discount: 55,
    image: "https://picsum.photos/seed/p15/400/400",
    images: [
      "https://picsum.photos/seed/p15/400/400",
      "https://picsum.photos/seed/p15b/400/400",
    ],
    rating: 4.7,
    sold: 13500,
    shopName: "Cool Living",
    location: "สมุทรปราการ",
    category: "home",
    stock: 90,
    description:
      "พัดลม DC Motor ประหยัดไฟ 70% เสียงเงียบ <30dB ปรับลม 8 ระดับ พร้อมรีโมทคอนโทรล",
  },
  {
    id: 16,
    name: "ครีมกันแดด SPF50+ PA++++ Invisible Light 50ml",
    price: 380,
    originalPrice: 850,
    discount: 55,
    image: "https://picsum.photos/seed/p16/400/400",
    images: [
      "https://picsum.photos/seed/p16/400/400",
      "https://picsum.photos/seed/p16b/400/400",
    ],
    rating: 4.8,
    sold: 67800,
    shopName: "Sun Shield",
    location: "กรุงเทพมหานคร",
    category: "beauty",
    stock: 400,
    description:
      "ครีมกันแดด SPF50+ PA++++ เนื้อบางเบา ไม่มันเงา ไม่ทิ้งคราบขาว กันน้ำ 80 นาที",
  },
  {
    id: 17,
    name: "สาย USB-C 240W Fast Charge 1 เมตร สาย Nylon Braided",
    price: 149,
    originalPrice: 390,
    discount: 62,
    image: "https://picsum.photos/seed/p17/400/400",
    images: [
      "https://picsum.photos/seed/p17/400/400",
    ],
    rating: 4.6,
    sold: 89000,
    shopName: "Cable World",
    location: "กรุงเทพมหานคร",
    category: "electronics",
    stock: 999,
    description:
      "สาย USB-C รองรับชาร์จเร็ว 240W Nylon Braided ทนทาน รองรับ Data Transfer 480Mbps",
  },
  {
    id: 18,
    name: "หนังสือ Atomic Habits พัฒนาตัวเองผ่านนิสัย (ภาษาไทย)",
    price: 290,
    originalPrice: 420,
    discount: 31,
    image: "https://picsum.photos/seed/p18/400/400",
    images: [
      "https://picsum.photos/seed/p18/400/400",
    ],
    rating: 4.9,
    sold: 25400,
    shopName: "Bookshelf TH",
    location: "กรุงเทพมหานคร",
    category: "books",
    stock: 200,
    description:
      "หนังสือขายดีระดับโลก แปลไทย เปลี่ยนชีวิตผ่านการสร้างนิสัยเล็กน้อยแต่ทรงพลัง",
  },
  {
    id: 19,
    name: "แว่นตากันแดด Polarized UV400 ทรง Aviator",
    price: 399,
    originalPrice: 990,
    discount: 60,
    image: "https://picsum.photos/seed/p19/400/400",
    images: [
      "https://picsum.photos/seed/p19/400/400",
      "https://picsum.photos/seed/p19b/400/400",
    ],
    rating: 4.7,
    sold: 14200,
    shopName: "Vision Style",
    location: "กรุงเทพมหานคร",
    category: "fashion",
    stock: 100,
    description:
      "แว่นตากันแดด เลนส์ Polarized ตัดแสงสะท้อน UV400 100% โครงอลูมิเนียมน้ำหนักเบา",
  },
  {
    id: 20,
    name: "น้ำหอม EDP Unisex กลิ่นไม้-มัสก์ 50ml ติดทน 12hr",
    price: 790,
    originalPrice: 1990,
    discount: 60,
    image: "https://picsum.photos/seed/p20/400/400",
    images: [
      "https://picsum.photos/seed/p20/400/400",
      "https://picsum.photos/seed/p20b/400/400",
    ],
    rating: 4.8,
    sold: 9300,
    shopName: "Scent Lab",
    location: "กรุงเทพมหานคร",
    category: "beauty",
    stock: 80,
    description:
      "น้ำหอม EDP กลิ่น Woody Musk ติดทนนาน 12 ชั่วโมง Top: bergamot, Heart: cedar, Base: musk",
  },
];

export const flashDeals = products.filter((p) => p.discount >= 55).slice(0, 8);

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
  if (sold >= 10000) return `${(sold / 1000).toFixed(0)}k`;
  if (sold >= 1000) return `${(sold / 1000).toFixed(1)}k`;
  return sold.toString();
}
