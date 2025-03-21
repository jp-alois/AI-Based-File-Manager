import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

interface FileTreeProps {
  data?: FileNode[];
  onSelectFile?: (file: FileNode) => void;
  selectedFileId?: string;
}

const FileTree = ({
  data = [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      children: [
        { id: "2", name: "Project Proposal.docx", type: "file" },
        { id: "3", name: "Budget.xlsx", type: "file" },
        {
          id: "4",
          name: "Research",
          type: "folder",
          children: [
            { id: "5", name: "Article1.pdf", type: "file" },
            { id: "6", name: "Notes.txt", type: "file" },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "Images",
      type: "folder",
      children: [
        { id: "8", name: "profile.jpg", type: "file" },
        { id: "9", name: "banner.png", type: "file" },
      ],
    },
    { id: "10", name: "README.md", type: "file" },
  ],
  onSelectFile = () => {},
  selectedFileId = "",
}: FileTreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({
    "1": true, // Documents folder expanded by default
    "7": true, // Images folder expanded by default
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const renderFileNode = (node: FileNode, level = 0) => {
    const isFolder = node.type === "folder";
    const isExpanded = expandedFolders[node.id];
    const isSelected = node.id === selectedFileId;

    return (
      <div key={node.id} className="w-full">
        <div
          className={cn(
            "flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer",
            isSelected && "bg-blue-100 dark:bg-blue-900",
          )}
          style={{ paddingLeft: `${level * 12 + 4}px` }}
          onClick={() =>
            isFolder ? toggleFolder(node.id) : onSelectFile(node)
          }
        >
          <span className="mr-1">
            {isFolder ? (
              isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            ) : null}
          </span>
          <span className="mr-2">
            {isFolder ? (
              isExpanded ? (
                <FolderOpen size={16} />
              ) : (
                <Folder size={16} />
              )
            ) : (
              <File size={16} />
            )}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate text-sm">{node.name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{node.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isFolder && isExpanded && node.children && (
          <div className="ml-2">
            {node.children.map((childNode) =>
              renderFileNode(childNode, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-auto bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md p-2">
      {data.map((node) => renderFileNode(node))}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4">
          <Folder size={48} className="mb-2 opacity-50" />
          <p className="text-sm">No files or folders</p>
          <Button variant="outline" size="sm" className="mt-4">
            Create Folder
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileTree;
