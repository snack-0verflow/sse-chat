import { useChatContext } from "@/contexts/ChatContext";
import { ChatRoomMessage } from "@/contexts/ChatReducer";

export type ChatMessageItemProps = {
  message: ChatRoomMessage;
};

export default function ChatMessageItem(props: ChatMessageItemProps) {
  const { message } = props;
  const {displayName} = useChatContext();
  const senderInitial = message.sender.slice(0, 1).toUpperCase();
  const fromMe = message.sender === displayName;
  return (
    <div className={`flex flex-row items-center ${fromMe ? 'flex-row-reverse' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-orange-600 flex justify-center items-center">
        <span className="text-sm">{senderInitial.toUpperCase()}</span>
      </div>
      <span className="w-5 h-5 rounded-full">{}</span>
      <div>{message.text}</div>
    </div>
  );
}
