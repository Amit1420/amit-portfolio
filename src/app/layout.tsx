import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { profile, experiences, education } from "@/lib/data"
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

const SITE_URL = "https://amitk1420.vercel.app"

// schema.org Person — lets search engines show a rich profile card
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpeg`,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin],
  worksFor: { "@type": "Organization", name: experiences[0].company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
  address: { "@type": "PostalAddress", addressLocality: "Patna", addressRegion: "Bihar", addressCountry: "IN" },
  knowsAbout: ["SAP BTP", "SAP CAP", "Java", "Spring Boot", "Microservices", "SAP HANA Cloud", "OData V4", "AWS"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" style={{ background: '#050508', color: '#94a3b8' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
