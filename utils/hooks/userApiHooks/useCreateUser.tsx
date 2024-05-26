"use client";
import { userApi } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn:async (payload: CreateUserPayload) => {return (await userApi.post("/signup", payload)).data as CreateUserResponse;},
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });
  return mutation;
};

export default useCreateUser;
