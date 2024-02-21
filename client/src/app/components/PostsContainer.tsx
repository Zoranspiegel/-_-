import useSWR from 'swr';
import Post from './Post';

export default function PostsContainer ({
  page,
  url,
  username
}: {
  page: number
  url: string
  username?: string
}): JSX.Element {
  const { data: loggedUser, isLoading: userLoading, error: userError } = useSWR('/api/users/profile');
  const { data, isLoading, error } = useSWR(() => `${url}?page=${page}${username ? `&username=${username}` : ''}`);

  if (userLoading || isLoading) return <div>Loading...</div>;
  if (userError || error) return <div>Error</div>;

  const posts: Post[] = data;
  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          personal={post.id === loggedUser.id}
        />
      ))}
    </div>
  );
}
