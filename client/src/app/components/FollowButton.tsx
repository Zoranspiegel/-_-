import MyButton from './MyButton';
import useSWR, { mutate } from 'swr';

export default function FollowButton ({
  id
}: {
  id: string
}): JSX.Element {
  const { data, isLoading, error } = useSWR(`/api/follows?user_id=${id}`);

  if (isLoading || error) return <div></div>;

  async function handleFollow (): Promise<void> {
    const res = await fetch(`/api/follows?user_id=${id}`, {
      method: 'POST'
    });

    if (res.ok) {
      await mutate((key: string) => key.startsWith('/api/follows'));
    }
  }

  async function handleUnfollow (): Promise<void> {
    const res = await fetch(`/api/follows?user_id=${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      await mutate((key: string) => key.startsWith('/api/follows'));
    }
  }

  const following = data > 0;
  return (
    <div>
      {following && (
        <MyButton
          disabled={isLoading}
          onClick={handleUnfollow}
        >Unfollow</MyButton>
      )}
      {!following && (
        <MyButton
          disabled={isLoading}
          onClick={handleFollow}
        >Follow</MyButton>
      )}
    </div>
  );
}
