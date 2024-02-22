'use client';
import { SWRConfig } from 'swr';
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';
import { fetcher } from '../utils/fetcher';

export default function PrivateLayout ({
  children
}: { children: React.ReactNode }): JSX.Element {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className='h-screen flex flex-col justify-start items-center py-2 gap-2'>
        <Header />
        <NavBar />
        <main
          className='w-full max-w-md flex flex-col flex-grow justify-start items-start border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-4 pt-4 overflow-y-scroll'
        >{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
