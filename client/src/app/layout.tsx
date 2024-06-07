import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./_components/providers/store.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TiketFest",
  description: "One click away from your dream Concert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
