import './globals.css';
import type { Metadata } from 'next';
import { manrope, urbanist } from './lib/fonts';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

export const metadata: Metadata = {
  title: 'NRB Markketings',
  description: 'Premium government‑surplus assets & industrial essentials—reliably sourced, expertly delivered.',
  keywords: 'government supplier, electronics, chemicals, PVC plumbing, seafood, PSDAS, water management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${urbanist.variable} scroll-smooth`}>  
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
