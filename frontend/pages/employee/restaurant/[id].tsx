import Head from "next/head";
import { useRouter } from "next/router";
import SideBar from "../../../components/employee/sideBar";
import styles from "../../../styles/employee_index.module.css";
import HeaderRes from "../../../components/employee/HeaderRes";
import {GiFullPizza} from "react-icons/gi";
import Cart from "../../../components/employee/cart";
import { useLazyQuery } from "@apollo/client";
import { getRestaurantById } from "../../../utils/gql";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/utils/Loading";

export default function restaurantEmployee(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const [MyQuery, {loading, data, error}] = useLazyQuery(getRestaurantById);
    const [category, setCategory] = useState<string>("");

    useEffect(()=>{
        if(router.query.id !== undefined){
            MyQuery({
                variables:{
                    id: parseInt(router.query.id),
                }
            });
        }
    }, [router]);
    return (<>
        <Head>
            <title>restaurant</title>
        </Head>
        <main className="flex w-screen">
            {loading ? <Loading /> : <>
            <SideBar />
            <div className={["h-screen overflow-y-scroll relative", styles.width].join(" ")}>
                <Cart />
                <HeaderRes />
                <div className={["p-10", styles.width].join(" ")}>
                    <div className="flex gap-5 w-full overflow-x-scroll">
                    {data?.getRestaurantById?.categories.map((item, i)=>(
                        <div onClick={()=>setCategory(item.name)} key={i} className={`${item == 1 ? "bg-yellow-200" : ""} w-fit p-3 h-[150px] rounded-lg flex flex-col justify-between items-center`}>
                            <div className={`w-[80px] h-[80px] rounded-[50%] ${item. == 1 ? "bg-gray-300" : "border-2"} flex justify-center items-center`}>
                                <img src={item.emoji} className="w-[40px] h-[40px]"/>
                            </div>
                            <span className={`${i == 1 ? "font-bold" : ""} text-[15px]`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                    </div>
                </div>
                {/* menus */}
                <div className="grid grid-cols-3 gap-5">
                        {data?.getRestaurantById?.categories?.map((item, i)=>(
                            item?.menus.map((item, i)=>(
                                <div className=" justify-self-center place-self-center rounded-md border-[1px] border-black w-[250px] h-[250px] flex flex-col justify-center items-center gap-3 p-2" key={"menu-"+item}>
                                    <img className="rounded-md h-[120px] w-[200px]" src={"http://localhost:9003/storage/menu/"+item?.image}/>
                                    <p className="text-[20px]">{item?.menu?.name}</p>
                                    <div className="flex gap-5">
                                        {item?.details?.map((item, i)=>(
                                            <div key={i} className="w-fit flex flex-col justify-center items-center">
                                                <p className="text-[15px] text-gray-400">{item.portion}</p>
                                                <p className="font-bold text-[15px]">{item.price}dh</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ))}
                </div>
            </div>
            </>}
        </main>
    </>);
}