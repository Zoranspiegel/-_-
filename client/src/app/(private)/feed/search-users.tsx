import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import UserSearch from '@/app/components/UserSearch';
import { usePrivateContext } from '@/app/contexts/PrivateContext';

export default function SearchUsers (): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const userCtx = usePrivateContext();

  useEffect(() => {
    function handleClickOutside (e: MouseEvent): void {
      if (inputRef.current?.contains(e.target as Node) && users.length) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
    }
    addEventListener('click', handleClickOutside);

    return () => {
      removeEventListener('click', handleClickOutside);
    };
  });

  if (!userCtx) return <div className='flex'><input type='text' className='searchInput' placeholder='Loading...' /></div>;

  async function searchUsers (username: string): Promise<void> {
    const res = await fetch(`/api/users/search?username=${username}`);
    if (res.ok) {
      const resJSON: UserProfile[] = await res.json();
      if (resJSON.length) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
      setUsers(resJSON);
    } else {
      setUsers([]);
      setVisibility(false);
    }
  }

  const debouncedSearchUsers = debounce(searchUsers, 500);

  async function handleChange (e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    await debouncedSearchUsers(e.target.value);
  }

  function handleClear (): void {
    if (inputRef.current) {
      inputRef.current.value = '';
      setUsers([]);
      setVisibility(false);
    }
  }

  return (
    <div className='flex relative'>
      <div>
        <input
          ref={inputRef}
          type='text'
          onChange={handleChange}
          placeholder='Username...'
          className='searchInput'
        />
        <div className='absolute top-0 right-0'>
          <button
            onClick={handleClear}
            className='searchButton'
          >
            X
          </button>
        </div>
      </div>
      {visibility && (
        <ul className='min-w-[120%] flex flex-col absolute top-12 left-0 rounded-lg border-4 border-double border-[green] bg-[rgb(0,30,0)] bg-opacity-90 p-2 gap-2'>
          {users.map(user => (
            <li
              key={user.id}
              className='hover:bg-[green] hover:bg-opacity-30 hover:rounded-s-full'
            >
              <UserSearch
                user={user}
                personal={userCtx.id === user.id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
