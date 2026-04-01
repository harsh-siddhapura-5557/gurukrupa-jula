import type { Metadata } from "next";
import { Inter, Hind_Vadodara } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const hindVadodara = Hind_Vadodara({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["gujarati"],
  variable: '--font-hind-vadodara',
});

export const metadata: Metadata = {
  title: "ગુરુકૃપા ફેબ્રિકેશન & ઝુલા | Gurukrupa Fabrication & Jula",
  description: "ગુરુકૃપા ફેબ્રિકેશન & ઝુલા - તમારા ઘર માટે મજબૂત અને આધુનિક ડિઝાઇન",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" className="scroll-smooth">
      <body className={`${inter.variable} ${hindVadodara.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
