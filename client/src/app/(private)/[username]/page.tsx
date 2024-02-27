'use client';
import { notFound, useParams } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import ProfileHeader from './profile-header';
import MyButton from '@/app/components/MyButton';
import PostsContainer from '@/app/components/PostsContainer';

export default function UserPage (): JSX.Element {
  const { username }: { username: string } = useParams();
  const { data, isLoading, error } = useSWR(() => `/api/users?username=${username}`);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    notFound();
  };

  const user: UserProfile = data;

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(
      <PostsContainer
        key={i}
        url='/api/posts'
        page={i}
        username={user.username}
        lastPage={lastPage}
        setLastPage={setLastPage}
      />
    );
  }

  return (
    <div className='w-full min-h-full flex flex-col justify-start'>
      <ProfileHeader
        user={user}
      />
      <div className='my-4'>
        <hr className='border-dotted border-2 border-[green]'/>
      </div>
      <div className='w-full flex flex-grow flex-col justify-between pb-4 overflow-scroll'>
        {pages}
        <MyButton
          disabled={lastPage}
          onClick={() => { setPage(page + 1); }}
        >Load More...</MyButton>
      </div>
    </div>
  );
}
