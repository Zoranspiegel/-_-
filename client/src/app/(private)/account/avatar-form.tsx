import { useState } from 'react';
import { mutate } from 'swr';

interface Avatar {
  file: string | ArrayBuffer | null
  name: string
}

export default function AvatarForm ({ userID }: { userID: string }): JSX.Element {
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files || !e.target.files[0]) return;

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
      setAvatar(null);
      await mutate((endpoint: string) => endpoint.startsWith('/api/users/profile'));
      setLoading(false);
    } else {
      const resJSON = await res.json();
      console.error(resJSON.error?.code);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center'
    >
      {loading && (
        <div className='flex flex-col items-center py-7 text-lg font-bold'>Loading...</div>
      )}
      {!loading && (
        <div className='flex flex-col items-center'>
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
          <div className='mb-4 w-[20rem] text-center'>
            {(avatar?.name)
              ? (
                  <span className='break-words'>{avatar.name}</span>
                )
              : (
                  <span>Select File</span>
                )}
          </div>
        </div>
      )}
      <button
        type='submit'
        disabled={avatar === null || loading}
        onClick={() => {
          setTimeout(() => {
            setLoading(true);
          }, 200);
        }}
        className='button'
      >Send</button>
    </form>
  );
}
