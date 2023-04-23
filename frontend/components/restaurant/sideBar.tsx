import Link from "next/link";
import { AiOutlineHome, AiOutlineOrderedList } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";

export default function SideBar(){
    return (<nav className="w-[100px] bg-black h-screen text-white flex flex-col items-center justify-between py-5">
    <div className="flex flex-col gap-8">
        <Link href="/restaurant">
            <AiOutlineHome size={30}/>
        </Link>
        <Link href="/restaurant/order">
            <AiOutlineOrderedList size={30} />
        </Link>
    </div>
    <Link href="/restaurant/edit">
        <BsFillGearFill size={30}/>
    </Link>
</nav>);
}