import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "VoiceGraphFlow",
  description: "Advanced Voice and Graph Intelligence Platform",
};

import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/components/AuthContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-950 text-white flex`}
      >
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-gray-950 to-gray-900">
        <div className="max-w-[1600px] mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </>
  );
}
