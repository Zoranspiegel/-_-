import { useEffect, useState, useRef } from 'react';
import { BsThreeDotsVertical, BsFillTrash3Fill, BsPencilSquare, BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { mutate } from 'swr';

export default function PostOptions ({ id }: {
  id: string
}): JSX.Element {
  const optionsRef = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);
  const [optionsVisibility, setOptionsVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside (e: MouseEvent): void {
      if (optionsRef.current && optionsVisibility && !deleteRef.current?.contains(e.target as Node) && !deleteVisibility && !optionsRef.current.contains(e.target as Node)) {
        setOptionsVisibility(false);
      }
    }

    addEventListener('click', handleClickOutside);

    return () => {
      removeEventListener('click', handleClickOutside);
    };
  });

  async function deletePost (): Promise<void> {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      await mutate((endpoint: string) => endpoint.startsWith('/api/posts'));
    }
  }

  return (
    <div className='relative'>
      <BsThreeDotsVertical
        size={20}
        onClick={() => {
          setTimeout(() => { setOptionsVisibility(true); }, 10);
        }}
        className='cursor-pointer'
      />
      {optionsVisibility && (
        <div
          ref={optionsRef}
          className='absolute top-0 right-0 w-10 flex flex-col border-[green] border-4 border-double rounded-md bg-[rgb(0,20,0)] p-2 gap-6'
        >
          <BsPencilSquare
            className='cursor-pointer'
          />
          <BsFillTrash3Fill
            onClick={ () => { setDeleteVisibility(true); } }
            className='cursor-pointer'
          />
        </div>
      )}
      {deleteVisibility && (
        <div
          ref={deleteRef}
          className='absolute right-10 top-0 w-60 border-[green] border-4 border-double rounded-lg bg-[rgb(0,20,0)] p-2 text-center'
        >
          <p className='mb-3'>Confirm deletion</p>
          <div className='flex justify-evenly'>
            <BsCheckSquare
              size={20}
              onClick={deletePost}
              className='cursor-pointer'
            />
            <BsXSquare
              size={20}
              onClick={() => { setDeleteVisibility(false); }}
              className='cursor-pointer'
            />
          </div>
        </div>
      )}
    </div>
  );
}
