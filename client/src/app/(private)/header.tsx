import useSWR from 'swr';
import LoadingHeader from '../components/LoadingHeader';
import ErrorHeader from '../components/ErrorHeader';
import Link from 'next/link';
import Image from 'next/image';
import { splitUsername } from '../utils/splitUsername';

export default function Header (): JSX.Element {
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <LoadingHeader />;
  if (error) return <ErrorHeader />;

  const user: UserProfile = data;

  const usernameParts = splitUsername(user.username);
  return (
    <header
      className='w-full max-w-md h-[9vh] flex justify-between items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-2'
    >
      <div className='px-4'>Мрачне тајне</div>
      <Link
        href='/account'
        className='flex items-center gap-2'
      >
        <div className={`w-28 flex flex-wrap justify-end ${user.is_admin ? 'text-[red]' : ''} text-xl font-bold`}>
          {usernameParts.map(part => (
            <span
              key={part}
            >{part}</span>
          ))}
        </div>
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
