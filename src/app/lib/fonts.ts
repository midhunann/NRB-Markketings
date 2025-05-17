import { Manrope, Lora } from 'next/font/google';

// Option 1: Manrope + Urbanist
export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

// export const urbanist = Urbanist({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-urbanist',
// });

// Optional: If you want to use Option 2 later
// import { Montserrat, Lora } from 'next/font/google';
// export const manrope = Montserrat({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-montserrat',
// });

export const urbanist = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});