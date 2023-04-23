import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillBell, AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export default function HeaderRes(){
    const router = useRouter();
    const [toggle, setToggle] = useState<boolean>(false);
    const handleToggle = ()=>{
        setToggle(!toggle);
        console.log("clicked")
    };

    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/");
    };
    return (
        <div className="w-full p-4 flex justify-between items-center border-b-2 border-black pb-10">
            <div className="">
                <p className="text-[30px] font-bold">
                    Restaurant
                </p>
                <p className="text-[15px] text-gray-400">Dreams food</p>
            </div>

            <div className="flex justify-center items-center gap-5">
            <button onClick={handleToggle}>
                        <BsThreeDots size={20}/>
                    </button>
                    {toggle && <button onClick={logout} className="absolute top-[50px] right-[10px] flex gap-3 justify-center items-center mt-2 border rounded-md p-1">
                        <span>logout</span><BiLogOut size={20}/>
                    </button>}
            </div>
        </div>
    );
}