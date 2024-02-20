import Link from 'next/link';

export default function Home (): JSX.Element {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center'>
      <div className=' flex flex-col w-full max-w-xs rounded-lg border-4 border-double border-[green] bg-[rgba(0,0,0,0.7)] p-4 gap-4'>
        <h1 className=' text-center text-xl font-bold'>Мрачне тајне</h1>
        <Link
          href='/login'
          className='rounded-sm border-4 border-double border-[green] text-center text-[green] font-bold py-2 hover:border-black hover:bg-[green] hover:text-black'
        >Log in</Link>
        <Link
          href='/signup'
          className='rounded-sm border-4 border-double border-[green] text-center text-[green] font-bold py-2 hover:border-black hover:bg-[green] hover:text-black'
        >Sign up</Link>
      </div>
    </main>
  );
}
