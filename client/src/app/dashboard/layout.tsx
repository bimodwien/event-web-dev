import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TiketFest",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} flex h-screen`}>
      <Sidebar />
      <main className="flex-grow p-4 overflow-auto">{children}</main>
    </div>
  );
}
