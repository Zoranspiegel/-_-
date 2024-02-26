import Image from 'next/image';
import FollowButton from '@/app/components/FollowButton';

export default function ProfileHeader ({ user }: {
  user: UserProfile
}): JSX.Element {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <div className='w-[80px] h-[80px] flex items-center border-4 border-double border-[green] rounded-full bg-[green] bg-opacity-30 overflow-hidden'>
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
        <span className='text-xl font-bold'>{user.username}</span>
      </div>
      <FollowButton
        id={user.id}
      />
    </div>
  );
}
