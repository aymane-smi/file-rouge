import { AiFillBell, AiOutlineDown } from "react-icons/ai";

export default function Header(){
    return (
        <div className="w-full p-4 flex justify-between items-center border-b-2 border-black pb-10">
            <p className="text-[20px]">
                <span className="font-bold">Hello</span>, Aymane
            </p>

            <div className="flex justify-center items-center gap-5">
                <AiFillBell size={20}/>
                <AiOutlineDown size={20}/>
            </div>
        </div>
    );
}