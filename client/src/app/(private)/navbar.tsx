'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePrivateContext } from '../contexts/PrivateContext';
import NavbarLoading from './navbar-loading';
import { GiFangs, GiBleedingEye, GiEyeTarget, GiFountainPen, GiMagicGate } from 'react-icons/gi';

export default function NavBar (): JSX.Element {
  const pathname = usePathname();
  const user = usePrivateContext();

  if (!user) return <NavbarLoading />;

  return (
    <nav
      className='w-full max-w-md h-[9vh] flex justify-evenly items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 text-3xl font-bold'
    >
      <Link
        href='/feed'
        className={`flex flex-col items-center ${pathname === '/feed' ? 'text-[rgb(180,0,0)]' : ''}`}
      >
        <GiMagicGate/>
        <span className='text-xs'>Seek</span>
      </Link>
      <Link
        href='/profile'
        className={`flex flex-col items-center ${pathname === '/profile' ? 'text-[rgb(180,0,0)]' : ''}`}
      >
        <GiFountainPen/>
        <span className='text-xs'>Tell</span>
      </Link>
      <Link
        href='/following'
        className={`flex flex-col items-center ${pathname === '/following' ? 'text-[rgb(180,0,0)]' : ''}`}
      >
        <GiEyeTarget/>
        <span className='text-xs'>Hunt</span>
      </Link>
      <Link
        href='/followers'
        className={`flex flex-col items-center ${pathname === '/followers' ? 'text-[rgb(180,0,0)]' : ''}`}
      >
        <GiBleedingEye/>
        <span className='text-xs'>Lure</span>
      </Link>
      {user.is_admin && (
        <Link
        href='/admin'
        className={`flex flex-col items-center ${pathname === '/admin' ? 'text-[rgb(180,0,0)]' : ''}`}
      >
        <GiFangs/>
        <span className='text-xs'>Lead</span>
      </Link>
      )}
    </nav>
  );
}
