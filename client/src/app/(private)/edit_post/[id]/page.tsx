'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import useSWR from 'swr';

export default function EditPost (): JSX.Element {
  const { id }: { id: string } = useParams();
  const { data, isLoading, error } = useSWR(`/api/posts/${id}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const post: Post = data;

  return (
    <div className='w-full flex gap-4 mb-4'>
      <div className='shrink-0 border-2 border-[green] rounded-full bg-[rgba(0,130,0,0.3)] w-[60px] h-[60px] overflow-hidden'>
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
      <textarea
        rows={4}
        // value={content}
        // onChange={handleChange}
        placeholder='Reveal your secret...'
        className='w-full border-4 border-double border-[green] rounded-lg bg-[green] bg-opacity-20 p-4 resize-none outline-none placeholder:text-[green] placeholder:text-opacity-70'
      />
    </div>
  );
}
