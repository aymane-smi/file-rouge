import Head from "next/head";
import SideBar from "../../components/restaurant/sideBar";
import styles from "../../styles/restaurant.module.css";
import { editRestaurant, getRestaurantById } from "../../utils/gql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Loading } from "../../components/utils/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Edit(){
    const [edit, {loading, data}] = useMutation(editRestaurant);
    const [restuarnt, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);
    const {push} = useRouter();

    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "restaurant")
                push("/");
        const {name, email, address, phone, id} = JSON.parse(localStorage.getItem("user"));
        console.log(id);
        setUser(({
            name,
            email,
            address,
            phone,
            id: parseInt(id),
            password: "",
        }));
    }, []);

    //useEffect(()=>{}, [data]);

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
            <title>Restaurant orders</title>
        </Head>
        {!user ? <Loading /> : (<main className="flex w-screen h-screen">
            <SideBar />
            <div className={["max-h-screen pb-3 flex flex-col justify-start items-center mt-10", "overflow-y-scroll", styles.width].join(" ")}>
                <p className="text-[30px] font-bold">Edit your information</p>
                <form className="flex flex-col justify-center items-center w-[350px] mt-10 gap-5" onSubmit={handleForm}>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="name" className="font-bold">Name:</label>
                        <input id="name" type="text" name="name" value={user?.name} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="email" className="font-bold">Email:</label>
                        <input id="email" type="email" name="email" value={user?.email} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="phone" className="font-bold">Phone:</label>
                        <input id="phone" type="text" name="phone" value={user?.phone} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="password" className="font-bold">Password:</label>
                        <input id="password" type="text" name="password" onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="address" className="font-bold">Address:</label>
                        <textarea id="address" name="address" onChange={handleInput} className="outline-none rounded-md w-full h-[80px]">{user?.address}</textarea>
                    </div>
                    <button className="w-full p-3 bg-black text-white rounded-md mt-5">edit restaurant</button>
                </form>
            </div>
        </main>)}
    </>)
}