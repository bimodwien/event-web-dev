"use client";

import { usePathname } from "next/navigation";
import Navbar from "./_components/navbar";

type Props = { children: React.ReactNode };
export default function ResponsiveNavWrapper({ children }: Props) {
  const pathname: string = usePathname();
  const isAuthPath: boolean =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/reset-password" ||
    pathname === "/dashboard/create-event";
  return (
    <main>
      {!isAuthPath && <Navbar />}
      {children}
    </main>
  );
}
