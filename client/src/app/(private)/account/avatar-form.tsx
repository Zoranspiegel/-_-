import { useState } from 'react';
import MyButton from '@/app/components/MyButton';
import { mutate } from 'swr';

interface Avatar {
  file: string | ArrayBuffer | null
  name: string
}

export default function AvatarForm ({ userID }: { userID: string }): JSX.Element {
  const [avatar, setAvatar] = useState<Avatar | null>(null);

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) return;

    const file: File = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setAvatar({
        file: base64String,
        name: file.name
      });
    };

    reader.readAsDataURL(new Blob([file]));
  }

  async function handleSubmit (e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const res = await fetch('/api/avatar', {
      method: 'POST',
      body: JSON.stringify({ avatar: avatar?.file, avatarName: avatar?.name.split('.')[0], userID })
    });

    if (res.ok) {
      await mutate((endpoint: string) => endpoint.startsWith('/api/users/profile'));
      setAvatar(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center'
    >
      <label
        htmlFor='upFile'
        className='border-4 border-double border-[green] rounded-md bg-transparent text-center text-[green] font-bold py-2 px-4
        hover:border-black hover:bg-[green] hover:text-black active:translate-y-1 cursor-pointer'
      >Upload Avatar</label>
      <input
        id='upFile'
        type='file'
        onChange={handleChange}
        className='hidden'
      />
      <div className='mb-4'>
        {avatar?.name
          ? (
              <span>{avatar.name}</span>
            )
          : (
              <span>Select File</span>
            )}
      </div>
      <MyButton
        type='submit'
      >Send</MyButton>
    </form>
  );
}
