import Link from 'next/link';
import Image from 'next/image';
import PostOptions from './PostOptions';
import { BsCheck } from 'react-icons/bs';
import { useState, useRef, useEffect } from 'react';
import { mutate } from 'swr';

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
  const [contentState, setContentState] = useState<string>(post.content);
  const [edited, setEdited] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (post.created_at !== post.updated_at) {
      setEdited(true);
    }
  }, [post]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      setContentState(post.content);
    }
  }, [editing]);

  useEffect(() => {
    function handleInputBlur (): void {
      setTimeout(() => {
        setEditing(false);
        setContentState(post.content);
      }, 100);
    }

    if (textareaRef.current) {
      textareaRef.current.addEventListener('blur', handleInputBlur);
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('blur', handleInputBlur);
      }
    };
  });

  function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setContentState(e.target.value);
  }

  async function handleEdit (): Promise<void> {
    if (contentState !== post.content) {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ content: contentState })
      });

      if (res.ok) {
        await mutate((endpoint: string) => endpoint.startsWith('/api/posts'));
      }
    }

    setEditing(false);
  }

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
      <div className='w-full max-w-xs flex flex-col'>
        <div className='flex justify-between items-center'>
          <Link
            href={personal ? '/account' : `/${post.username}`}
            className={`${post.is_admin ? 'text-[red]' : ''} font-bold text-xl`}
          >{post.username}</Link>
          {personal && <PostOptions id={post.id} setEditing={setEditing}/>}
        </div>
        <div className='relative flex text-opacity-70 text-[green] text-sm gap-2'>
          {edited
            ? <span>Updated</span>
            : <span>Created</span>}
          <h2>{new Date(post.updated_at).toLocaleDateString('en-us', localDateOptions)}</h2>
        </div>
        {!editing && <p className='select-text mt-2 break-words'>{post.content}</p>}
        {editing && (
          <div className='relative'>
            <textarea
              ref={textareaRef}
              value={contentState}
              onChange={handleChange}
              rows={4}
              className='w-full border-4 border-double border-[green] rounded-lg bg-[green] bg-opacity-20 p-2 resize-none outline-none'
            />
            <button
              onClick={handleEdit}
              className='button absolute bottom-2 right-0 p-0 text-xs self-end'
            >
              <BsCheck size={20}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
