import { GrClose } from "react-icons/gr"
import { getOrderDetails } from "../../utils/gql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const OrderDetails = ({id, toggle, ticket}: {number, void, boolean})=>{
    const {data, loading, error} = useQuery(getOrderDetails, {
        variables: {
            id
        }
    });

    const [total, setTotal] = useState<number>(0);

    useEffect(()=>{
        if(data !== undefined)
            for(let order of data?.GetDetailsOfOrder){
                //console.log(order.detail.price * order.detail.quantity);
                setTotal((old)=>total+(order.detail.price * order.detail.quantity));
                //console.log(total);
            }
    }, [data]);
    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
        <div className="bg-white rounded-md p-4 w-fit w-[350px] h-[300px] overflow-y-scroll">
        <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={()=>toggle((old)=>!old)}/>
            </div>
            <div className="flex justify-between items-center font-semibold gap-[70px] mt-3">
                <span>menu</span>
                <span>portion</span>
                <span>price</span>
                <span>quantity</span>
            </div>
            {data && data?.GetDetailsOfOrder.map((item, i)=>(<div key={i} className="flex justify-between items-center font-medium gap-[60px] mt-3">
                <span>{item.menu.name}</span>
                <span>{item.detail.portion}</span>
                <span>{item.detail.price}</span>
                <span>{item.detail.quantity}</span>
            </div>))}
            <div className="border-t-[1px] w-full p-3 mt-3">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span>{total} mad</span>
                </div>
                {ticket && <div className="flex justify-between items-center mt-3">
                    <span className="font-semibold">Total with ticket:</span>
                    <span>{total > 50 ? (total - 50) : total} mad</span>
                </div>}
            </div>
        </div>
    </div>)
}