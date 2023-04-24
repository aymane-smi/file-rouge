import Head from "next/head";
import SideBar from "../../components/administrator/SideBar";
import styles from "../../styles/restaurant.module.css";
import { editAdministrator, editRestaurant, getRestaurantById } from "../../utils/gql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Loading } from "../../components/utils/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Edit(){
    const [edit, {loading, data}] = useMutation(editAdministrator);
    const [restuarnt, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const {last_name, email, first_name, id} = JSON.parse(localStorage.getItem("user"));
        console.log(id);
        setUser(({
            last_name,
            email,
            first_name,
            id: parseInt(id),
            password: "",
        }));
    }, []);

    const handleForm = (e)=>{
        e.preventDefault();
        edit({
            variables: {
                input: user,
            }
        });

        toast.success("information changed", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    const handleInput = (e)=>{
        setUser((old)=>({
            ...old,
            [e.target.name]: e.target.value,
        }));
    };
    return (<>
        <Head>
            <title>Administrator orders</title>
        </Head>
        {!user ? <Loading /> : (<main className="flex w-screen h-screen">
            <SideBar />
            <div className={["max-h-screen pb-3 flex flex-col justify-start items-center mt-10", "overflow-y-scroll", styles.width].join(" ")}>
                <p className="text-[30px] font-bold">Edit your information</p>
                <form className="flex flex-col justify-center items-center w-[350px] mt-10 gap-5" onSubmit={handleForm}>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="name" className="font-bold">Firstname:</label>
                        <input id="name" type="text" name="name" value={user?.first_name} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="name" className="font-bold">Lastname:</label>
                        <input id="name" type="text" name="name" value={user?.last_name} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="email" className="font-bold">Email:</label>
                        <input id="email" type="email" name="email" value={user?.email} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="password" className="font-bold">Password:</label>
                        <input id="password" type="text" name="password" onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <button className="w-full p-3 bg-black text-white rounded-md mt-5">edit administrator</button>
                </form>
            </div>
        </main>)}
    </>)
}