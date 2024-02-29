'use client';
import { useEffect, useState, useRef } from 'react';
import PostsContainer from '@/app/components/PostsContainer';
import SearchUsers from './search-users';
import SearchPosts from './search-posts';

export default function Feed (): JSX.Element {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    setLastPage(false);
    setPage(1);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [search]);

  const posts = [];
  for (let i = 0; i < page; i++) {
    posts.push(
      <PostsContainer
        key={i}
        page={i}
        url={search ? '/api/posts/search' : '/api/posts/feed'}
        lastPage={lastPage}
        setLastPage={setLastPage}
        search={search}
      />
    );
  }

  return (
    <div className='w-full min-h-full flex flex-col'>
      <div className='w-full flex justify-evenly gap-2'>
        <SearchUsers />
        <SearchPosts setSearch={setSearch}/>
      </div>
      <div className='my-4'>
        <hr className='border-dotted border-2 border-[green]'/>
      </div>
      <div
        ref={scrollAreaRef}
        className='w-full flex flex-col flex-grow justify-between overflow-scroll'
      >
        <div>
          {posts}
        </div>
        <div className='flex flex-col pb-4'>
          <button
            disabled={lastPage}
            onClick={() => { setPage(page + 1); }}
            className='button'
          >Load more...</button>
        </div>
      </div>
    </div>
  );
}
