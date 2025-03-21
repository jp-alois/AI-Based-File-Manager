import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Settings } from "lucide-react";
import AudioSettings from "../settings/AudioSettings";
import APISettings from "../settings/APISettings";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "AI Assistant" }: HeaderProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="w-full h-[60px] border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Settings</h2>
            <AudioSettings />
            <APISettings />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
