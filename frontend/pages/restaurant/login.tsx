import Head from "next/head";
import Image from "next/image";

export default function login(){
    const src = "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80";
    return (
        <>
            <Head>
                <title>restaurant login</title>
            </Head>
            <div className="w-screen h-screen flex">
                <div className="h-screen w-[50vw] flex flex-col justify-center items-center gap-5">
                    <p className="font-bold text-[25px]">Welcome to The Restaurant Login page</p>
                    <form className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-gray-700">Email</label>
                        <input placeholder="email" type="email" id="email" name="email" className="p-2 border-2 rounded-md w-[300px]"/>
                        <label htmlFor="password" className="text-gray-700">Password</label>
                        <input placeholder="password" type="password" id="password" name="password" className="p-2 border-2 rounded-md w-[300px]"/>
                        <button className="w-[300px] text-white p-2 rounded-md bg-black mt-5">sign in</button>
                    </form>
                </div>
                <img src={src} className="h-screen w-[50vw]"/>
            </div>
        </>
    )
}