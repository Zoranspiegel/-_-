'use client';
import { useState } from 'react';
import PostsContainer from '@/app/components/PostsContainer';
import MyButton from '@/app/components/MyButton';

export default function Profile (): JSX.Element {
  const [page, setPage] = useState<number>(1);

  const posts = [];
  for (let i = 0; i < page; i++) {
    posts.push(<PostsContainer key={i} page={i} url='/api/posts' />);
  }

  return (
    <div className='flex flex-col'>
      {posts}
      <MyButton
        onClick={() => { setPage(page + 1); }}
      >Load more...</MyButton>
    </div>
  );
}
