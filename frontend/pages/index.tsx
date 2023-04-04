import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/app.module.css'
import Link from 'next/link'
import {AiOutlineUser} from "react-icons/ai";
import {TbChefHat} from "react-icons/tb";
import {GrUserAdmin} from "react-icons/gr";


export default function Home() {
  return (
      <>
        <Head>
          <title>choices</title>
        </Head>
        <div className="w-screen h-screen flex gap-8 justify-center items-center flex-wrap">
          <Link href="/employee/login" className={["p-4 rounded-md border-2 h-[200px] w-[200px] flex flex-col justify-center items-center transition duration-500 ease-out", styles.option].join(' ')}>
            <AiOutlineUser size={45}/>
            <p className="font-bold mt-3">Employee</p>
          </Link>
          <Link href="/restaurant/login" className={["p-4 rounded-md border-2 h-[200px] w-[200px] flex flex-col justify-center items-center transition duration-500 ease-out", styles.option].join(' ')}>
            <TbChefHat size={45}/>
            <p className="font-bold mt-3">restaurant</p>
          </Link>
          <Link href="/administrator/login" className={["p-4 rounded-md border-2 h-[200px] w-[200px] flex flex-col justify-center items-center transition duration-500 ease-out", styles.option].join(' ')}>
            <GrUserAdmin size={45}/>
            <p className="font-bold mt-3">administrator</p>
          </Link>
        </div>
        {/* https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80 */}
        {/* https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80 */}
        {/* <img width="100" height="100" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80"/> */}
      </>
  )
}
