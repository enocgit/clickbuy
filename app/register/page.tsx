"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import baseUrl from "@/baseUrl/baseUrl";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

type Props = {};

type InputType = "text" | "password";

type FormDataType = {
  name: string;
  email: string;
  password: string;
}

const Register = (props: Props) => {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors }} = useForm()

  const [display, setDisplay] = useState<boolean>(false);
  const [eyeIcon, setEyeIcon] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("")

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
      const { name, email, password} = data
      // hashpassowrd
      const hashedpassword = await bcrypt.hash(password, 10)
      console.log(hashedpassword)

      const res = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: hashedpassword
        })
      })

      if (!res.ok) {
        // console.log("Couldn't fetch data")
        let data = await res.json()
        setServerErrorMessage(data.message)
      }

      reset()
      router.push("/login?message=success")
  }

  return (
    <main className="flex justify-center items-center">
      <div className="w-[250px] mx-2 mt-10 space-y-5">
      {serverErrorMessage && (<div className="alert alert-error text-xs rounded-lg">
        <span>{serverErrorMessage}</span>
      </div>)}
    
        <div>
          <h1 className="text-lg font-[600]">Register</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit((data) => registerUser(data))}>
          <div className="flex flex-col">
            <label className="text-xs">Name</label>
            <input
              type="text"
              className="text-xs border border-main-text p-2 dark:text-neutral-900"
              placeholder="Jane Doe"
              {...register("name", {
                required: "Name is required.",
              })}
            />
          </div>
          {errors?.name?.message && <small className="text-red-500">{errors?.name?.message}</small>}
          <div className="flex flex-col">
            <label className="text-xs">Email</label>
            <input
              type="email"
              className="text-xs border border-main-text p-2 dark:text-neutral-900"
              placeholder="name@mail.com"
              {...register("email", {
                required: "Email is required.",
                validate: {
                  matchPattern: (c) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(c) || "Please enter a valid email."
                }
              })}
            />
          </div>
          {errors?.email?.message && <small className="text-red-500">{errors?.email?.message}</small>}
          <div className="flex flex-col">
            <label className="text-xs">Password</label>
            <div className="w-full relative">
              <input
                type={inputType}
                className="text-xs border border-main-text p-2 dark:text-neutral-900 w-full"
                onInput={showEyeIcon}
                {...register("password", {
                  required: "Password is required.",
                  validate: {
                    minLength: (c) => c.length > 5 || "Password should be more than 5 characters."
                  }
                })}
              />
              {eyeIcon ? (
                <EyeIcon
                  className="absolute right-2 bottom-3 cursor-pointer"
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
                  className="absolute right-2 bottom-3 cursor-pointer"
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
            {errors?.password?.message && <small className="text-red-500">{errors?.password?.message}</small>}
          </div>
          <div>
            <Button
              text="Continue"
              className="btn-block btn-sm capitalize text-xs font-[500]"
            />
          </div>
          <div className="space-y-4">
            <div className="divider">or</div>
            <button
              type="button"
              className="flex justify-center items-center text-white gap-1 bg-[#448dd1] btn-block btn-sm text-xs capitalize font-[500]"
            >
              <Image src="/google-logo.svg" alt="" height={20} width={20} />
              Continue with Google
            </button>
          </div>
          <div className="text-center text-[0.7rem] font-[400]">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-brand-accent font-[600]">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
