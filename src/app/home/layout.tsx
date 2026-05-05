"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    console.log("Home Layout mounted");
    return () => {
      console.log("Home Layout unmounted");
    };
  }, []);
  return (
    <div>
      <h1>Home Layout</h1>
      <button onClick={handleClick}>Click {count} times</button>
      {children}
      <Link href="/home/me" className="text-blue-500">Home Me</Link>
      <Link href="/home/me2" className="text-red-500">Home Me 2</Link>
    </div>
  );
}