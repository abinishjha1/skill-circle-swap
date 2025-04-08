
import { Message, User } from "@/types";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  currentUserId: string;
  sender: User;
}

const ChatMessage = ({ message, currentUserId, sender }: ChatMessageProps) => {
  const isCurrentUser = message.senderId === currentUserId;
  const time = new Date(message.sentAt).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={cn("flex mb-4", isCurrentUser ? "justify-end" : "justify-start")}>
      {!isCurrentUser && (
        <img 
          src={sender.avatar} 
          alt={sender.name} 
          className="h-8 w-8 rounded-full mr-2 mt-1"
        />
      )}
      <div className="max-w-[75%]">
        <div
          className={cn(
            "rounded-lg px-4 py-2 inline-block",
            isCurrentUser
              ? "bg-skillswap-purple text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          )}
        >
          {message.content}
        </div>
        <div
          className={cn(
            "text-xs text-gray-500 mt-1",
            isCurrentUser ? "text-right" : "text-left"
          )}
        >
          {time}
        </div>
      </div>
      {isCurrentUser && (
        <img 
          src={sender.avatar} 
          alt={sender.name} 
          className="h-8 w-8 rounded-full ml-2 mt-1"
        />
      )}
    </div>
  );
};

export default ChatMessage;
