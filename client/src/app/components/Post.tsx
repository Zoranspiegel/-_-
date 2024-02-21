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
        className='flex flex-col h-[50px] rounded-full'
      >
        {post.avatar && (
          <Image
            src={post.avatar}
            alt={post.username}
            width={50}
            height={50}
            className='rounded-full'
          />
        )}
        {!post.avatar && (
          <div className='rounded-full bg-[rgba(0,130,0,0.3)] w-[50px] h-[50px]'></div>
        )}
      </Link>
      <div className='max-w-xs flex flex-col'>
        <div>
          <Link
            href={personal ? '/account' : `/${post.username}`}
            className='font-bold text-xl'
          >{post.username}</Link>
        </div>
        <h2 className=' text-opacity-70 text-[green]'>{new Date(post.created_at).toLocaleDateString('en-us', localDateOptions)}</h2>
        <p className='select-text mt-2'>{post.content}</p>
      </div>
    </div>
  );
}
