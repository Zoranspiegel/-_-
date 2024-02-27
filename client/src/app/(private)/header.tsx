import useSWR from 'swr';
import LoadingHeader from '../components/LoadingHeader';
import ErrorHeader from '../components/ErrorHeader';
import Link from 'next/link';
import Image from 'next/image';

export default function Header (): JSX.Element {
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <LoadingHeader />;
  if (error) return <ErrorHeader />;

  const user: UserProfile = data;

  return (
    <header
      className='w-full max-w-md min-h-20 flex justify-between items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-2'
    >
      <div className='px-4'>Мрачне тајне</div>
      <Link
        href='/account'
        className='flex items-center gap-2'
      >
        <span className={`${user.is_admin ? 'text-[red]' : ''} font-bold`}>{user.username}</span>
        <div className='w-[60px] h-[60px] border-2 border-[green] rounded-full bg-[green] bg-opacity-30 overflow-hidden'>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.username}
              width={60}
              height={60}
              className='rounded-full'
            />
          )}
        </div>
      </Link>
    </header>
  );
}
