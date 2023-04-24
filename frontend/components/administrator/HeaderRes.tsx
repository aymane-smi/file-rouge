import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export const HeaderRes = ({toggle})=>{
    const router = useRouter();
    const [t, setToggle] = useState<boolean>(false);
    const handleToggle = ()=>{
        setToggle(!t);
        console.log("clicked")
    };

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
        <div className="flex justify-center items-center gap-4">
            <button onClick={toggle} className="p-2 bg-black text-white font-semibold rounded-md">add new employee</button>
            <div className="flex justify-center items-center gap-5">
            <button onClick={handleToggle}>
                        <BsThreeDots size={20}/>
                    </button>
                    {t && <button onClick={logout} className="absolute top-[50px] right-[10px] flex gap-3 justify-center items-center mt-2 border rounded-md p-1">
                        <span>logout</span><BiLogOut size={20}/>
                    </button>}
            </div>
        </div>
    </div>);
}