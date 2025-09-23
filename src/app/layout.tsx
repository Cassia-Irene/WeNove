"use client";

import { Inter, Dosis } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserContext";
import Head from "next/head";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
});

// Metadata moved to head tag since this is now a client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>WeNove - Dando um novo propósito às suas roupas</title>
        <meta name="description" content="Transformamos roupas usadas em novos produtos de valor através de coleta, triagem e reaproveitamento sustentável." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${dosis.variable} antialiased`}
      >
        <UserProvider>
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
