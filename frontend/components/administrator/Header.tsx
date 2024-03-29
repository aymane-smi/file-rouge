import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export const Header = ()=>{
    const router = useRouter();
    const [toggle, setToggle] = useState<boolean>(false);
    const handleToggle = ()=>{
        setToggle(!toggle);
        console.log("clicked")
    }

    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/");
    };
    return (<div className="flex w-full justify-between items-center p-4">
        <p className="font-bold text-[25px]">
            Welcome, <span className="font-thin">admin</span>
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
    </div>);
}