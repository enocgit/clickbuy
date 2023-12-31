// @ts-nocheck
"use client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import baseUrl from "@/baseUrl/baseUrl";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

type Props = {};

type InputType = "text" | "password";

type FormDataType = {
  name: string;
  email: string;
  password: string;
};

const Register = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const registerUser = async (data: FormDataType) => {
    const { name, email, password } = data;
    // hashpassowrd
    const hashedpassword = await bcrypt.hash(password, 10);

    const res = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password: hashedpassword,
      }),
    });

    let sentData;

    if (!res.ok) {
      // console.log("Couldn't fetch data")
      sentData = await res.clone().json();    // res.clone().json() because it can be consumed only once
      toast.error(sentData.message, {style: {marginTop: "3rem"}})
      return sentData
    }
    sentData = await res.clone().json();     // res.clone().json() because it can be consumed only once

    reset();
    router.push(`/login?message=${sentData.message}`);
  };

  return (
    <>
      <Toaster />
      <main className="flex items-center justify-center">
        <div className="mx-2 mt-10 w-[250px] space-y-5">
          <div>
            <h1 className="text-lg font-[600]">Register</h1>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => registerUser(data))}
          >
            <div className="flex flex-col">
              <label className="text-xs">Name</label>
              <input
                type="text"
                className="border border-main-text p-2 py-3 text-sm dark:text-neutral-900"
                placeholder="Jane Doe"
                {...register("name", {
                  required: "Name is required.",
                })}
              />
            </div>
            {errors?.name?.message && (
              <small className="text-red-500">{errors?.name?.message}</small>
            )}
            <div className="flex flex-col">
              <label className="text-xs">Email</label>
              <input
                type="email"
                className="border border-main-text p-2 py-3 text-sm dark:text-neutral-900"
                placeholder="name@mail.com"
                {...register("email", {
                  required: "Email is required.",
                  validate: {
                    matchPattern: (c) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(c) ||
                      "Please enter a valid email.",
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
                      minLength: (c) =>
                        c.length > 5 ||
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
                type="button"
                className="btn-block btn-sm flex h-12 items-center justify-center gap-1 bg-[#448dd1] px-4 py-2 text-sm font-[500] text-white"
                onClick={() => signIn()}
              >
                <Image src="/google-logo.svg" alt="" height={20} width={20} />
                Continue with Google
              </button>
            </div>
            <div className="text-center text-xs font-[400]">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="font-[600] text-brand-accent">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
