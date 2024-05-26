import ChatInterface from "@/app/_components/ChatInterface";
import PdfViewer from "@/app/_components/PdfViewer";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-3">
      <PdfViewer />
      <ChatInterface />
    </div>
  );
};

export default page;
