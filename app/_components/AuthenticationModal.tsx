"use client";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCircleExclamation } from "react-icons/fa6";
import { register } from "module";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import Image from "next/image";
import useCreateUser from "@/utils/hooks/userApiHooks/useCreateUser";
import useLogin from "@/utils/hooks/userApiHooks/useLogin";

const schema = z.object({
  email: z.string().email("Email address must be a valid email address."),
  password: z
    .string()
    .min(8, "Your password must contain 8 or more characters."),
  name: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

type formFields = {
  label: string;
  registerName: "email" | "password" | "name";
};
const signInFields: formFields[] = [
  { label: "Email", registerName: "email" },
  { label: "Password", registerName: "password" },
];
const signUpFields: formFields[] = [
  { label: "Name", registerName: "name" },
  ...signInFields,
];

const AuthenticationModal = () => {
  const pathName = usePathname();
  // const {data,mutate:joinRoom,isPending:joinRoomPending}=useJoinRoom();
  const router = useRouter();
  const [formFields, setFormFields] = useState<
    | {
        label: string;
        registerName: "email" | "password" | "name";
      }[]
    | undefined
  >(undefined);

  useEffect(() => {
    if (pathName.includes("/signup")) {
      setFormFields(signUpFields);
    } else {
      setFormFields(signInFields);
    }
  }, [pathName]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const { mutate: createUser, isPending, data: signupData } = useCreateUser();
  const {
    mutate: loginUser,
    isPending: loginPending,
    data: loginData,
  } = useLogin();

  const onSubmit: SubmitHandler<FormFields> = (formData) => {
    if (pathName === "/signup") {
      const { name, email, password } = formData;
      if (name && email && password) {
        createUser({ name, email, password });
      }
    }
    if (pathName === "/login") {
      const { email, password } = formData;
      if (email && password) {
        loginUser({ email, password });
      }
    }
  };

  useEffect(() => {
    if (signupData && signupData.success) {
      toast.success("Succesfully signed up!");
      router.push("/login");
    } else if (signupData && !signupData.success) {
      toast.error("Email already registered!");
    }
  }, [signupData]);

  useEffect(() => {
    if (loginData && loginData.token) {
      const cookies = new Cookies();
      cookies.set("chatpdf_token", loginData.token);
      toast.success("Succesfully logged in!");
      router.push("/dashboard");
    } else if (loginData && !loginData.token) {
      toast.error("Incorrect email or password.");
    }
  }, [loginData]);

  return (
    <div className="flex flex-col justify-start items-start rounded-xl bg-white px-5 py-10 w-[75%] sm:w-[45%] md:w-[25%] gap-y-4">
      <div className="w-full flex justify-center items-center">
        <div className="rounded-full w-16 h-16 overflow-hidden p-2 bg-white shadow-lg border ">
          <Image src={"/pdf1.png"} width={64} height={64} alt="pdf" />
        </div>
      </div>
      <div className="w-full">
        <p className="font-semibold text-2xl">
          {pathName === "/signup" ? "Sign Up" : "Sign In"}
        </p>
        <span className="font-normal text-[#555454]">
          to continue to PDF BUDDY
        </span>
      </div>
      <form
        action=""
        className="flex flex-col justify-start items-start gap-y-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields?.map((formField) => {
          return (
            <div
              className="flex flex-col justify-start items-start w-full gap-y-1"
              key={formField.label}
            >
              <label
                htmlFor={formField.registerName}
                className="text-[#302f2f] text-sm font-medium w-full"
              >
                {formField.label}
              </label>
              <input
                type={
                  formField.registerName === "password" ? "password" : "text"
                }
                id={formField.registerName}
                className={`text-sm rounded-md outline-none border border-1 border-[#d8d6d6] text-black px-2 w-full py-2 ${
                  errors[formField.registerName]?.message
                    ? "border-red-500"
                    : ""
                }`}
                {...register(formField.registerName)}
              />
              {errors[formField.registerName]?.message && (
                <div className="flex items-center gap-x-2">
                  <FaCircleExclamation color="#eb5555" />
                  <span className="text-red-500 text-xs">
                    {errors[formField.registerName]?.message}
                  </span>
                </div>
              )}
            </div>
          );
        })}
        <button
          className="rounded-md bg-black font-medium text-xs py-2 text-white w-full"
          type="submit"
        >
          {pathName === "/signup" ? "CONTINUE" : "LOG IN"}
        </button>
      </form>
      <div className="flex justify-start items-center gap-x-1">
        <p className="text-[#555454] text-xs">
          {pathName === "/signup"
            ? " Have an account?"
            : "Don't have an account?"}
        </p>
        <span
          className="text-xs font-medium cursor-pointer"
          onClick={() =>
            router.push(pathName === "/signup" ? "/login" : "/signup")
          }
        >
          {pathName === "/signup" ? "Sign in" : "Sign up"}
        </span>
      </div>
    </div>
  );
};

export default AuthenticationModal;
