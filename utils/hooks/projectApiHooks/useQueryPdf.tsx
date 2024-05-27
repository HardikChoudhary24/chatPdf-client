"use client";
import { projectApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const useQueryPdf = () => {
  const cookies = new Cookies();
  const mutation = useMutation({
    mutationFn: async ({
      project_id,
      query,
    }: {
      project_id: string;
      query: string;
    }) => {
      return (
        await projectApi.get(`/query/${project_id}?query=${query}`, {
          headers: { Authorization: `Bearer ${cookies.get("chatpdf_token")}` },
        })
      ).data as { response: string };
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });
  return mutation;
};

export default useQueryPdf;
