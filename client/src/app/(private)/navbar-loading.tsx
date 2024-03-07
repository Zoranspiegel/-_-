export default function NavbarLoading (): JSX.Element {
  return (
    <nav
      className='w-full max-w-md h-[9vh] flex justify-evenly items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 text-lg font-bold'
    >
      <span>Feed</span>
      <span>Profile</span>
      <span>Following</span>
      <span>Followers</span>
    </nav>
  );
}
