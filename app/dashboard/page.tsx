"use client";
import React, { useState } from "react";
import UserAvatar from "../_components/Avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadModal from "../_components/UploadModal";
import UserProjects from "../_components/UserProjects";


const Dashboard = () => {
  return (
    <div className="flex flex-col justify-start items-center h-screen w-full gap-y-2 py-10">
      <div className="w-fit h-fit rounded-full ring ring-cyan-500">
        <UserAvatar />
      </div>
      <div className="flex flex-col justify-center items-center gap-y-5">
        <h1 className="font-bold text-5xl">PDF Buddy</h1>
        <span className="font-semibold text-2xl">
          Chat with the Future: Seamlessly Share and Discuss PDFs with AI
          Assistance!
        </span>
      </div>
      <UploadModal/>
      <UserProjects/>
    </div>
  );
};

export default Dashboard;
