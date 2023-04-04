import Head from "next/head";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/employee_index.module.css";

export default function edit(){
    return (<>
            <Head>
                <title>edit profile</title>
            </Head>
            <main className="flex w-screen">
                <SideBar />
                <form className={["h-screen flex flex-col gap-5 justify-center items-center", styles.width].join(" ")}>
                    <p className="text-[30px] font-bold">Edit your profile</p>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="first_name" className="font-bold">First Name</label>
                        <input type="text" className="w-[300px] p-2 border-[2px] outline-none rounded-md" id="first_name" name="first_name"/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="last_name" className="font-bold">Last Name</label>
                        <input type="text" className="w-[300px] p-2 border-[2px] outline-none rounded-md" id="last_name" name="last_name"/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="font-bold">Email</label>
                        <input type="email" className="w-[300px] p-2 border-[2px] outline-none rounded-md" id="email" name="email"/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="password" className="font-bold">Password</label>
                        <input type="password" className="w-[300px] p-2 border-[2px] outline-none rounded-md" id="password" name="password"/>
                    </div>
                    <button className="p-2 text-white bg-black font-bold w-[300px] rounded-md">edit profile</button>
                </form>
            </main>
    </>);
}