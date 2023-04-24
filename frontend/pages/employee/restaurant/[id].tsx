'use client';

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
import { cart } from "../../../utils/types";
import { GlobalCartContext } from "../../../lib/context";
import { toast } from "react-toastify";
import { AuthEmployee } from "../../../utils/authEmployee";

export default function RestaurantEmployee(){
    const router = useRouter();
    const [MyQuery, {loading, data, error}] = useLazyQuery(getRestaurantById);
    const [category, setCategory] = useState<string>("");
    const [categories, setCategories] = useState(null);

    const { setCart } = GlobalCartContext();
    const {push} = useRouter();
    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "employee")
                push("/");
        if(router.query.id !== undefined){
            MyQuery({
                variables:{
                    id: parseInt(router.query.id),
                }
            });
        }
    }, [router]);

    useEffect(()=>{
        setCategories(data?.getRestaurantById?.categories);
        if(categories !== null)
            console.log(categories);
    },[data]);

    const addToCart = (name: string, image: string, id: string, price: number, portion: string, detail: string)=>{
        console.log(detail);
        setCart((old)=>{
            old.push({
                id: parseInt(id),
                name,
                image,
                price,
                portion,
                quantity: 1,
                detail_id: parseInt(detail),
            });
            return old;
        });
    }
    return (<>
        <Head>
            <title>restaurant</title>
        </Head>
        <main className="flex w-screen">
            {loading ? <Loading /> : <>
            <SideBar />
            <div className={["h-screen overflow-y-scroll relative", styles.width].join(" ")}>
                <Cart id={router.query.id}/>
                <HeaderRes />
                <div className={["p-10", styles.width].join(" ")}>
                    <div className="flex gap-5 w-full overflow-x-scroll">
                    {data?.getRestaurantById?.categories.map((item, i)=>(
                        <div onClick={()=>setCategory(item.name)} key={i} className={`${item.name === category ? "bg-yellow-200" : ""} w-fit p-3 h-[150px] rounded-lg flex flex-col justify-between items-center`}>
                            <div className={`w-[80px] h-[80px] rounded-[50%] ${item.name === category ? "bg-gray-300" : "border-2"} flex justify-center items-center`}>
                                <img src={item.emoji} className="w-[40px] h-[40px]"/>
                            </div>
                            <span className={`${item.name === category ? "font-bold" : ""} text-[15px]`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                    </div>
                </div>
                {/* menus */}
                {category !== "" && <div className="grid grid-cols-3 gap-5">
                        {categories?.map((item1, i)=>(
                            (item1.name === category) && item1?.menus.map((item2, ii)=>(
                                <div className=" justify-self-center place-self-center rounded-md border-[1px] border-black w-[250px] h-[250px] flex flex-col justify-center items-center gap-3 p-2" key={"menu-"+i+"-"+ii}>
                                    <img className="rounded-md h-[120px] w-[200px]" src={"http://localhost:9003/storage/menu/"+item2?.image}/>
                                    <p className="text-[20px]">{item2?.name}</p>
                                    <div className="flex gap-5">
                                        {item2?.details?.map((item, i)=>(
                                            <div key={i} className="w-fit flex flex-col justify-center items-center cursor-pointer" onClick={()=>addToCart(item2.name, item2.image, item2.id, item.price, item.portion)}>
                                                <p className="text-[15px] text-gray-400">{item.portion}</p>
                                                <p className="font-bold text-[15px]">{item.price}dh</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ))}
                </div>}
                {category === "" && <div className="grid grid-cols-3 gap-5">
                        {categories?.map((item1, i)=>(
                            item1?.menus.map((item2, ii)=>(
                                <div className=" justify-self-center place-self-center rounded-md border-[1px] border-black w-[250px] h-[250px] flex flex-col justify-center items-center gap-3 p-2" key={"menu-"+i+"-"+ii}>
                                    <img className="rounded-md h-[120px] w-[200px]" src={"http://localhost:9003/storage/menu/"+item2?.image}/>
                                    <p className="text-[20px]">{item2?.name}</p>
                                    <div className="flex gap-5">
                                        {item2?.details?.map((item, i)=>(
                                            <div key={i} className="w-fit flex flex-col justify-center items-center cursor-pointer" onClick={()=>addToCart(item2.name, item2.image, item2.id, item.price, item.portion, item.id)}>
                                                <p className="text-[15px] text-gray-400">{item.portion}</p>
                                                <p className="font-bold text-[15px]">{item.price}dh</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ))}
                </div>}
            </div>
            </>}
        </main>
    </>);
}