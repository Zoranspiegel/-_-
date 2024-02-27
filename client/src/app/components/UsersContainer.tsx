import useSWR from 'swr';
import User from './User';

export default function UsersContainer ({
  url,
  id,
  page,
  lastPage,
  setLastPage
}: {
  url: string
  id?: string
  page: number
  lastPage: boolean
  setLastPage: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  const { data, isLoading, error } = useSWR(() => `${url}?page=${page}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const user: UserProfile[] = data.pages;
  const last: boolean = data.last;

  setTimeout(() => {
    if (last && !lastPage) {
      setLastPage(true);
    }
  }, 100);
  return (
    <div>
      {user?.map(user => (
        <User
          key={user.id}
          user={user}
          personal={user.id === id}
        />
      ))}
    </div>
  );
}
