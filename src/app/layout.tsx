import type { Metadata } from 'next';
import { Newsreader, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { CommandPalette } from '@/components/CommandPalette';
const sans = Source_Sans_3({
  variable: '--font-sans-body',
  subsets: ['latin'],
  display: 'swap',
});
const editorial = Newsreader({
  variable: '--font-editorial',
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://www.wahyumhd.com'),
  title: {
    default: 'Wahyu Mahendra | Engineering & Photography',
    template: '%s | Wahyu Mahendra',
  },
  description:
    'I Putu Wahyu Mahendra, an Advanced Computing student at the University of Sydney. Backend engineering, cybersecurity, infrastructure, and photography.',
  keywords: [
    'Wahyu Mahendra',
    'Cyber Security',
    'Software Engineering',
    'Portfolio',
    'Cloud Infrastructure',
    'Australia',
  ],
  openGraph: {
    title: 'Wahyu Mahendra | Engineering & Photography',
    description:
      'Backend systems, security, and a curious eye. Explore my projects and experience.',
    siteName: 'Wahyu Mahendra',
    images: [
      {
        url: '/profile.jpg',
        width: 681,
        height: 955,
        alt: 'I Putu Wahyu Mahendra',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <CommandPalette />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
