import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AudioSettings from "./AudioSettings";
import APISettings from "./APISettings";
import { X } from "lucide-react";

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSaveAudioSettings?: (settings: {
    voiceInput: boolean;
    voiceOutput: boolean;
    volume: number;
  }) => void;
  onSaveApiKey?: (apiKey: string) => Promise<boolean>;
  initialAudioSettings?: {
    voiceInput: boolean;
    voiceOutput: boolean;
    volume: number;
  };
  initialApiKey?: string;
}

const SettingsDialog = ({
  open = true,
  onOpenChange = () => {},
  onSaveAudioSettings = () => {},
  onSaveApiKey = async () => true,
  initialAudioSettings = {
    voiceInput: false,
    voiceOutput: true,
    volume: 75,
  },
  initialApiKey = "",
}: SettingsDialogProps) => {
  const [activeTab, setActiveTab] = useState("audio");
  const [audioSettings, setAudioSettings] = useState(initialAudioSettings);

  const handleVoiceInputChange = (enabled: boolean) => {
    setAudioSettings((prev) => ({ ...prev, voiceInput: enabled }));
  };

  const handleVoiceOutputChange = (enabled: boolean) => {
    setAudioSettings((prev) => ({ ...prev, voiceOutput: enabled }));
  };

  const handleVolumeChange = (value: number) => {
    setAudioSettings((prev) => ({ ...prev, volume: value }));
  };

  const handleSaveAudioSettings = () => {
    onSaveAudioSettings(audioSettings);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl">Settings</DialogTitle>
            <DialogDescription>
              Configure your application preferences
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <Tabs
          defaultValue="audio"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="audio" className="space-y-4">
            <AudioSettings
              voiceInput={audioSettings.voiceInput}
              voiceOutput={audioSettings.voiceOutput}
              volume={audioSettings.volume}
              onVoiceInputChange={handleVoiceInputChange}
              onVoiceOutputChange={handleVoiceOutputChange}
              onVolumeChange={handleVolumeChange}
            />
            <DialogFooter>
              <Button onClick={handleSaveAudioSettings}>Save Changes</Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <APISettings onSave={onSaveApiKey} initialApiKey={initialApiKey} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
