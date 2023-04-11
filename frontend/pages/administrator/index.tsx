import Head from "next/head";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import { CartInfo } from "../../components/administrator/CartInfo";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from "next/link";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function index(){
    const data = {
        datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
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
                    <CartInfo numberOf={12} description="number of restaurants"/>
                    <CartInfo numberOf={50} description="number of employee"/>
                    <CartInfo numberOf={12} description="number of administrator"/>
                </div>
                <div className="flex w-full justify-center items-center gap-5">
                    <div className="gap-5 flex flex-col justify-center items-center border border-black rounded-md p-4">
                        <Link href="/administrator/employee" className="p-4 bg-black text-white rounded-md">edit, add and more for employees</Link>
                        <Link href="/administrator/restaurant" className="p-4 bg-black text-white rounded-md">edit, add and more for restaurants</Link>
                    </div>
                    <div  className="flex flex-col justify-center items-center border border-black rounded-md p-4">
                        <Doughnut
                            data={data}
                            width={400}
                            height={400}
                            //options={{ maintainAspectRatio: false }}
                        />
                        <p className="mt-3 font-bold">order per restaurants</p>
                    </div> 
                </div>
            </div>
        </main>
    </>
}