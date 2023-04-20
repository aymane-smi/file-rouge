import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsBasket, BsFillTelephoneFill } from "react-icons/bs";
import { GlobalCartContext } from "../../lib/context";

export default function SideBar(){
    const { setOpen } = GlobalCartContext();
    return (<nav className="w-[100px] bg-black h-screen text-white flex flex-col items-center justify-between py-5">
    <div className="flex flex-col gap-8">
        <Link href="/employee">
            <AiOutlineHome size={30}/>
        </Link>
        <BsBasket size={30} onClick={()=>setOpen((old : boolean)=>!old)}/>
    </div>
    <Link href="/employee/claim">
        <BsFillTelephoneFill size={30}/>
    </Link>
</nav>);
}