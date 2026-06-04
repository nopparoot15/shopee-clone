import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shoppe — ช้อปสนุก ส่งฟรีทั่วไทย",
  description: "แพลตฟอร์มซื้อขายออนไลน์ สินค้าลดราคาทุกวัน Flash Sale ส่งฟรี ไม่มีขั้นต่ำ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
