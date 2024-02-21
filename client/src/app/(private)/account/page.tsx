'use client';
import useSWR from 'swr';
import Image from 'next/image';
import AvatarForm from './avatar-form';

export default function AccountPage (): JSX.Element {
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const user: UserProfile = data;
  return (
    <div className='min-w-full flex flex-col flex-grow justify-center items-center gap-6'>
      <h1
        className={`${user.isAdmin ? 'text-[red]' : ''} font-bold text-2xl`}
      >{user.username}</h1>
      <div className='border-4 border-double border-[green] rounded-full w-[250px] h-[250px] bg-[green] bg-opacity-20 overflow-hidden'>
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={user.username}
            width={250}
            height={250}
            className='rounded-full'
          />
        )}
      </div>
      <div>
        <AvatarForm userID={user.id} />
      </div>
    </div>
  );
}
