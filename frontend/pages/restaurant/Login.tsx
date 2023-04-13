import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { loginRestaurant } from "../../utils/gql";
import { login } from "../../utils/types";
import { Loading } from "../../components/utils/Loading";

export default function Login(){
    const {push} = useRouter();
    const [inputs, setInput] = useState<login>({
        email: "",
        password: "",
    });
    const [RestaurantLogin, {data, error, loading}] = useLazyQuery(loginRestaurant, {
        variables: {
            email:String, password:String
        }
    });

    useEffect(()=>{
        if(data){
            localStorage.setItem("user", JSON.stringify(data?.RestaurantLogin?.restaurant));
            localStorage.setItem("token", data?.RestaurantLogin?.token);
            localStorage.setItem("role", "restaurant");
            push("/restaurant");
        }
    }, [data]);
    const handlePassword = (e)=>{
        setInput((old)=>({...old, password: e.target.value}));
    }
    const handleEmail = (e)=>{
        setInput((old)=>({...old, email: e.target.value}));
    }
    const HandleForm = async(e)=>{
        e.preventDefault();
        RestaurantLogin({ variables: {email: inputs.email, password: inputs.password}});
    }
    const src = "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80";
    return (
        <>
            {(loading && !error) && <Loading /> }
            <Head>
                <title>employee login</title>
            </Head>
            <div className="w-screen h-screen flex">
                <div className="h-screen w-[50vw] flex flex-col justify-center items-center gap-5">
                    <p className="font-bold text-[25px]">Welcome to The Employee Login page</p>
                    <form className="flex flex-col gap-3" onSubmit={HandleForm}>
                        <label htmlFor="email" className="text-gray-700">Email</label>
                        <input onChange={(e)=>handleEmail(e)} placeholder="email" type="email" id="email" name="email" className="p-2 border-2 rounded-md w-[300px]"/>
                        <label htmlFor="password" className="text-gray-700">Password</label>
                        <input onChange={(e)=>handlePassword(e)} placeholder="password" type="password" id="password" name="password" className="p-2 border-2 rounded-md w-[300px]"/>
                        {error && <p className="text-red-500 font-bold text-center">{`${error}`}</p>}
                        <button className="w-[300px] text-white p-2 rounded-md bg-black mt-5">sign in</button>
                    </form>
                </div>
                <img src={src} className="h-screen w-[50vw]"/>
            </div>
        </>
    )
}