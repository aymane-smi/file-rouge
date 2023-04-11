import { AiOutlineDown } from "react-icons/ai";

export const HeaderRes = ({toggle})=>{
    return (<div className="flex w-full justify-between items-center p-4">
        <p className="font-bold text-[25px]">
            Welcome, <span className="font-thin">admin</span>
        </p>
        <div className="flex justify-center items-center gap-4">
            <button onClick={toggle} className="p-2 bg-black text-white font-semibold rounded-md">add new restaurant</button>
            <AiOutlineDown size={20}/>
        </div>
    </div>);
}