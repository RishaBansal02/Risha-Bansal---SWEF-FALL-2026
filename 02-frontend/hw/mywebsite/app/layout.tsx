
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Risha's Website",
  description: "My personal website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <nav className="bg-pink-100 p-4 flex justify-center gap-8">
          <Link href="/" className="text-pink-700 font-bold">
            Home
          </Link>

          <Link href="/matcha" className="text-pink-700 font-bold">
            Matcha
          </Link>
        </nav>

        {children}

      </body>
    </html>
  );
}
