import React from 'react'
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Button"

type Props = {}

const Login = (props: Props) => {
    return (
        <main className='flex justify-center items-center'>
            <div className="w-[250px] mx-2 mt-10 lg:mt-20 space-y-5">
                <div>
                    <h1 className="text-lg font-[600]">Login</h1>
                </div>
                <form className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-xs">Email</label>
                        <input type="email" className="text-xs border border-main-text p-2" placeholder="name@mail.com" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs">Password</label>
                        <input type="password" className="text-xs border border-main-text p-2"/>
                    </div>
                    <div>
                        <Button text="Continue" className="btn-block btn-sm capitalize text-xs font-[500]" />
                    </div>
                    <div className="space-y-4">
                    <div className="divider">or</div>
                        <button type="button" className="flex justify-center items-center text-white gap-1 bg-[#448dd1] btn-block btn-sm text-xs capitalize font-[500]">
                        <Image src="/google-logo.svg" alt="" height={20} width={20}/>
                            Sign in with Google
                        </button>
                    </div>
                    <div className="text-center text-[0.7rem] font-[400]">
                        <p>Don&apos;t have an account? <Link href="/register"className="text-brand-accent font-[600]">Sign up here</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login