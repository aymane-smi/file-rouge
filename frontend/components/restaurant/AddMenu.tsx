import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { addMenu, addRestaurant, getAllCategoriesForRestaurant } from "../../utils/gql";
import { addMenu as type } from "../../utils/types";
import { Spinner } from "flowbite-react";
import axios from "axios";

export const AddMenu = ({toggle, id, menu})=>{
    const {data: d, loading: l, error: e} = useQuery(getAllCategoriesForRestaurant, {
        variables: {
            id: parseInt(JSON.parse(localStorage.getItem("user")).id),
        }
    });
    const [MyMutation, {data, error, loading}] = useMutation(addMenu);
    const [password, setPassword] = useState<string>("");
    const [file, setFile] = useState<File|null>(null);
    const [form, setForm] = useState<type>({
        "name": "",
        "image": null,
        "available": false,
        "category": 0,
    });

    useEffect(()=>{
        if(data !== undefined){
            setForm({
                "name": "",
                "image": null,
                "available": true,
                "category": 0
            });
            menu((old)=>[...old, {
                id: data?.createMenu.id,
                name: data?.createMenu.name,
                category_id: data?.createMenu.category_id,
                image: data?.createMenu.image,
                available: data?.createMenu.available
            }]);
            toggle();
        }
    },[data]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data} = await axios.post("http://localhost:9003/api/uploadMenu", {
                menu: file,
            }, { headers: {
                'Content-Type': 'multipart/form-data'
                }
        });
        MyMutation({variables: {
            input: {
                "name": form.name,
                "available": form.available,
                "restaurant_id": parseInt(JSON.parse(localStorage.getItem("user")).id),
                "category_id": form.category,
                "image": data.message,
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

    const handleFile = (e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

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
                    <label htmlFor="category" className="font-bold">Catgeory:</label>
                    <select id="category" name="category" className="outline-none rounded-md w-full" onChange={handleInput}>
                        { d && d.getRestaurantById?.categories?.map(({id,name})=>(<option key={id} value={id}>
                            {name}
                        </option>))}
                    </select>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="image" className="font-bold w-full text-center bg-blue-500 p-4 rounded-md text-white">add image to the menu</label>
                    <input onChange={handleFile} id="image"  type="file" name="image" className="hidden"/>
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