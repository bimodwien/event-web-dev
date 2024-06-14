"use client";

import { usePathname } from "next/navigation";
import Navbar from "./_components/navbar";
import Sidebar from "./dashboard/_components/sidebar";
import Footer from "./_components/footer";

type Props = { children: React.ReactNode };
export default function ResponsiveNavWrapper({ children }: Props) {
  const pathname: string = usePathname();
  const isCustomer: boolean =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/dashboard" ||
    pathname === "/verify-user" ||
    pathname === "/reset-password" ||
    pathname === "/verification" ||
    pathname === "/reset-token" ||
    pathname === "/edit-profile" ||
    pathname === "/dashboard/create-event" ||
    pathname.startsWith("/dashboard/");

  return (
    <main>
      {!isCustomer && <Navbar />}
      {children}
      {/* <Footer /> */}
    </main>
  );
}
