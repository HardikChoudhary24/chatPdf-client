"use client";
import { projectApi, userApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetSignedUrl = () => {
  const mutation = useMutation({
    mutationFn: async (pdfFileName: string) => {
      return (await projectApi.get(`/signedUrl/${ pdfFileName }`)).data as {
        url: string;
      };
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });
  return mutation;
};

export default useGetSignedUrl;
