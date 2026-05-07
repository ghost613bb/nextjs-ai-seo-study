"use client";
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push('/home/me')}>跳转到Home Me</button>
      <button onClick={() => router.push('/home/me2?id=123', { scroll: false })}>跳转到Home Me 2</button>
      
      <h1>Home</h1>
    </div>
  );
}