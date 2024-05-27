"use client";
import { projectApi, userApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const useUploadPdf = () => {
  const mutation = useMutation({
    mutationFn: async ({
      signedUrl,
      file,
    }: {
      signedUrl: string;
      file: File;
    }) =>
      axios.put(`${signedUrl}`, file, {
        headers: {
          "Content-Type": "application/pdf",
        },
      }),
    onError: (err) => {
      toast.error("Something went wrong!", { id: "project-creation" });
    },
  });
  return mutation;
};

export default useUploadPdf;
