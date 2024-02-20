export default function PublicLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center'>
      { children }
    </main>
  );
}
