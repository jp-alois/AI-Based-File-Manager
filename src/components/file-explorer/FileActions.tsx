import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FolderPlus, Upload, Trash2, RefreshCw } from "lucide-react";

interface FileActionsProps {
  onUpload?: () => void;
  onCreateFolder?: () => void;
  onDelete?: () => void;
  onRefresh?: () => void;
  isItemSelected?: boolean;
  isLoading?: boolean;
}

const FileActions = ({
  onUpload = () => console.log("Upload clicked"),
  onCreateFolder = () => console.log("Create folder clicked"),
  onDelete = () => console.log("Delete clicked"),
  onRefresh = () => console.log("Refresh clicked"),
  isItemSelected = false,
  isLoading = false,
}: FileActionsProps) => {
  return (
    <div className="flex items-center justify-between p-2 border-t bg-gray-50 w-full">
      <div className="flex space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onUpload}
                disabled={isLoading}
              >
                <Upload size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCreateFolder}
                disabled={isLoading}
              >
                <FolderPlus size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new folder</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                disabled={!isItemSelected || isLoading}
              >
                <Trash2
                  size={18}
                  className={isItemSelected ? "text-red-500" : "text-gray-400"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete selected item</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
              className={isLoading ? "animate-spin" : ""}
            >
              <RefreshCw size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh file list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FileActions;
