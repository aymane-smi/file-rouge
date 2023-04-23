import { useMutation, useQuery } from "@apollo/client";
import { Spinner, Table } from "flowbite-react";
import { GrClose } from "react-icons/gr";
import { getRestaurantMenus, removeDetail as remove } from "../../utils/gql";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShowDetails = ({toggle, id})=>{
    const [details, setDetail] = useState([]);
    const [MyMutation, {data: d, loading: l, error: e}] = useMutation(remove);
    const {data, loading, error} = useQuery(getRestaurantMenus,{
        variables: {
            id
        }
    });

    useEffect(()=>{
        if(data !== undefined)
            setDetail(data?.getRestaurantById?.menus.filter((item)=>item.id == id))
    },[data]);

    const removeDetail = (e)=>{
        MyMutation({
            variables: {
                id: parseInt(e.target.value),
            }
        });
        setDetail((old)=>{
            return old[0].details.filter((detail)=>detail.id !== e.target.value);

        });

        toast.success("1 detail was removed for menu", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
        {(loading) ? <Spinner aria-label="Spinner button example" color="info"/> : <div className="bg-white rounded-md p-4 w-[350px] h-[300px] overflow-y-scroll">
            <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={()=>toggle((old)=>!old)}/>
            </div>
            <div className="flex flex-col gap-5 mt-5 font-bold">
                <div className="flex justify-between items-center">
                    <span>Portion</span>
                    <span>Price</span>
                    <span>Remove</span>
                </div>
                {data && details[0]?.details.map((item, i)=>(
                    <div className="flex justify-between items-center font-medium" key={i}>
                        <span>{item.portion}</span>
                        <span>{item.price}</span>
                        <button className="rounded-md p-2 bg-red-200 text-red-500" value={item.id} onClick={removeDetail}>remove</button>
                    </div>
                ))}
            </div>
        </div>}
    </div>);
}