import Head from "next/head";
import SideBar from "../../components/restaurant/sideBar";
import styles from "../../styles/restaurant.module.css";
import { editRestaurant, getRestaurantById } from "../../utils/gql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Loading } from "../../components/utils/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthEmployee } from "../../utils/authEmployee";

export default function Edit(){
    const [edit, {loading, data}] = useMutation(editRestaurant);
    const [restuarnt, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);

    const {push} = useRouter();
    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "employee")
                push("/");
        const {last_name, email, first_name, phone, id, class: c, year} = JSON.parse(localStorage.getItem("user"));
        console.log(id);
        setUser(({
            last_name,
            email,
            first_name,
            id: parseInt(id),
            class: c,
            year,
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
                        <label htmlFor="phone" className="font-bold">Phone:</label>
                        <input id="phone" type="text" name="phone" value={user?.phone} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="password" className="font-bold">Password:</label>
                        <input id="password" type="text" name="password" onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="year" className="font-bold">Year:</label>
                        <input id="year" type="number" name="year" min="1" max="2" value={user.year} onChange={handleInput} className="outline-none rounded-md w-full"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="class" className="font-bold">Class:</label>
                        <input id="class" type="text" name="class" onChange={handleInput} value={user.class} className="outline-none rounded-md w-full"/>
                    </div>
                    <button className="w-full p-3 bg-black text-white rounded-md mt-5">edit employee</button>
                </form>
            </div>
        </main>)}
    </>)
}