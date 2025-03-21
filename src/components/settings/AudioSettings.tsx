import React from "react";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface AudioSettingsProps {
  voiceInput?: boolean;
  voiceOutput?: boolean;
  volume?: number;
  onVoiceInputChange?: (enabled: boolean) => void;
  onVoiceOutputChange?: (enabled: boolean) => void;
  onVolumeChange?: (value: number) => void;
}

const AudioSettings = ({
  voiceInput = false,
  voiceOutput = true,
  volume = 75,
  onVoiceInputChange = () => {},
  onVoiceOutputChange = () => {},
  onVolumeChange = () => {},
}: AudioSettingsProps) => {
  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-950 rounded-lg">
      <h3 className="text-lg font-medium">Audio Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="voice-input">Voice Input</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enable microphone for voice commands
            </p>
          </div>
          <Switch
            id="voice-input"
            checked={voiceInput}
            onCheckedChange={onVoiceInputChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="voice-output">Voice Output</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enable AI voice responses
            </p>
          </div>
          <Switch
            id="voice-output"
            checked={voiceOutput}
            onCheckedChange={onVoiceOutputChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="volume">Volume</Label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {volume}%
            </span>
          </div>
          <Slider
            id="volume"
            min={0}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={(values) => onVolumeChange(values[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;
