import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renrawin Nuanin — Full Stack Web Developer",
  description: "รับพัฒนาเว็บไซต์ครบวงจร ตั้งแต่ออกแบบ UI ไปจนถึง Deploy จริงบน Server พร้อมใช้งานได้ทันที",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
