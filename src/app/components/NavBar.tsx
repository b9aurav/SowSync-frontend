"use client"
import { useRouter } from "next/navigation";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {};

const NavBar = (props: Props) => {
    const router = useRouter();
  return (
    <div className="flex gap-2 w-full justify-center items-center p-2 variant-glass-surface rounded-b-2xl border border-[#2b334c] fixed top-0 left-0">
      <div className="btn-group variant-filled">
        <button onClick={() => router.push('/farmer')}>Farmers</button>
        <button onClick={() => router.push('/farm')}>Farms</button>
        <button onClick={() => router.push('/schedule')}>Schedules</button>
      </div>
      <ThemeToggleButton onToggle={()=>{document.querySelector('html')?.classList.toggle('dark')}}/>
    </div>
  );
};

export default NavBar;
