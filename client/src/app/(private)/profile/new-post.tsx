import MyButton from '@/app/components/MyButton';
import { useState } from 'react';
import { mutate } from 'swr';

export default function NewPost ({ setLastPage }: {
  setLastPage: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  const [content, setContent] = useState<string>('');

  function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setContent(e.target.value);
  }

  async function handleSubmit (e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content })
    });

    if (res.ok) {
      await mutate((endpoint: string) => endpoint.startsWith('/api/posts'));
      setLastPage(false);
    }

    setContent('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-4'
    >
      <textarea
        rows={4}
        value={content}
        onChange={handleChange}
        placeholder='Reveal your secret...'
        className='w-full border-4 border-double border-[green] rounded-lg bg-[green] bg-opacity-20 p-4 resize-none outline-none placeholder:text-[green] placeholder:text-opacity-70'
      />
      <MyButton
        type='submit'
        disabled={content.length === 0}
      >Post</MyButton>
    </form>
  );
}
