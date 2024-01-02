"use client";

import { ChatMessageInput } from "@/components/ChatMessageInput";
import ChatMessageItem from "@/components/ChatMessageItem";
import { useChatContext } from "@/contexts/ChatContext";
import useSSEDemo from "@/hooks/useSSEDemo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Chat() {
  const router = useRouter();
  const context = useChatContext();
  const params = new URLSearchParams({
    id: context.roomId!,
    name: context.displayName!,
  });
  useSSEDemo({
    path: `/api/sse?${params.toString()}`,
    onMessage: (event) => {
      context.onReceivedMessage(JSON.parse(event));
    },
    onClose: () => {},
  });

  useEffect(() => {
    if (!context.roomId || !context.displayName) {
      router.push("/");
    }
  }, []);
  return (
    <div className="max-w-xl lg:max-w-lg min-w-3.5">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Room
      </h2>
      <p className="mt-4 text-lg leading-8 text-gray-300">
        Here is your conversation history between participants.
      </p>
      <div className="flex flex-col gap-y-4 mt-4">
        {context.messages.map((message) => (
          <ChatMessageItem key={message.receivedAt} message={message} />
        ))}
      </div>
      <ChatMessageInput />
    </div>
  );
}
