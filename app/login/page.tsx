// @ts-nocheck
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import Drawer from "@/components/Drawer";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

type InputType = "text" | "password";

const Login = (props: Props) => {
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = (data: any) => {
    const { email, password } = data;
    try {
      signIn("credentials", { email, password });
      router.back();
    } catch (error) {
      return error
    }
  };

  const [display, setDisplay] = useState<boolean>(false);
  const [eyeIcon, setEyeIcon] = useState<boolean>(false);

  const [inputType, setInputType] = useState<InputType>("password");

  const showEyeIcon = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "") {
      setDisplay(true);
      // setInputType("text");
    } else {
      setDisplay(false);
      // setInputType("password");
    }
  };

  const toggleEyeIcon = () => {
    setEyeIcon((prevState) => !prevState);
  };

  const changeInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  const session = useSession();
  const router = useRouter();
  session.status === "authenticated" && router.back();

  const registerSuccessMsg = searchParams.get('message')
  const loginErrorMsg = searchParams.get('error')
  console.log(loginErrorMsg)

  if (registerSuccessMsg) {
    toast.success(registerSuccessMsg, { duration: 4000, style: {marginTop: "3rem"}})
  } else if (loginErrorMsg) {
    toast.error(loginErrorMsg, { duration: 4000, style: {marginTop: "3rem"}})
  }
  return (
    <>
      <Toaster />
      <main className="flex items-center justify-center">
        <div className="mx-2 mt-10 w-[250px] space-y-5 lg:mt-20">
          {session?.status === "loading" && (
            <span className="loading loading-ring loading-lg"></span>
          )}
          <div>
            <h1 className="text-lg font-[600]">Login</h1>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => loginUser(data))}
          >
            <div className="flex flex-col">
              <label className="text-xs">Email</label>
              <input
                type="email"
                className="border border-main-text p-2 py-3 text-sm dark:text-neutral-900"
                placeholder="name@mail.com"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (mail) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        mail
                      ) || "Please enter a valid email.",
                  },
                })}
              />
            </div>
            {errors?.email?.message && (
              <small className="text-red-500">{errors?.email?.message}</small>
            )}
            <div className="flex flex-col">
              <label className="text-xs">Password</label>
              <div className="relative w-full">
                <input
                  type={inputType}
                  className="w-full border border-main-text p-2 py-3 text-sm dark:text-neutral-900"
                  onInput={showEyeIcon}
                  {...register("password", {
                    required: "Password is required.",
                    validate: {
                      minLength: (chars) =>
                        chars.length >= 5 ||
                        "Password should be more than 5 characters.",
                    },
                  })}
                />
                {eyeIcon ? (
                  <EyeIcon
                    className="absolute bottom-4 right-2 cursor-pointer dark:text-black"
                    width="12"
                    height="12"
                    style={{ display: display ? "block" : "none" }}
                    onClick={() => {
                      toggleEyeIcon();
                      changeInputType();
                    }}
                  />
                ) : (
                  <EyeOffIcon
                    className="absolute bottom-4 right-2 cursor-pointer dark:text-black"
                    width="12"
                    height="12"
                    style={{ display: display ? "block" : "none" }}
                    onClick={() => {
                      toggleEyeIcon();
                      changeInputType();
                    }}
                  />
                )}
              </div>
              {errors?.password?.message && (
                <small className="text-red-500">
                  {errors?.password?.message}
                </small>
              )}
            </div>
            <div>
              <Button
                text="Continue"
                className="btn-block btn-sm flex h-12 items-center justify-center px-4 py-2 text-sm font-[500] capitalize"
              />
            </div>
            <div className="space-y-4">
              <div className="divider">or</div>
              <button
                onClick={() => signIn("google")}
                type="button"
                className="btn-block btn-sm flex h-12 items-center justify-center gap-1 bg-[#448dd1] px-4 py-2 text-sm font-[500] text-white"
              >
                <Image src="/google-logo.svg" alt="" height={20} width={20} />
                Continue with Google
              </button>
            </div>
            <div className="text-center text-xs font-[400]">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-[600] text-brand-accent">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      {/* <Drawer /> */}
    </>
  );
};

export default Login;
