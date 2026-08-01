import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { SectionNav } from '@/components/layout/SectionNav';
import { CommandPalette } from '@/components/CommandPalette';
import { SectionProvider } from '@/lib/section-context';

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wahyumhd.com'),
  title: 'Wahyu Mahendra | Cybersecurity & Software Engineering',
  description: 'I build secure, reliable, and user-centric systems. Specializing in cybersecurity, cloud infrastructure, and software engineering.',
  keywords: ['Wahyu Mahendra', 'Cyber Security', 'Software Engineering', 'Portfolio', 'Cloud Infrastructure', 'Australia'],
  openGraph: {
    title: 'Wahyu Mahendra | Engineering Portfolio',
    description: 'Computer Science Student building secure and optimal systems. View my projects and experience.',
    url: 'https://www.wahyumhd.com',
    siteName: 'Wahyu Mahendra',
    images: [
      {
        url: '/profile.webp',
        width: 800,
        height: 1000,
        alt: 'Wahyu Mahendra Profile Picture'
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${jakartaSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <SectionProvider>
          <CommandPalette />
          <SectionNav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SectionProvider>
      </body>
    </html>
  );
}
