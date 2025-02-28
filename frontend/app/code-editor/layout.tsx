import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import logo from '@/utils/coding.png'
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncScript - Collaborative Code Editor",
  description: "Real-time collaborative code editor with multiple language support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-900 via-[#0f1729] to-gray-900`}>
        <header className="bg-indigo-500/5 border-b border-indigo-500/20 py-4 sticky top-0 z-50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Image src={logo} className="mx-2" alt="SyncScript Logo" width={35} height={35} />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                SyncScript
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-indigo-200 hover:text-indigo-100 transition-colors">
                Documentation
              </a>
              <a href="#" className="text-indigo-200 hover:text-indigo-100 transition-colors">
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}