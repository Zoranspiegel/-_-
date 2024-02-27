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
      <div className='h-screen flex flex-col justify-between items-center py-[1vh] px-[1vh]'> {/* 2vh */}
        <Header /> {/* 10vh */}
        <NavBar />  {/* 10vh */}
        <main
          className='w-full max-w-md h-[75vh] flex flex-col justify-start items-start border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-4 pt-4'
        >{children}</main>
        <Footer /> {/* 2vh */}
      </div>
    </SWRConfig>
  );
}
