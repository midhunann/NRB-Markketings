import './globals.css';
import type { Metadata } from 'next';
import MainNavigation from './components/layout/header';
import Footer from './components/layout/footer';

export const metadata: Metadata = {
  title: 'NRB Markketings - We are the Trend Setter',
  description: 'Leading supplier of a wide variety of products and services to Central and State Government departments across India',
  keywords: 'government supplier, electronics, chemicals, PVC plumbing, seafood, PSDAS, water management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <MainNavigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}