import MyButton from '@/app/components/MyButton';
import { useState } from 'react';
// import { mutate } from 'swr';

export default function NewPost (): JSX.Element {
  const [post, setPost] = useState<string>('');

  function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setPost(e.target.value);
  }

  async function handleSubmit (e: React.FormEvent): Promise<void> {
    e.preventDefault();
    alert(post);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-6'
    >
      <textarea
        rows={4}
        value={post}
        onChange={handleChange}
        className='w-full border-4 border-double border-[green] rounded-lg bg-[green] bg-opacity-20 p-4 resize-none outline-none'
      />
      <MyButton
        type='submit'
        disabled={post.length === 0}
      >Post</MyButton>
    </form>
  );
}
