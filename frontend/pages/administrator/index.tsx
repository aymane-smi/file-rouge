import Head from "next/head";
import SideBar from "../../components/administrator/SideBar";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import { CartInfo } from "../../components/administrator/CartInfo";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ResOrder, countAdmin } from "../../utils/gql";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function Index(){
    const {data: d, loading} = useQuery(countAdmin);
    const {data: dd, loading: l} = useQuery(ResOrder);
    const [orders, setOrders] = useState<number[]>([]);
    const [names, setNames] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [borders, setBorders] = useState<string[]>([]);
    const {push} = useRouter();
    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "administrator")
                push("/");
    }, []);
    useEffect(()=>{
        if(dd !== undefined){
            setNames([]);
            setOrders([]);
            setColors([]);
            setBorders([]);
            for(let tmp of dd?.OrderPerRestaurant){
                let r = Math.floor((Math.random() * 255) + 1);
                let g = Math.floor((Math.random() * 255) + 1);
                let b = Math.floor((Math.random() * 255) + 1);
                setNames((old)=>[...old, tmp.name]);
                setOrders((old)=>[...old, tmp.count]);
                setColors((old)=>[...old, `rgba(${r}, ${g}, ${b}, 0.2)`]);
                setBorders((old)=>[...old, `rgba(${r}, ${g}, ${b}, 1)`]);
            }
        }
    }, [dd]);
    const data = dd && {
        labels: names,
        datasets: [
            {
              data: orders,
              backgroundColor: colors,
              borderColor: borders,
              borderWidth: 1,
            },
          ],
    }
    return <>
        <Head>
            <title>Administrator Dashboard</title>
        </Head>
        <main className="flex w-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <Header/>
                <div className="flex p-4 w-full gap-5 justify-center items-center">
                    {d && <CartInfo numberOf={d.countRestaurant} description="number of restaurants"/>}
                    {d && <CartInfo numberOf={d.countEmployee} description="number of employee"/>}
                    {d && <CartInfo numberOf={d.countAdministrator} description="number of administrator"/>}
                </div>
                <div className="flex w-full justify-center items-center gap-5">
                    <div className="gap-5 flex flex-col justify-center items-center border border-black rounded-md p-4">
                        <Link href="/administrator/employee" className="p-4 bg-black text-white rounded-md">edit, add and more for employees</Link>
                        <Link href="/administrator/restaurant" className="p-4 bg-black text-white rounded-md">edit, add and more for restaurants</Link>
                    </div>
                    <div  className="flex flex-col justify-center items-center border border-black rounded-md p-4">
                        {dd && <Doughnut
                            data={data}
                            width={400}
                            height={400}
                            options={{ plugins: {
                                tooltip: {
                                  enabled: false // <-- this option disables tooltips
                                }
                              } }}
                        />}
                        <p className="mt-3 font-bold">order per restaurant</p>
                    </div> 
                </div>
            </div>
        </main>
    </>
}