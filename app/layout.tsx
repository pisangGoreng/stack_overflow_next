import React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css"; // * untuk font family, jangan lupa di import ya
import { ThemeProvider } from "@/context/ThemeProvider";

// * add google font for project
// * tambah variable nya sebagai classname di <body>
// * className={`${inter.variable} ${spaceGrostesk.variable}`}

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrostesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrostesk",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A comunity-driven platform for asking and answering programming questions",
  icons: {
    icon: "/assets/images/site-logo.svg", // * for favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrostesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
