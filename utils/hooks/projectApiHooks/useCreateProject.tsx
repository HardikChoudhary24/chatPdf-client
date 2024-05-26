"use client";
import { projectApi, userApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateProject = () => {
  const mutation = useMutation({
    mutationFn: async (payload: CreateProjectPayload) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("pdf", payload.file);
        formData.append("pdfUrl", payload.pdfUrl);
      return (
        await projectApi.post("/create", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        })
      ).data as CreateProjectResponse;
    },
    onError: (err) => {
      toast.error("Something went wrong!", { id: "project-creation" });
    },
  });
  return mutation;
};

export default useCreateProject;
