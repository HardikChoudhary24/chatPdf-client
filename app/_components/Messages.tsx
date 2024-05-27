import { cn } from "@/lib/utils";
import React from "react";

const Messages = ({
  messages,
  showFetchingResponse,
}: {
  messages: MessageHistoryInterface[] | [];
  showFetchingResponse: boolean;
}) => {
  return (
    <div className="overflow-hidden w-full flex flex-col gap-3 justify-end py-2 pb-4 customScrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex w-full", { "justify-end": message.role === "User" })}
        >
          <div
            className={cn("px-2 py-1 rounded-lg", {
              "bg-blue-800 text-white shadow-md": message.role === "User",
              "bg-white border text-black shadow-md": message.role === "AI",
            })}
          >
            <p className="text-base font-medium">{message.message}</p>
          </div>
        </div>
      ))}
      {showFetchingResponse && (
        <div className={cn("flex")}>
          <div
            className={cn(
              "px-3 py-2 rounded-lg bg-white border text-black shadow-md"
            )}
          >
            <div className="loading-dots flex justify-center items-center gap-x-1">
              <div className="loading-dots--dot"></div>
              <div className="loading-dots--dot"></div>
              <div className="loading-dots--dot"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
