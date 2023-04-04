import { AiFillBell, AiOutlineDown, AiOutlineSearch } from "react-icons/ai";

export default function HeaderRes(){
    return (
        <div className="w-full p-4 flex justify-between items-center border-b-2 border-black pb-10">
            <div className="">
                <p className="text-[30px] font-bold">
                    Restaurant
                </p>
                <p className="text-[15px] text-gray-400">Dreams food</p>
            </div>

            <div className="flex justify-center items-center gap-5">
                <div className="p-1 border-2 rounded-md flex items-center gap-3 px-3">
                    <AiOutlineSearch size={20}/>
                    <input type="text" className="border-none outline-none"/>
                </div>
                <AiFillBell size={20}/>
                <span>Belassiria Aymane</span>
                <AiOutlineDown size={20}/>
            </div>
        </div>
    );
}