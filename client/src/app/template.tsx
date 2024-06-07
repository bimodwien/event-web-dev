"use client";

import { usePathname } from "next/navigation";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

type Props = { children: React.ReactNode };
export default function ResponsiveNavWrapper({ children }: Props) {
  const pathname: string = usePathname();
  const isCustomer: boolean =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

    pathname === "/reset-password" ||
    pathname === "/verification" ||
    pathname === "/reset-token" ||
    pathname === "/dashboard/create-event";
  return (
    <main>
      {!isCustomer && <Navbar />}
      {children}
    </main>
  );
}
