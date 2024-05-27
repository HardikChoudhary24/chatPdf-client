"use client";
import { projectApi, userApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const useGetSignedUrl = () => {
  const cookies = new Cookies();
  const mutation = useMutation({
    mutationFn: async (pdfFileName: string) => {
      return (
        await projectApi.get(`/signedUrl/${pdfFileName}`, {
          headers: { Authorization: `Bearer ${cookies.get("chatpdf_token")}` },
        })
      ).data as {
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
