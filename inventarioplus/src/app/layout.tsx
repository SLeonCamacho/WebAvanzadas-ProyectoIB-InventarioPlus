import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./home.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InventarioPlus",
  description: "Sistema de gestión de inventario integral para PYMES, facilitando el control eficiente del stock, la recepción de productos, la generación de informes y la creación de órdenes de compra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
