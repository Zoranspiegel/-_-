import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';
import { splitUsername } from '../utils/splitUsername';

export default function User ({
  user,
  personal
}: {
  user: UserProfile
  personal: boolean
}): JSX.Element {
  const usernameParts = splitUsername(user.username);

  return (
    <div className='flex justify-between items-center mb-6'>
      <Link
        href={personal ? '/account' : `/${user.username}`}
        className='flex items-center gap-2'
      >
        <div className='border-2 border-[green] rounded-full w-[70px] h-[70px] overflow-hidden shrink-0'>
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
          {usernameParts.map((part) => (
            <span
              key={part}
              className={`${user.is_admin ? 'text-[red]' : ''} font-bold text-xl`}
            >{part}</span>
          ))}
        </div>
      </Link>
      {!personal && (<FollowButton id={user.id}/>)}
    </div>
  );
}
