"use client";
import { userApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return (await userApi.post("/login", payload)).data as LoginResponse;
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};

export default useLogin;
