import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import './globals.css';

const font = Courier_Prime({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Мрачне тајне',
  description: 'Secrets from the world`s swamp'
};

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${font.className} text-[green] bg-cover bg-center select-none text-lg`} style={{ backgroundImage: 'url(https://res.cloudinary.com/dkc8xrlg8/image/upload/v1708254931/ASCII%20Images/Sewers.png)' }}>{children}</body>
    </html>
  );
}
