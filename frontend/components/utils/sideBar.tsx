import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsBasket, BsFillTelephoneFill } from "react-icons/bs";

export default function SideBar(){
    return (<nav className="w-[100px] bg-black h-screen text-white flex flex-col items-center justify-between py-5">
    <div className="flex flex-col gap-8">
        <Link href="/employee">
            <AiOutlineHome size={30}/>
        </Link>
        <Link href="/employee/cart">
            <BsBasket size={30}/>
        </Link>
    </div>
    <Link href="/employee/claim">
        <BsFillTelephoneFill size={30}/>
    </Link>
</nav>);
}