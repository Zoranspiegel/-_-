'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import MyButton from '@/app/components/MyButton';

const userInitialState: SignupUser = {
  username: '',
  password: '',
  confirmPassword: ''
};

export default function SignupForm (): JSX.Element {
  const [userState, setUserState] = useState<SignupUser>(userInitialState);
  const [errorState, setErrorState] = useState<string[]>([]);
  const router = useRouter();

  function handleInputChange (e: ChangeEvent<HTMLInputElement>): void {
    setUserState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();
    setErrorState([]);

    if (userState.password !== userState.confirmPassword) {
      setErrorState(prevState => [...prevState, 'Passwords do not match']);
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(userState)
    });
    const resJSON = await res.json();
    if (res.ok) {
      router.push('/feed');
    } else {
      setErrorState(prevState => [...prevState, resJSON.error]);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=' flex flex-col justify-start items-center border-4 border-double border-[green] rounded-md bg-[rgba(0,0,0,0.7)] p-6 gap-6'
    >
      <div className=' flex flex-col'>
        <label className='font-bold'>Username:</label>
        <input
          type='text'
          name='username'
          value={userState.username}
          placeholder='User...'
          onChange={handleInputChange}
          className='border-4 border-double border-[green] rounded-md bg-transparent outline-none py-2 px-4 placeholder:text-[rgb(0,90,0)]'
        />
      </div>
      <div className=' flex flex-col'>
        <label className='font-bold'>Password:</label>
        <input
          type='password'
          name='password'
          value={userState.password}
          placeholder='Password...'
          onChange={handleInputChange}
          className='border-4 border-double border-[green] rounded-md bg-transparent outline-none py-2 px-4 placeholder:text-[rgb(0,90,0)]'
        />
      </div>
      <div className=' flex flex-col'>
        <label className='font-bold'>Confirm Password:</label>
        <input
          type='password'
          name='confirmPassword'
          value={userState.confirmPassword}
          placeholder='Confirm...'
          onChange={handleInputChange}
          className='border-4 border-double border-[green] rounded-md bg-transparent outline-none py-2 px-4 placeholder:text-[rgb(0,90,0)]'
        />
      </div>
      {errorState.length > 0 && (
        <ul>
          {errorState.map((error, i) => (
            <li
              key={i}
              className=' text-[rgb(180,0,0)] text-base list-disc'
            >{error}</li>
          ))}
        </ul>
      )}
      <MyButton type='submit'>Sign Up</MyButton>
    </form>
  );
}
