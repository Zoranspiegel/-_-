'use client';
import Image from 'next/image';
import AvatarForm from './avatar-form';
import LogoutButton from './logout-button';
import { usePrivateContext } from '@/app/contexts/PrivateContext';

export default function AccountPage (): JSX.Element {
  const user = usePrivateContext();

  if (!user) return <div>Loading...</div>;
  return (
    <div className='min-w-full flex flex-col flex-grow justify-between items-center p-4 gap-6'>
      <div>
        <h1
          className={`${user.is_admin ? 'text-[red]' : ''} font-bold text-2xl`}
        >{user.username}</h1>
      </div>
      <div className='border-4 border-double border-[green] rounded-full w-[270px] h-[270px] bg-[green] bg-opacity-20 overflow-hidden'>
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={user.username}
            width={270}
            height={270}
            priority
            className='rounded-full'
          />
        )}
      </div>
      <div>
        <AvatarForm userID={user.id} is_admin={user.is_admin} />
      </div>
      <LogoutButton />
    </div>
  );
}
