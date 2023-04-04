import Head from "next/head";
import { useRouter } from "next/router";
import SideBar from "../../../components/employee/sideBar";
import styles from "../../../styles/employee_index.module.css";
import HeaderRes from "../../../components/employee/HeaderRes";
import {GiFullPizza} from "react-icons/gi";
import Cart from "../../../components/employee/cart";

export default function restaurantEmployee(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    return (<>
        <Head>
            <title>restaurant</title>
        </Head>
        <main className="flex w-screen">
            <SideBar />
            <div className={["h-screen overflow-y-scroll relative", styles.width].join(" ")}>
                <Cart />
                <HeaderRes />
                <div className={["p-10", styles.width].join(" ")}>
                    <div className="flex gap-5 w-full overflow-x-scroll">
                    {[1,2,3,4,5,6,7, 8, 9, 10, 11, 12].map((item)=>(
                        <div key={item} className={`${item == 1 ? "bg-yellow-200" : ""} w-fit p-3 h-[150px] rounded-lg flex flex-col justify-between items-center`}>
                            <div className={`w-[80px] h-[80px] rounded-[50%] ${item == 1 ? "bg-gray-300" : "border-2"} flex justify-center items-center`}>
                                <GiFullPizza size={50} />
                            </div>
                            <span className={`${item == 1 ? "font-bold" : ""} text-[15px]`}>all</span>
                        </div>
                    ))}
                    </div>
                </div>
                {/* menus */}
                <div className="grid grid-cols-3 gap-5">
                        {[1,2,3,4,5,6].map((item)=>(
                            <div className=" justify-self-center place-self-center rounded-md border-[1px] border-black w-[250px] h-[250px] flex flex-col justify-center items-center gap-3 p-2" key={"menu-"+item}>
                                <img className="rounded-md h-[120px] w-[200px]" src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
                                <p className="text-[20px]">Pizza</p>
                                <div className="flex gap-5">
                                    <div className="w-fit flex flex-col justify-center items-center">
                                        <p className="text-[15px] text-gray-400">small</p>
                                        <p className="font-bold text-[15px]">20dh</p>
                                    </div>
                                    <div className="w-fit flex flex-col justify-center items-center">
                                        <p className="text-[15px] text-gray-400">small</p>
                                        <p className="font-bold text-[15px]">20dh</p>
                                    </div>
                                    <div className="w-fit flex flex-col justify-center items-center">
                                        <p className="text-[15px] text-gray-400">small</p>
                                        <p className="font-bold text-[12px]">20dh</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </main>
    </>);
}