import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  messages?: Message[];
  className?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages = [
    {
      id: "1",
      sender: "ai",
      content: "Hello! How can I assist you today?",
      timestamp: new Date(Date.now() - 60000 * 5),
    },
    {
      id: "2",
      sender: "user",
      content: "I need help organizing my files.",
      timestamp: new Date(Date.now() - 60000 * 4),
    },
    {
      id: "3",
      sender: "ai",
      content:
        "I can help with that! You can use the file explorer on the left to create folders and upload files. Would you like me to explain how it works?",
      timestamp: new Date(Date.now() - 60000 * 3),
    },
    {
      id: "4",
      sender: "user",
      content: "Yes, please show me how to create a new folder.",
      timestamp: new Date(Date.now() - 60000 * 2),
    },
    {
      id: "5",
      sender: "ai",
      content:
        "To create a new folder, click on the 'New Folder' button in the file actions bar. You'll be prompted to enter a name for your folder. Once you've entered a name, click 'Create' and your new folder will appear in the file tree.",
      timestamp: new Date(Date.now() - 60000),
    },
  ],
  className = "",
}) => {
  // Format timestamp to readable time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat History</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar
                  className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {message.sender === "user" ? "U" : "AI"}
                  </div>
                </Avatar>

                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;
