export default function Footer (): JSX.Element {
  return (
    <footer>
      &copy; <span className='text-xs'>Мрачне тајне</span> {new Date().getFullYear()}
    </footer>
  );
}
