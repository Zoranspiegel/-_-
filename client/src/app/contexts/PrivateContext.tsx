import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const PrivateContext = createContext<UserProfile | undefined>(undefined);

export default function PrivateContextProvider ({ children }: {
  children: React.ReactNode
}): JSX.Element {
  const router = useRouter();
  const { data, isLoading, error } = useSWR('/api/users/profile');

  if (isLoading) return <div>{children}</div>;

  if (error) {
    router.push('/');
  };

  return (
    <PrivateContext.Provider value={data}>
      {children}
    </PrivateContext.Provider>
  );
}

export function usePrivateContext (): UserProfile | undefined {
  return useContext(PrivateContext);
}
