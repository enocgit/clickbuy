"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

type InputType = "text" | "password";

const Login = (props: Props) => {
  const { register, handleSubmit, formState: { errors }} = useForm()

  const loginUser = (data: any) => {
  const { email, password } = data
  try {
    signIn("credentials", { email, password})
    router.push("/")
  } catch (error) {
    console.log(error)
  }

  }

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
  session.status === "authenticated" && router.push("/");

  return (
    <main className="flex justify-center items-center">
      <div className="w-[250px] mx-2 mt-10 lg:mt-20 space-y-5">
        {session?.status === "loading" && (
          <span className="loading loading-ring loading-lg"></span>
        )}
        <div>
          <h1 className="text-lg font-[600]">Login</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit((data) => loginUser(data))}>
          <div className="flex flex-col">
            <label className="text-xs">Email</label>
            <input
              type="email"
              className="text-xs border border-main-text p-2 dark:text-neutral-900"
              placeholder="name@mail.com"
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (mail) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail) || 'Please enter a valid email.'
                }
              })}
            />
          </div>
          {errors?.email?.message && (<small className="text-red-500">{errors?.email?.message}</small>)}
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
                    minLength: (chars) => chars.length >= 5 || "Password should be more than 5 characters."
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
              onClick={() => signIn("google")}
              type="button"
              className="flex justify-center items-center text-white gap-1 bg-[#448dd1] btn-block btn-sm text-xs capitalize font-[500]"
            >
              <Image src="/google-logo.svg" alt="" height={20} width={20} />
              Continue with Google
            </button>
          </div>
          <div className="text-center text-[0.7rem] font-[400]">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-brand-accent font-[600]">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
