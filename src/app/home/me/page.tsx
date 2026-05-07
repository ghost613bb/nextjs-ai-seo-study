"use client";
import { useSearchParams } from 'next/navigation';

export default function HomeMe() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  console.log(name);
  return (
    <div>
      <h1>Home Me</h1>
    </div>
  );
}