import useSWR from 'swr';
import LoadingHeader from '../components/LoadingHeader';
import ErrorHeader from '../components/ErrorHeader';
import User from '../components/User';

export default function Header (): JSX.Element {
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <LoadingHeader />;
  if (error) return <ErrorHeader />;

  const user: UserProfile = data;

  return (
    <header
      className='w-full max-w-md min-h-20 flex justify-between items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-2'
    >
      <div className='px-4'>Мрачне тајне</div>
      <User user={user} personal={true} />
    </header>
  );
}
