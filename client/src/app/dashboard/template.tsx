"use client";

import { usePathname } from "next/navigation";
import NavDashboard from "./_components/nav";

type Props = { children: React.ReactNode };
export default function ResponsiveNavWrapper({ children }: Props) {
  const pathname: string = usePathname();
  const isOrganizer: boolean =
    pathname === "/dashboard" || pathname === "/dashboard/my-event";

  return (
    <main>
      {isOrganizer && <NavDashboard />}
      {children}
    </main>
  );
}
