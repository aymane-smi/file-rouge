import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { editMenu, getAllCategoriesForRestaurant, getMenuEdit } from "../../utils/gql";
import { Menu, addMenu } from "../../utils/types";
import { Spinner } from "flowbite-react";
import axios from "axios";

export const EditMenu = ({toggle, id})=>{
    const {data: dd, loading: ll, error: ee} = useQuery(getAllCategoriesForRestaurant, {
        variables: {
            id: parseInt(JSON.parse(localStorage.getItem("user")).id),
        }
    });
    const {data: d, loading: l, error: e} = useQuery(getMenuEdit, {
        variables: {
            id,
        }
    });
    const [MyMutation, {data, error, loading}] = useMutation(editMenu);
    const [form, setForm] = useState<Menu>({
        "name": "",
        "available": false,
        "category": 0,
        id,
    });

    useEffect(()=>{
        if(data !== undefined){
            toggle();
            setForm({
                "name": "",
                id,
                "available": true,
                "category": 0
            });
        }
    },[data]);

    useEffect(()=>{
        if(d !==undefined){
            setForm({
                name: d.getMenu.name,
                id,
                available: d.getMenu.available,
                category: d.getMenu.category_id,
            });
        }
    }, [d]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        MyMutation({variables: {
            input: {
                "name": form.name,
                "available": form.available,
                "category_id": form.category,
                "id": form.id
              },
        }});
    };

    const handleInput = (e)=>{
        if(e.target.name === "available"){
            setForm((old)=>({
                ...old,
                available: !old.available,
            }));
        }else if(e.target.name === "category"){
            setForm((old)=>({
                ...old,
                category: Number.parseInt(e.target.value),
            }));
        }else{
            setForm((old)=>({
                ...old,
                [e.target.name]: e.target.value,
            }));
        }
    };
    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
        {(loading || l) ? <Spinner aria-label="Spinner button example" color="info"/> : <div className="bg-white rounded-md p-4 w-[350px] h-[500px] overflow-y-scroll">
            <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={()=>toggle((old)=>!old)}/>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="name" className="font-bold">Name:</label>
                    <input value={form.name} onChange={handleInput} id="name" type="text" name="name" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="category" className="font-bold">Catgeory:</label>
                    <select id="category" name="category" className="outline-none rounded-md w-full" onChange={handleInput} value={form.category}>
                        { dd && dd.getRestaurantById?.categories?.map(({id,name})=>(<option key={id} value={id}>
                            {name}
                        </option>))}
                    </select>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="available" className="font-bold">available:</label>
                    <input onChange={handleInput} id="available" type="checkbox" name="available" className="outline-none rounded-md" checked={form.available ? "checked": ""}/>
                </div>
                <button className="w-full p-3 bg-black text-white rounded-md">edit menu</button>
            </form>
        </div>}
    </div>)
};