'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar (): JSX.Element {
  const pathname = usePathname();
  return (
    <nav
      className='w-full max-w-md h-[9vh] flex justify-evenly items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 text-lg font-bold'
    >
      <Link
        href='/feed'
        className={pathname === '/feed' ? 'text-[rgb(180,180,0)]' : ''}
      >Feed</Link>
      <Link
        href='/profile'
        className={pathname === '/profile' ? 'text-[rgb(180,180,0)]' : ''}
      >Profile</Link>
      <Link
        href='/following'
        className={pathname === '/following' ? 'text-[rgb(180,180,0)]' : ''}
      >Following</Link>
      <Link
        href='/followers'
        className={pathname === '/followers' ? 'text-[rgb(180,180,0)]' : ''}
      >Followers</Link>
    </nav>
  );
}
