'use client';
import { useParams } from 'next/navigation';

export default function UserPage (): JSX.Element {
  const params = useParams();
  console.log(params);
  return (
    <div></div>
  );
}
