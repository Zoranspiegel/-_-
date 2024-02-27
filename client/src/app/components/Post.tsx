import Link from 'next/link';
import Image from 'next/image';

const localDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

export default function Post ({
  post,
  personal
}: {
  post: Post
  personal: boolean
}): JSX.Element {
  return (
    <div className='flex gap-4 mb-4'>
      <Link
        href={personal ? '/account' : `/${post.username}`}
        className='flex flex-col h-[60px] rounded-full'
      >
        <div className='border-2 border-[green] rounded-full bg-[rgba(0,130,0,0.3)] w-[60px] h-[60px] overflow-hidden'>
          {post.avatar && (
            <Image
              src={post.avatar}
              alt={post.username}
              width={60}
              height={60}
              className='rounded-full'
            />
          )}
        </div>
      </Link>
      <div className='max-w-xs flex flex-col'>
        <div>
          <Link
            href={personal ? '/account' : `/${post.username}`}
            className={`${post.is_admin ? 'text-[red]' : ''} font-bold text-xl`}
          >{post.username}</Link>
        </div>
        <h2 className=' text-opacity-70 text-[green]'>{new Date(post.created_at).toLocaleDateString('en-us', localDateOptions)}</h2>
        <p className='select-text mt-2'>{post.content}</p>
      </div>
    </div>
  );
}
