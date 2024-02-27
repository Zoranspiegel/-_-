import MyButton from '@/app/components/MyButton';
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
      <MyButton
        onClick={handleLogOut}
      >Log out</MyButton>
    </div>
  );
}
