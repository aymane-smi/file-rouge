import { useRouter } from "next/router";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";


export default function Header(){
    const router = useRouter();
    const [toggle, setToggle] = useState<boolean>(false);
    const handleToggle = ()=>{
        setToggle(!toggle);
        console.log("clicked")
    }

    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className="w-full p-4 flex justify-between items-center border-b-2 border-black pb-10">
            <p className="text-[20px]">
                <span className="font-bold">Hello</span>, Aymane
            </p>

            <div className="flex justify-center items-center gap-5">
                <div className="flex flex-col items-end justify-center rlative">
                    <button onClick={handleToggle}>
                        <BsThreeDots size={20}/>
                    </button>
                    {toggle && <button onClick={logout} className="absolute top-[40px] flex gap-3 justify-center items-center mt-2 border rounded-md p-1">
                        <span>logout</span><BiLogOut size={20}/>
                    </button>}
                </div>

            </div>
        </div>
    );
}