import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-screen h-screen flex justify-center items-center">
        <text className=" text-2xl">Welcome to SowSync</text>
      </div>
    </main>
  );
}
