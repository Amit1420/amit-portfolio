import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import ScrollProgress from "@/components/ScrollProgress"
import BackToTop from "@/components/BackToTop"
import CopyToast from "@/components/CopyToast"
import CustomCursor from "@/components/CustomCursor"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Amit Kumar – Software Engineer II | SAP BTP & Java",
  description:
    "Portfolio of Amit Kumar, Software Engineer II specializing in SAP BTP, Java, Spring Boot, and cloud-native microservices. Employee of the Year 2026.",
  keywords: ["SAP BTP", "Java", "Spring Boot", "SAP CAP", "Microservices", "Software Engineer", "SAP HANA", "OData V4"],
  authors: [{ name: "Amit Kumar", url: "https://amitk1420.vercel.app" }],
  metadataBase: new URL("https://amitk1420.vercel.app"),
  openGraph: {
    title: "Amit Kumar – Software Engineer II | SAP BTP & Java",
    description: "SAP BTP & Java Specialist · Employee of the Year 2026 · 3+ Years Enterprise Cloud Experience",
    type: "website",
    url: "https://amitk1420.vercel.app",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Amit Kumar Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Kumar – Software Engineer II",
    description: "SAP BTP & Java Specialist · Employee of the Year 2026",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" style={{ background: '#050508', color: '#94a3b8', cursor: 'none' }}>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        {children}
        <BackToTop />
        <CopyToast />
      </body>
    </html>
  )
}
