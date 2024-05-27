"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import Messages from "./Messages";
import useQueryPdf from "@/utils/hooks/projectApiHooks/useQueryPdf";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Loader } from "rsuite";

const ChatInterface = ({
  chat,
  project_id,
  setChat,
  isPending: loadingChats,
}: {
  chat: MessageHistoryInterface[] | [];
  project_id: string;
  setChat: React.Dispatch<React.SetStateAction<[] | MessageHistoryInterface[]>>;
  isPending: boolean;
}) => {
  const [query, setQuery] = useState("");
  const { mutate: queryPdf, data, isPending } = useQueryPdf();
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleQuery();
    }
  };
  const handleQuery = () => {
    queryPdf({ project_id, query });
    setChat((prev) => [
      ...prev,
      {
        role: "User",
        message: query,
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
      },
    ]);
    setQuery("");
  };

  useEffect(() => {
    if (data?.response) {
      setChat((prev) => [
        ...prev,
        {
          role: "AI",
          message: data.response,
          id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        },
      ]);
    }
  }, [data]);

  return (
    <div className="w-full h-full overflow-hidden col-span-2 shadow-lg rounded-lg border bg-white flex flex-col justify-end items-start p-4">
      <div className="w-full py-2 border-b-2 flex justify-start items-center gap-x-2">
        <div
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer"
        >
          <IoArrowBack color="black" size={20} />
        </div>
        <p className="text-xl font-semibold">Chat</p>
      </div>
      {loadingChats ? (
        <div className="w-full h-full overflow-hidden flex justify-center items-center gap-x-4">
          <Loader />
          <span className="text-sm font-semibold">Loading</span>
        </div>
      ) : (
        <div className="overflow-hidden h-full">
          <Messages messages={chat} showFetchingResponse={isPending} />
        </div>
      )}
      <div className="flex justify-start items-center w-full gap-x-3 py-2">
        <Input
          className="w-full outline-none border "
          placeholder="Ask any question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <Button onClick={handleQuery} disabled={query.length === 0}>
          <FaPaperPlane color="white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
