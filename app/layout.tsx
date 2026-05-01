import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  // TODO: Update metadataBase with your actual production domain
  // metadataBase: new URL('https://yourdomain.com'),
  title: 'Currency Bands | Custom Banknote Straps for Banks & Cash Centers',
  description:
    'Premium custom-printed currency bands, banknote straps, and money banderoles for banks, cash processing centers, and CIT companies. Free samples. EU delivery. Direct manufacturer.',
  keywords: [
    'currency bands',
    'banknote straps',
    'money banderoles',
    'cash packaging',
    'currency straps',
    'banknote bands',
    'cash center supplies',
    'bank supplies',
  ],
  openGraph: {
    title: 'Currency Bands | Custom Banknote Straps for Banks & Cash Centers',
    description:
      'Premium custom-printed currency bands manufactured for European banks, cash centers, and CIT operators. Free samples. Direct manufacturer.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        // TODO: Replace with actual OG image at /public/og-image.png (1200×630px)
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Currency Bands — Custom Banknote Straps for Banks and Cash Centers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Bands | Custom Banknote Straps',
    description:
      'Premium currency bands for banks and cash centers. Free samples. EU delivery.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans bg-white text-gray-900 overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] bg-gold text-navy font-semibold px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
