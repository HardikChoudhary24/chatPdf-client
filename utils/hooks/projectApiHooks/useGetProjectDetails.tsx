"use client";
import { projectApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const useGetProjectDetails = () => {
  const cookies = new Cookies();
  const mutation = useMutation({
    mutationFn: async (project_id: string) => {
      return (
        await projectApi.get(`/chat_history/${project_id}`, {
          headers: { Authorization: `Bearer ${cookies.get("chatpdf_token")}` },
        })
      ).data as ProjectDetailsResponse;
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });
  return mutation;
};

export default useGetProjectDetails;
