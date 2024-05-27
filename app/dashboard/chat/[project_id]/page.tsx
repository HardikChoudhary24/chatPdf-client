"use client";
import ChatInterface from "@/app/_components/ChatInterface";
import PdfViewer from "@/app/_components/PdfViewer";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useGetProjectDetails from "@/utils/hooks/projectApiHooks/useGetProjectDetails";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { IoChatboxSharp } from "react-icons/io5";
type props = {
  params: { project_id: string };
};

const Chat = ({ params }: props) => {
  const router = useRouter();
  const [chat, setChat] = useState<MessageHistoryInterface[] | []>([]);
  const [url, setUrl] = useState<string>("");
  const { mutate, data, isPending } = useGetProjectDetails();
  const [view, setView] = useState<"Pdf" | "Chat">("Chat");

  useEffect(() => {
    if (params.project_id) {
      mutate(params.project_id);
    }
  }, [params]);

  useEffect(() => {
    if (data?.projectDetails) {
      setChat(data.chatHistory);
      setUrl(data.projectDetails.pdfurl);
    }
  }, [data]);

  return (
    <div className="h-screen w-screen">
      <div className="hidden lg:grid w-full overflow-hidden h-screen grid-cols-4 p-4 gap-x-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        {isPending ? (
          <div className="w-full h-full col-span-2 shadow-lg rounded-lg border bg-white overflow-hidden p-1">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ) : (
          <PdfViewer pdfurl={url} />
        )}
        <ChatInterface
          chat={chat}
          project_id={params.project_id}
          setChat={setChat}
          isPending={isPending}
        />
      </div>
      <div>
        <div className="lg:hidden w-full overflow-hidden h-screen p-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative">
          {view === "Chat" && (
            <div
              className={cn(
                "rounded-full p-4 bg-white border shadow-lg absolute top-8 right-5 flex justify-center items-center"
              )}
              onClick={() => setView("Pdf")}
            >
              <FaFilePdf size={20} />
            </div>
          )}
          {view === "Pdf" && (
            <div className="w-fit h-fit py-2 px-2 bg-white text-sm font-semibold my-2 rounded-lg" onClick={()=>setView("Chat")}>
              Go Back to chats
            </div>
          )}
          {view === "Pdf" &&
            (isPending ? (
              <div className="w-full h-full col-span-2 shadow-lg rounded-lg border bg-white overflow-hidden p-1">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ) : (
              <PdfViewer pdfurl={url} />
            ))}
          {view === "Chat" && (
            <ChatInterface
              chat={chat}
              project_id={params.project_id}
              setChat={setChat}
              isPending={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
