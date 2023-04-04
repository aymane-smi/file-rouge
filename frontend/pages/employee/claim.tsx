import Head from "next/head";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/employee_index.module.css";
import { AiFillBell, AiOutlineDown } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
export default function claim(){
    return (<>
            <Head>
                <title>claims</title>
            </Head>
            <main className="flex w-screen">
                <SideBar />
                <div className={["h-screen overflow-y-scroll flex", styles.width].join(" ")}>
                <form className="h-screen w-[50%] p-10">
                        {/* <div className="flex w-full gap-5 justify-end items-center">
                            <AiFillBell size={20}/>
                            <AiOutlineDown size={20}/>
                        </div> */}
                        <div className="w-full flex flex-col justify-center items-center mt-5 gap-5">
                            <p className="text-[20px] font-bold">make a complaint</p>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="problem">
                                    Problem
                                    <span className="text-red-500 font-bold">*</span>
                                </label>
                                <textarea name="problem" className="w-[300px] h-[150px] outline-none border-[2px] rounded-md"></textarea>
                            </div>
                            <div className="w-[300px] p-4 rounded-md text-white bg-blue-500 flex justify-center items-center">
                                <label htmlFor="image" className="flex flex-col justify-center items-center">
                                    <BsFillImageFill size={30}/>
                                    <p className="font-bold">upload image for this complaint</p>
                                </label>
                                <input type="file" id="image" name="complaint_image" className="hidden" />
                            </div>
                            <button className="p-2 text-white rounded-md bg-black font-bold w-[300px] text-[16px] mt-4">send</button>
                        </div>
                    </form>
                    <img className="h-screen w-[50%]" src="https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
                </div>
            </main>
        </>);
}