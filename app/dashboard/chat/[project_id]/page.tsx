"use client";
import ChatInterface from "@/app/_components/ChatInterface";
import PdfViewer from "@/app/_components/PdfViewer";
import { Skeleton } from "@/components/ui/skeleton";
import useGetProjectDetails from "@/utils/hooks/projectApiHooks/useGetProjectDetails";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type props = {
  params: { project_id: string };
};
// const messages: MessageHistoryInterface[] = [
//   { id: 1, message: "Hi", role: "User", created_at: new Date() },
//   {
//     id: 2,
//     message: "Hello! How can I help you today?",
//     role: "AI",
//     created_at: new Date(),
//   },
//   {
//     id: 3,
//     message: "I need assistance with my project.",
//     role: "User",
//     created_at: new Date(),
//   },
//   {
//     id: 4,
//     message:
//       "Sure, I can help with that. What specifically do you need help with?",
//     role: "AI",
//     created_at: new Date(),
//   },
//   {
//     id: 5,
//     message: "I am having trouble with the project setup.",
//     role: "User",
//     created_at: new Date(),
//   },
//   {
//     id: 6,
//     message:
//       "Let's start with the basics. Have you installed all the necessary dependencies?",
//     role: "AI",
//     created_at: new Date(),
//   },
//   { id: 7, message: "Yes, I have.", role: "User", created_at: new Date() },
//   {
//     id: 8,
//     message: "Great! Can you describe the issue you're encountering?",
//     role: "AI",
//     created_at: new Date(),
//   },
// ];
const Chat = ({ params }: props) => {
  const router = useRouter();
  const [chat, setChat] = useState<MessageHistoryInterface[] | []>([]);
  const [url, setUrl] = useState<string>("");
  const { mutate, data, isPending } = useGetProjectDetails();

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
    <div className="w-full overflow-hidden h-screen grid grid-cols-4 p-4 gap-x-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
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
  );
};

export default Chat;
