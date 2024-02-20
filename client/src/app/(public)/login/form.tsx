'use client';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import MyButton from '@/app/components/MyButton';

const userInitialState: LoginUser = {
  username: '',
  password: ''
};

export default function LoginForm (): JSX.Element {
  const [userState, setUserState] = useState<LoginUser>(userInitialState);
  const [errorState, setErrorState] = useState<string[]>([]);

  function handleInputChange (e: ChangeEvent<HTMLInputElement>): void {
    setUserState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();
    setErrorState([]);

    alert(`USER: ${userState.username}\nPASS: ${userState.password}`);
    setUserState(userInitialState);
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
      <MyButton
        type='submit'
      >Log In</MyButton>
    </form>
  );
}
