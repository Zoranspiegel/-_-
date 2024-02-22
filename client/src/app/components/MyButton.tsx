const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className='border-4 border-double border-[green] rounded-md bg-transparent text-center text-[green] font-bold py-2 px-4
        enabled:hover:border-black enabled:hover:bg-[green] enabled:hover:text-black enabled:active:translate-y-1 disabled:border-opacity-50 disabled:text-opacity-50'
    >{children}</button>
  );
};

export default MyButton;
