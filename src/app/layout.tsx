import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TSC Freight Co.",
  description: "Calculate your shipping costs all over New Eden!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
