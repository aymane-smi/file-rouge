import Head from "next/head";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/restaurant.module.css";
import { HeaderRes } from "../../components/restaurant/HeaderRes";
import { useState } from "react";
import { CardInfo } from "../../components/restaurant/CardInfo";
import { AddMenu } from "../../components/restaurant/AddMenu";

export default function index(){
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const toggle = ()=>{
        setToggleMenu(!toggleMenu);
    }
    return (<>
        <Head>
            <title>Restaurant Dashboard</title>
        </Head>
        {toggleMenu && <AddMenu toggle={toggle}/>}
        <main className="flex w-screen h-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <HeaderRes toggle={toggle}/>
                <div className="flex gap-5 justify-center items-center">
                <CardInfo description="number of orders" numberOf={12}/>
                <CardInfo description="successful order" numberOf={10}/>
                <CardInfo description="canceled order" numberOf={2}/>
                </div>
            </div>
        </main>
    </>)
}