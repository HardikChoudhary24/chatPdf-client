"use client";
import { projectApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetProjectDetails = () => {
  const mutation = useMutation({
    mutationFn: async (project_id: string) => {
      return (await projectApi.get(`/chat_history/${project_id}`))
        .data as ProjectDetailsResponse;
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });
  return mutation;
};

export default useGetProjectDetails;
