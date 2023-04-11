import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";
import { useMutation } from "@apollo/client";
import { addRestaurant } from "../../utils/gql";
import { addRestaurant as type } from "../../utils/types";
import { Spinner } from "flowbite-react";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export const AddRes = ({toggle})=>{
    const [createRestaurant, {data, error, loading}] = useMutation(addRestaurant);
    const [password, setPassword] = useState<string>("");
    const [form, setForm] = useState<type>({
        "address": "",
        "email": "",
        "name": "",
        "password": "",
        "phone": ""
    });
    useEffect(()=>{
        let tmp = makeid(8);
        setPassword(tmp);
        setForm((old)=>({...old, password: tmp}));
    }, []);

    useEffect(()=>{
        if(data !== undefined){
            toggle();
            setForm({
                "address": "",
                "email": "",
                "name": "",
                "password": "",
                "phone": ""
            });
        }
    },[data]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        createRestaurant({variables: {
            input: {
                "address": form.address,
                "email": form.email,
                "name": form.name,
                "password": form.password,
                "phone": form.phone,
              }
        }});
    };

    const handleInput = (e)=>{
        setForm((old)=>({
            ...old,
            [e.target.name]: e.target.value,
        }));
    };

    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center">
        {loading ? <Spinner aria-label="Spinner button example" color="info"/> : <div className="bg-white rounded-md p-4 w-[350px] h-[500px] overflow-y-scroll">
            <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={()=>toggle()}/>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="name" className="font-bold">Name:</label>
                    <input onChange={handleInput} id="name" type="text" name="name" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="email" className="font-bold">Email:</label>
                    <input onChange={handleInput} id="email" type="email" name="email" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="phone" className="font-bold">Phone:</label>
                    <input onChange={handleInput} id="phone" type="text" name="phone" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="password" className="font-bold">Password:</label>
                    <input onChange={handleInput} id="password" value={password} type="text" name="password" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="address" className="font-bold">Address:</label>
                    <textarea onChange={handleInput} id="address" name="address" className="outline-none rounded-md w-full h-[50px]"></textarea>
                </div>
                <button className="w-full p-3 bg-black text-white rounded-md">add new restaurant</button>
            </form>
        </div>}
    </div>)
};