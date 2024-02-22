import Link from 'next/link';
import Image from 'next/image';

export default function User ({
  user,
  personal
}: {
  user: UserProfile
  personal: boolean
}): JSX.Element {
  return (
    <div>
      <Link
        href={personal ? '/account' : `/${user.username}`}
        className='flex items-center gap-2'
      >
        <span className='font-bold'>{user.username}</span>
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
      </Link>
    </div>
  );
}
