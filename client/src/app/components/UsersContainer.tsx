import useSWR from 'swr';
import User from './User';

export default function UsersContainer ({
  url,
  id,
  page
}: {
  url: string
  id?: string
  page: number
}): JSX.Element {
  const { data, isLoading, error } = useSWR(() => `${url}?page=${page}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const user: UserProfile[] = data;
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
