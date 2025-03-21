import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileTree from "./FileTree";
import FileActions from "./FileActions";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

interface FileExplorerProps {
  initialData?: FileNode[];
  onFileSelect?: (file: FileNode) => void;
  isLoading?: boolean;
}

const FileExplorer = ({
  initialData = [
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
  onFileSelect = () => {},
  isLoading = false,
}: FileExplorerProps) => {
  const [data, setData] = useState<FileNode[]>(initialData);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleUpload = () => {
    // Mock implementation - would trigger file upload dialog
    console.log("Upload file triggered");
  };

  const handleCreateFolder = () => {
    // Mock implementation - would open dialog to create folder
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      const newFolder: FileNode = {
        id: `folder-${Date.now()}`,
        name: folderName,
        type: "folder",
        children: [],
      };
      setData([...data, newFolder]);
    }
  };

  const handleDelete = () => {
    // Mock implementation - would delete selected file/folder
    if (selectedFile) {
      const filteredData = data.filter((item) => item.id !== selectedFile.id);
      setData(filteredData);
      setSelectedFile(null);
    }
  };

  const handleRefresh = () => {
    // Mock implementation - would refresh file list from server
    console.log("Refreshing file list");
    // In a real implementation, this would fetch updated data from the server
  };

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
      <CardHeader className="py-3 px-4 border-b">
        <CardTitle className="text-lg font-medium">File Explorer</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-2">
          <FileTree
            data={data}
            onSelectFile={handleFileSelect}
            selectedFileId={selectedFile?.id}
          />
        </ScrollArea>
        <FileActions
          onUpload={handleUpload}
          onCreateFolder={handleCreateFolder}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
          isItemSelected={!!selectedFile}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
