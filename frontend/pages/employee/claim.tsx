import Head from "next/head";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/employee_index.module.css";
import { AiFillBell, AiOutlineDown } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import { claim as type } from "../../utils/types";
import { useEffect, useState } from "react";
import { addComplain as gql} from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import axios from "axios";
import { classicNameResolver } from "typescript";
import { AuthEmployee } from "../../utils/authEmployee";
import { useRouter } from "next/router";
export default function Claim(){
    const [Mutation, {loading, data, error}] = useMutation(gql);
    const [claim, setClaim] = useState<type>({
        description: "",
        image: null,
    });
    const {push} = useRouter();
    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "employee")
                push("/");
    }, []);
    const handleInput = async(e)=>{
        if(!e.target.files)
            setClaim((old)=>({...old, [e.target.name]: e.target.value}));
        else{
            let tmp = (e.target.files[0]);
            await setClaim((old)=>({...old, image: tmp}));
        }
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(claim.image){
            const {data} = await axios.post("http://localhost:9003/api/uploadClaim", {
                claim: claim.image,
            }, { headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log(data);
            Mutation({
                variables: {
                    input: {
                        description: claim.description,
                        first_name: "aymane",
                        last_name: "belassiria",
                        image: data.message,
                    }
                }
            });
        }else{
            Mutation({
                variables: {
                    input: {
                        description: claim.description,
                        first_name: "aymane",
                        last_name: "belassiria",
                    },
                }
            });
        }
    }
    return (<>
            {loading && <Loading />}
            <Head>
                <title>claims</title>
            </Head>
            <main className="flex w-screen">
                <SideBar />
                <div className={["h-screen overflow-y-scroll flex", styles.width].join(" ")}>
                <form className="h-screen w-[50%] p-10" onSubmit={handleSubmit}>
                        {/* <div className="flex w-full gap-5 justify-end items-center">
                            <AiFillBell size={20}/>
                            <AiOutlineDown size={20}/>
                        </div> */}
                        <div className="w-full flex flex-col justify-center items-center mt-5 gap-5">
                            <p className="text-[20px] font-bold">make a complaint</p>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="problem">
                                    Problem
                                    <span className="text-red-500 font-bold">*</span>
                                </label>
                                <textarea onChange={handleInput} name="description" className="w-[300px] h-[150px] outline-none border-[2px] rounded-md"></textarea>
                            </div>
                            <div className="w-[300px] p-4 rounded-md text-white bg-blue-500 flex justify-center items-center">
                                <label htmlFor="image" className="flex flex-col justify-center items-center">
                                    <BsFillImageFill size={30}/>
                                    <p className="font-bold">upload image for this complaint</p>
                                </label>
                                <input onChange={handleInput} type="file" id="image" name="image" className="hidden" />
                            </div>
                            <button className="p-2 text-white rounded-md bg-black font-bold w-[300px] text-[16px] mt-4">send</button>
                        </div>
                    </form>
                    <img className="h-screen w-[50%]" src="https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
                </div>
            </main>
        </>);
}