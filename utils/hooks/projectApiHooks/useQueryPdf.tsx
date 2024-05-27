"use client";
import { projectApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useQueryPdf = () => {
  const mutation = useMutation({
    mutationFn: async ({
      project_id,
      query,
    }: {
      project_id: string;
      query: string;
    }) => {
      return (await projectApi.get(`/query/${project_id}?query=${query}`))
        .data as { response: string };
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });
  return mutation;
};

export default useQueryPdf;
