"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IoFileTray } from "react-icons/io5";
import useCreateProject from "@/utils/hooks/projectApiHooks/useCreateProject";
import toast from "react-hot-toast";
import useGetSignedUrl from "@/utils/hooks/projectApiHooks/useGetSignedUrl";
import { useQueryClient } from "@tanstack/react-query";

const UploadModal = () => {
  const [projectName, setProjectName] = useState("");
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const {
    mutate: createProject,
    data: projectDetails,
    isPending: projectCreationPending,
    error,
  } = useCreateProject();
  const {
    mutate: getSignedUrl,
    data: signedUrl,
    isPending: pendingSignedUrl,
    error: errorGeneratingUrl,
  } = useGetSignedUrl();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleMedia = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target && e?.target?.files && e?.target?.files[0]) {
        const file: File | null | undefined = e.target.files[0];
        if (file?.type) {
          setFile(file);
          getSignedUrl(file.name);
        }
      }
      return;
    },
    [setFile]
  );

  const handleProjectCreation = () => {
    if (!projectName) return toast.error("Please provide a valid Project Name");
    if (!file) return toast.error("Upload a PDF to create a project");
    if (errorGeneratingUrl) return;
    if (signedUrl && signedUrl.url) {
      toast.loading("Creating your project", { id: "project-creation" });
      const url = new URL(signedUrl.url);
      createProject(
        { pdfUrl: `${url.origin}${url.pathname}`, name: projectName, file: file! },
        {
          onSuccess: () => {
            toast.success("Project Created", { id: "project-creation" });
            queryClient.invalidateQueries({ queryKey: ["all-projects"] });
            setOpen(false);
          },
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center gap-x-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-blue-950 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-900">Create a project</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Create a project and upload your pdf file to start interacting
              with it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-nowrap">
                Project Name
              </Label>
              <Input
                id="name"
                value={projectName}
                className="col-span-3"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div
              className="w-full h-fit p-1 bg-white shadow-lg rounded-lg cursor-pointer"
              onClick={handleUpload}
            >
              <div className="w-full h-[200px] border border-dashed border-blue-950 text-blue-950 rounded-lg bg-blue-50 flex justify-center items-center flex-col gap-y-2">
                {!file && <IoFileTray size={20} />}
                <span className="text-sm font-semibold">
                  {file ? file.name : "Drop PDF here"}
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={handleMedia}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleProjectCreation}
              disabled={pendingSignedUrl && projectCreationPending}
            >
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadModal;
