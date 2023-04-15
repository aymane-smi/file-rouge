import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";
import { useMutation } from "@apollo/client";
import { addRestaurant } from "../../utils/gql";
import { addMenu as type } from "../../utils/types";
import { Spinner } from "flowbite-react";

export const AddMenu = ({toggle})=>{
    const [createRestaurant, {data, error, loading}] = useMutation(addRestaurant);
    const [password, setPassword] = useState<string>("");
    const [form, setForm] = useState<type>({
        "name": "",
        "image": null,
        "available": true,
    });

    useEffect(()=>{
        if(data !== undefined){
            toggle();
            setForm({
                "name": "",
                "image": null,
                "available": true,
            });
        }
    },[data]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        createRestaurant({variables: {
            input: {
                "name": form.name,
                "available": form.available,
                "restaurant_id": JSON.parse(localStorage.getItem("user").id),
                "password": form.password,
                "phone": form.phone,
              },
            file: form.image
        }});
    };

    const handleInput = (e)=>{
        setForm((old)=>({
            ...old,
            [e.target.name]: e.target.value,
        }));
    };

    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
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
                    <label htmlFor="password" className="font-bold">Password:</label>
                    <input onChange={handleInput} id="password" value={password} type="text" name="password" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="image" className="font-bold w-full text-center bg-blue-500 p-4 rounded-md text-white">add image to the menu</label>
                    <input onChange={handleInput} id="image" value={password} type="file" name="image" className="hidden"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="available" className="font-bold">available:</label>
                    <input onChange={handleInput} id="available" type="checkbox" name="available" className="outline-none rounded-md"/>
                </div>
                <button className="w-full p-3 bg-black text-white rounded-md">add new menu</button>
            </form>
        </div>}
    </div>)
};