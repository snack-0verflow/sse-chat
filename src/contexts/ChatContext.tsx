import React from "react";
import { ChatRoomMessage } from "./ChatReducer";

export class ChatContextProviderMissingError extends Error {
  constructor() {
    super(
      "ChatContextProvider not found. Make sure you wrap your app with it."
    );
  }
}

export type ChatContextProps = {
  roomId?: string;
  displayName?: string;
  messages: Array<ChatRoomMessage>;
  onUpdateDisplayName: (displayName: string) => void;
  onEnterRoom: (roomId: string) => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
  onReceivedMessage: (message: ChatRoomMessage) => void;
};

export const ChatContext = React.createContext<ChatContextProps | null>(null);

export function useChatContext() {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new ChatContextProviderMissingError();
  }
  return context;
}
