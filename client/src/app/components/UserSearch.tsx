import Link from 'next/link';
import Image from 'next/image';

export default function UserSearch ({ user, personal }: {
  user: UserProfile
  personal: boolean
}): JSX.Element {
  return (
    <div className=''>
      <Link
        href={`/${personal ? 'account' : user.username}`}
        className='flex items-center gap-2'
      >
        <div className='w-[30px] h-[30px] shrink-0 rounded-full border-2 border-[green] bg-[green] bg-opacity-30'>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.username}
              width={30}
              height={30}
              className='rounded-full'
            />
          )}
        </div>
        <span className='text-sm'>{user.username}</span>
      </Link>
    </div>
  );
}
