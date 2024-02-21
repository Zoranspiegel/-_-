import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import LoadingHeader from '../components/LoadingHeader';
import ErrorHeader from '../components/ErrorHeader';

export default function Header (): JSX.Element {
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <LoadingHeader />;
  if (error) return <ErrorHeader />;

  const user: UserProfile = data;

  return (
    <header
      className='w-full max-w-md h-20 flex justify-between items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-2'
    >
      <div className='px-4'>Мрачне тајне</div>
      <Link
        href='/account'
        className='flex items-center gap-2'
      >
        <span className='font-bold'>{user.username}</span>
        <Image
          src={user.avatar}
          alt={user.username}
          width={50}
          height={50}
          className='rounded-full'
        />
      </Link>
    </header>
  );
}
