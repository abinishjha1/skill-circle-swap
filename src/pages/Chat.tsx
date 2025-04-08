
import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { getCurrentUser, mockChatThreads, mockMessages, mockUsers } from "@/utils/mockData";
import { Message, User } from "@/types";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const threadId = searchParams.get("thread");
  const currentUser = getCurrentUser();
  const [activeChat, setActiveChat] = useState<string | null>(threadId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  // Find chat threads for current user
  const userThreads = mockChatThreads.filter(thread => 
    thread.participants.includes(currentUser.id)
  );
  
  // Get messages for active chat
  useEffect(() => {
    if (activeChat) {
      // In a real app, this would be a database query
      const chatMessages = mockMessages.filter(
        msg => 
          (msg.senderId === currentUser.id && msg.receiverId === activeChat) ||
          (msg.senderId === activeChat && msg.receiverId === currentUser.id)
      );
      setMessages(chatMessages);
    }
  }, [activeChat, currentUser.id]);
  
  // Get user data for a given userId
  const getUserData = (userId: string): User => {
    return mockUsers.find(user => user.id === userId) || currentUser;
  };
  
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;
    
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeChat,
      content: newMessage,
      sentAt: new Date().toISOString(),
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Chat List */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">Conversations</h2>
                {userThreads.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No conversations yet</p>
                ) : (
                  <div className="space-y-2">
                    {userThreads.map(thread => {
                      const otherUserId = thread.participants.find(id => id !== currentUser.id) || "";
                      const otherUser = getUserData(otherUserId);
                      const lastMessage = thread.lastMessage;
                      
                      return (
                        <div 
                          key={thread.id} 
                          onClick={() => setActiveChat(otherUserId)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            activeChat === otherUserId 
                              ? "bg-skillswap-purple/10" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={otherUser.avatar} 
                              alt={otherUser.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="overflow-hidden">
                              <h3 className="font-medium">{otherUser.name}</h3>
                              {lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                  {lastMessage.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {!activeChat ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a conversation or start a new one
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <img 
                        src={getUserData(activeChat).avatar} 
                        alt={getUserData(activeChat).name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{getUserData(activeChat).name}</h3>
                        <p className="text-xs text-gray-500">{getUserData(activeChat).location}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map(message => (
                        <ChatMessage 
                          key={message.id} 
                          message={message} 
                          currentUserId={currentUser.id}
                          sender={getUserData(message.senderId)}
                        />
                      ))
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" className="bg-skillswap-purple hover:bg-skillswap-purple-dark">
                        <Send size={18} />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
