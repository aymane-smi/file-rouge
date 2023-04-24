import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BiRestaurant } from "react-icons/bi";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import {FaList} from "react-icons/fa";

export default function SideBar(){
    return (<nav className="w-[100px] bg-black h-screen text-white flex flex-col items-center justify-between py-5">
    <div className="flex flex-col gap-8">
        <Link href="/administrator">
            <AiOutlineHome size={30}/>
        </Link>
        <Link href="/administrator/employee">
            <BsFillPersonFill size={30} />
        </Link>
        <Link href="/administrator/restaurant">
            <BiRestaurant size={30} />
        </Link>
        <Link href="/administrator/bill">
            <FaList size={30}/>
        </Link>
    </div>
    <Link href="/administrator/edit">
        <BsFillGearFill size={30}/>
    </Link>
</nav>);
}