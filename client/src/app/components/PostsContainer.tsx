import useSWR from 'swr';
import Post from './Post';

export default function PostsContainer ({
  page,
  url,
  username,
  search,
  lastPage,
  setLastPage
}: {
  page: number
  url: string
  username?: string
  search?: string
  lastPage: boolean
  setLastPage: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  const { data: loggedUser, isLoading: userLoading, error: userError } = useSWR('/api/users/profile');
  const { data, isLoading, error } = useSWR(() => `${url}?page=${page}${search ? `&content=${search}` : ''}${username ? `&username=${username}` : ''}`);

  if (userLoading || isLoading) return <div>Loading...</div>;
  if (userError || error) return <div>Error</div>;

  const posts: Post[] = data.pages;
  const last: boolean = data.last;

  setTimeout(() => {
    if (last && !lastPage) {
      setLastPage(true);
    }
  }, 100);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          personal={post.user_id === loggedUser.id}
        />
      ))}
    </div>
  );
}
