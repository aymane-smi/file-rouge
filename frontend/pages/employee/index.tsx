import Head from "next/head";
import Link from "next/link";
import Header from "../../components/employee/Header";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/employee_index.module.css";
import { useQuery } from "@apollo/client";
import { getAllRestaurant } from "../../utils/gql";

export default function index(){
    const {data, error, loading} = useQuery(getAllRestaurant);
    if(data)
    return (
        <>
            <Head>
                <title>Restaurant choices</title>
            </Head>
            <main className="flex w-screen">
                <SideBar />
                <div className={["h-screen", styles.width].join(" ")}>
                    <Header />
                    <div className={["flex flex-col justify-center items-center p-10 gap-10", styles.width].join(" ")}>
                        <p className="text-[30px] font-bold">Select your favorite restaurants</p>
                        <div className="grid grid-cols-2 border-3 border-black gap-5">
                            {data && data?.getAllRestaurant.map((restaurant)=>(
                                <Link href={"/employee/restaurant/"+restaurant.id} className="bg-gray-200 w-[150px] h-[150px] text-[15px] font-semibold text-center leading-[150px]" key={restaurant.id}>
                                    {restaurant.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}