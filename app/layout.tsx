import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hey, Guruji. | Date Review',
  description: 'A very unofficial date review form. Made by Aaryan.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
