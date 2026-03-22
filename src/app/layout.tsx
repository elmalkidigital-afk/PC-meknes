import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Réparation PC & Mobile à Meknès | PC-MEKNES",
  description:
    "Service réparation PC et mobile à Meknès. Diagnostic gratuit, pâte thermique, montage PC, software mobile. Intervention rapide et prix abordables. PC-MEKNES.",
  keywords:
    "réparation PC Meknès, réparation ordinateur Meknès, réparation téléphone Meknès, diagnostic gratuit, pâte thermique, montage PC",
  authors: [{ name: "Abderrahman Elmalki" }],
  openGraph: {
    title: "PC-MEKNES | Réparation PC Portable & Téléphone à Meknès",
    description:
      "Diagnostic gratuit. Intervention à domicile. Réparation PC et mobile à Meknès.",
    url: "https://pc-meknes.fr",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dk93srhfb/image/upload/v1771355775/ChatGPT_Image_17_f%C3%A9vr._2026_16_22_21_ezmwm2.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="geo.placename" content="Meknès, Maroc" />
        <meta name="geo.region" content="MA-FEZ" />
        <meta name="geo.position" content="33.884611;-5.5302346" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "PC-MEKNES",
              description:
                "Service réparation PC et mobile à Meknès. Diagnostic gratuit, pâte thermique, montage PC, software mobile.",
              telephone: "+212699245542",
              url: "https://pc-meknes.fr",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Zone C, Bloc F, Bassatine",
                addressLocality: "Meknès",
                addressRegion: "Fès-Meknès",
                postalCode: "50000",
                addressCountry: "MA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 33.884611,
                longitude: -5.5302346,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
              ],
              priceRange: "50-200 DH",
              areaServed: "Meknès, Maroc",
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
