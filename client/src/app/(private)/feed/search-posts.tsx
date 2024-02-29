import { debounce } from 'lodash';
import { useRef } from 'react';

export default function SearchPosts ({ setSearch }: {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  function handleSetSearch (search: string): void {
    setSearch(search);
  }

  const debouncedSetSearch = debounce(handleSetSearch, 500);

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    debouncedSetSearch(e.target.value);
  }

  function handleClean (): void {
    if (ref.current) {
      ref.current.value = '';
      debouncedSetSearch('');
    }
  }

  return (
    <div className='relative'>
      <input
        ref={ref}
        type='text'
        onChange={handleChange}
        placeholder='Content...'
        className='searchInput'
      />
      <div className='absolute right-0 top-0'>
        <button
          className='buttonNoActive'
          onClick={handleClean}
        >X</button>
      </div>
    </div>
  );
}
