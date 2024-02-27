export default function Footer (): JSX.Element {
  return (
    <footer className='h-[2vh]'>
      &copy; <span className='text-xs'>Мрачне тајне</span> {new Date().getFullYear()}
    </footer>
  );
}
