import MyButton from './MyButton';
import useSWR from 'swr';

export default function FollowButton ({
  id
}: {
  id: string
}): JSX.Element {
  const { data, isLoading, error } = useSWR(`/api/follows?user_id=${id}`);

  if (isLoading || error) return <div></div>;

  async function handleFollow (): Promise<void> {

  }

  async function handleUnfollow (): Promise<void> {

  }

  const following = data > 0;
  return (
    <div>
      {following && (
        <MyButton
          onClick={handleUnfollow}
        >Unfollow</MyButton>
      )}
      {!following && (
        <MyButton
          onClick={handleFollow}
        >Follow</MyButton>
      )}
    </div>
  );
}
