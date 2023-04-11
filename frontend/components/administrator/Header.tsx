import { AiOutlineDown } from "react-icons/ai";

export const Header = ()=>{
    return (<div className="flex w-full justify-between items-center p-4">
        <p className="font-bold text-[25px]">
            Welcome, <span className="font-thin">admin</span>
        </p>
        <div>
            <AiOutlineDown size={20}/>
        </div>
    </div>);
}