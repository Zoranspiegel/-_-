import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';

export default function User ({
  user,
  personal
}: {
  user: UserProfile
  personal: boolean
}): JSX.Element {
  return (
    <div className='flex justify-between items-center mb-6'>
      <Link
        href={personal ? '/account' : `/${user.username}`}
        className='flex items-center gap-2'
      >
        <div className='border-2 border-[green] rounded-full w-[60px] h-[60px] overflow-hidden'>
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
        <span className={`${user.is_admin ? 'text-[red]' : ''} font-bold text-xl`}>{user.username}</span>
      </Link>
      {!personal && (<FollowButton id={user.id}/>)}
    </div>
  );
}
