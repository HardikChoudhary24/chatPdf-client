"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-y-2">
      <div>
        <div className="rounded-full w-16 h-16 overflow-hidden p-2 bg-white shadow-lg border">
          <Image src={"/pdf1.png"} width={64} height={64} alt="pdf" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-5">
        <h1 className="font-bold text-5xl">PDF Buddy</h1>
        <span className="font-semibold text-2xl">
          Chat with the Future: Seamlessly Share and Discuss PDFs with AI
          Assistance!
        </span>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <Link href={"/login"}>
          <Button>Log in</Button>
        </Link>
        <Link href={"/signup"}>
          <Button>Sign up</Button>
        </Link>
      </div>
    </div>
  );
}
