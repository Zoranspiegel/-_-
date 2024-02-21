export default function LoadingHeader (): JSX.Element {
  return (
    <div className='w-full max-w-md h-20 flex justify-between items-center border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-2'>
      <div className='px-4'>Мрачне тајне</div>
      <div className='flex items-center gap-2'>
        L04D1N6...
        <div className='border-2 border-[green] border-opacity-30 rounded-full w-[60px] h-[60px] overflow-hidden'>
        </div>
      </div>
    </div>
  );
}
