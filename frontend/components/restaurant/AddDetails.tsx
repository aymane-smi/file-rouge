import { useEffect, useState } from "react";
import {AiOutlinePlusCircle} from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { Details } from "../../utils/types";
import { useMutation } from "@apollo/client";
import { addMenuDetails } from "../../utils/gql";
import { Spinner } from "flowbite-react";
export const AddDetails = ({id, toggle})=>{
    const [Mutation, {loading, error, data}] = useMutation(addMenuDetails);
    const [nbr, setNbr] = useState<number>(1);
    const [form, setForm] = useState<Details>({
        price: [],
        portion: [],
    });
    useEffect(()=>{
        console.log("++");
    }, [nbr]);
    const addFields = ()=>{
        setNbr(nbr+1);
    }
    const handleChange = (e, i, state)=>{
        let data = form[state];
        data[i] = e;
        setForm((old)=>({
            ...old,
            [state]: data,
        }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        Mutation({variables: {
            input: {
                "menu_id": parseInt(id),
                "price": form.price,
                "portion": form.portion,
            }
        }});
    }
    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
            {loading ? <Spinner aria-label="Spinner button example" color="info"/> : <div className="bg-white rounded-md p-4 w-[350px] h-[500px] overflow-y-scroll">
            <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={toggle}/>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {Array(nbr).fill(0).map((_, i)=>{
                    return (<div key={i}>
                        <div className="flex flex-col items-start gap-2 w-full">
                            <label htmlFor="price" className="font-bold">Price({i+1}) :</label>
                            <input required onChange={(e)=>handleChange(parseInt(e.target.value), i, "price")} id="price" type="number" name="price[]" className="outline-none rounded-md w-full" min="0"/>
                        </div>
                        <div className="flex flex-col items-start gap-2 w-full">
                            <label htmlFor="portion" className="font-bold">Portion({i+1}):</label>
                            <input required onChange={(e)=>handleChange(e.target.value, i, "portion")} id="portion" type="text" name="portion[]" className="outline-none rounded-md w-full"/>
                        </div>
                    </div>)
                })}
                <div className="childs"></div>
                <div className="w-full flex justify-center items-center">
                    <button type="button" onClick={addFields}>
                        <AiOutlinePlusCircle size={50} className="text-blue-700"/>
                    </button>
                </div>
                <button className="w-full p-3 bg-black text-white rounded-md">add new details to the menu</button>
            </form>
            </div>}
    </div>);
}