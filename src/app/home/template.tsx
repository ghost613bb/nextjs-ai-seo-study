"use client";
import { useState, useEffect } from "react";

export default function HomeTemplate({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    console.log("Home Template mounted");
    return () => {
      console.log("Home Template unmounted");
    };
  }, []);
  return (
    <div>
      <h1>Home Template</h1>
      <button onClick={handleClick}>Click {count} times</button>
      {children}
    </div>
  );
}