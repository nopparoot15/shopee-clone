import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WebPro — รับทำเว็บไซต์ครบวงจร Landing Page / Company Profile",
  description: "รับทำเว็บไซต์ครบวงจร Next.js React ออกแบบ UI สวยงาม Responsive SEO Deploy พร้อมใช้งาน ปรึกษาฟรีก่อนตกลงงาน",
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
