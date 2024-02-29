'use client';
import { useState } from 'react';
import useSWR from 'swr';
import UsersContainer from '@/app/components/UsersContainer';

export default function Following (): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const loggedUser: UserProfile = data;

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(
      <UsersContainer
        key={i}
        page={i}
        id={loggedUser.id}
        url={`/api/users/${loggedUser.id}/following`}
        lastPage={lastPage}
        setLastPage={setLastPage}
      />
    );
  }

  return (
    <div className='w-full min-h-full flex flex-col justify-between overflow-scroll'>
      <div>
        {pages}
      </div>
      <div className='flex flex-col pb-4'>
        <button
          disabled={lastPage}
          onClick={() => { setPage(page + 1); }}
          className='button'
        >Load more...</button>
      </div>
    </div>
  );
}
