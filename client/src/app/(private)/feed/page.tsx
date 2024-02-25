'use client';
import { useState } from 'react';
import PostsContainer from '@/app/components/PostsContainer';
import MyButton from '@/app/components/MyButton';

export default function Feed (): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const posts = [];
  for (let i = 0; i < page; i++) {
    posts.push(<PostsContainer key={i} page={i} url='/api/posts/feed' lastPage={lastPage} setLastPage={setLastPage}/>);
  }

  return (
    <div className='w-full min-h-full flex flex-col justify-between'>
      <div>
        {posts}
      </div>
      <div className='flex flex-col pb-4'>
        <MyButton
          disabled={lastPage}
          onClick={() => { setPage(page + 1); }}
        >Load more...</MyButton>
      </div>
    </div>
  );
}
