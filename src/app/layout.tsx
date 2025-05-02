import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "FINGEC | Cabinet d'expertise comptable",
  description: "FINGEC, cabinet d'expertise comptable proposant des services de comptabilité, conseil juridique et gestion sociale pour accompagner votre entreprise.",
  icons: {
    icon: '/favicon.ico', // Favicon principal
    apple: '/apple-icon.png', // Pour les appareils Apple
    shortcut: '/favicon-16x16.png', // Favicon de raccourci
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} ${inter.className}`}>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
