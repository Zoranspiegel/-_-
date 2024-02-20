const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className='border-4 border-double border-[green] rounded-md bg-transparent text-center text-[green] font-bold py-2 px-4
        hover:border-black hover:bg-[green] hover:text-black active:translate-y-1'
    >{children}</button>
  );
};

export default MyButton;
