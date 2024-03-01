import useSWR, { mutate } from 'swr';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl';

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
        <button
          disabled={isLoading}
          onClick={handleUnfollow}
          className='button'
        >
          <SlUserUnfollow size={25} className='text-[rgb(180,0,0)]'/>
        </button>
      )}
      {!following && (
        <button
          disabled={isLoading}
          onClick={handleFollow}
          className='button'
        >
          <SlUserFollow size={25} />
        </button>
      )}
    </div>
  );
}
