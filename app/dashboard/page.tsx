"use client";
import React, { useState } from "react";
import UserAvatar from "../_components/Avatar";
import UploadModal from "../_components/UploadModal";
import UserProjects from "../_components/UserProjects";
import { LuLogOut } from "react-icons/lu";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const cookies = new Cookies();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-start items-center h-screen w-full gap-y-2 py-10">
      <div className="flex justify-center items-center gap-x-2">
        <div className="w-fit h-fit rounded-full ring ring-cyan-500 ">
          <UserAvatar />
        </div>
        <div
          className="rounded-full p-1 hover:bg-blue-900 hover:text-white cursor-pointer"
          onClick={() => {
            cookies.remove("chatpdf_token");
            router.push("/");
          }}
        >
          <LuLogOut size={18} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-5">
        <h1 className="font-bold text-5xl">PDF Buddy</h1>
        <span className="font-semibold text-2xl text-center px-3">
          Chat with the Future: Seamlessly Share and Discuss PDFs with AI
          Assistance!
        </span>
      </div>
      <UploadModal />
      <UserProjects />
    </div>
  );
};

export default Dashboard;
