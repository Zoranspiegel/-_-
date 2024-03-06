import Image from 'next/image';
import FollowButton from '@/app/components/FollowButton';
import { splitUsername } from '@/app/utils/splitUsername';

export default function ProfileHeader ({ user }: {
  user: UserProfile
}): JSX.Element {
  const usernameParts = splitUsername(user.username);
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <div className='w-[80px] h-[80px] flex shrink-0 items-start border-4 border-double border-[green] rounded-full bg-[green] bg-opacity-30 overflow-hidden'>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.username}
              width={70}
              height={70}
              className='rounded-full'
            />
          )}
        </div>
        <div className='flex flex-wrap'>
          {usernameParts.map(part => (
            <span
              key={part}
              className={`${user.is_admin ? 'text-[red]' : ''} text-xl font-bold`}
            >{part}</span>
          ))}
        </div>
      </div>
      <FollowButton
        id={user.id}
      />
    </div>
  );
}
