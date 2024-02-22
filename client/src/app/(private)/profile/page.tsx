'use client';
import { useState } from 'react';
import PostsContainer from '@/app/components/PostsContainer';
import MyButton from '@/app/components/MyButton';
import NewPost from './new-post';

export default function Profile (): JSX.Element {
  const [page, setPage] = useState<number>(1);

  const posts = [];
  for (let i = 0; i < page; i++) {
    posts.push(<PostsContainer key={i} page={i} url='/api/posts' />);
  }

  return (
    <div className='w-full min-h-full flex flex-col justify-between'>
      <div>
        <NewPost />
        {posts}
      </div>
      <MyButton
        onClick={() => { setPage(page + 1); }}
      >Load more...</MyButton>
    </div>
  );
}
