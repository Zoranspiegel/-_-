import { useRouter } from 'next/navigation';

export default function LogoutButton (): JSX.Element {
  const router = useRouter();

  async function handleLogOut (): Promise<void> {
    const res = await fetch('/api/logout');
    if (res.ok) {
      router.push('/');
    }
  }

  return (
    <div className='w-full flex flex-col'>
      <button
        onClick={handleLogOut}
        className='button'
      >Log out</button>
    </div>
  );
}
