import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
  initialMessages?: Message[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = "",
  initialMessages = [
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
  ],
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(false);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI processing
    setIsAIProcessing(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `I've received your message: "${content}". How can I help you further with this request?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsAIProcessing(false);
    }, 1500);
  };

  const handleToggleVoiceInput = () => {
    setVoiceInputEnabled((prev) => !prev);
    // In a real implementation, this would initialize or stop voice recognition
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      <div className="flex-1 overflow-hidden">
        <ChatHistory messages={messages} className="h-full" />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        isAIProcessing={isAIProcessing}
        voiceInputEnabled={voiceInputEnabled}
        onToggleVoiceInput={handleToggleVoiceInput}
      />
    </div>
  );
};

export default ChatInterface;
