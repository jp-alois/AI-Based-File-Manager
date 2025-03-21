import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  isAIProcessing?: boolean;
  voiceInputEnabled?: boolean;
  onToggleVoiceInput?: () => void;
}

const ChatInput = ({
  onSendMessage = () => {},
  isAIProcessing = false,
  voiceInputEnabled = false,
  onToggleVoiceInput = () => {},
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() && !isAIProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="resize-none min-h-[80px]"
          disabled={isAIProcessing}
        />
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isAIProcessing}
            size="icon"
            className="rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            onClick={onToggleVoiceInput}
            variant="outline"
            size="icon"
            className="rounded-full"
            type="button"
          >
            {voiceInputEnabled ? (
              <MicOff className="h-4 w-4 text-red-500" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {isAIProcessing && (
        <div className="text-sm text-gray-500 mt-2">
          AI is processing your request...
        </div>
      )}
    </div>
  );
};

export default ChatInput;
