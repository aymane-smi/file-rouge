import { useEffect } from "react";
import { GlobalCartContext } from "../../lib/context";
import { makeOrder } from "../../utils/gql";
import { useMutation } from "@apollo/client";
import { Loading } from "../utils/Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Cart({id}){
    
    const { setOpen, open, cartItems, setCart } = GlobalCartContext();
    const [MyMutation, {loading, data, error}] = useMutation(makeOrder);

    useEffect(()=>{
        if(data !== undefined){
            setOpen(!open);
            setCart([]);
        }
    },[data]);

    const up = (id: number, detail: number)=>{
        setCart(cartItems.map((item)=>{
            if(item.id == id, item.detail_id == detail)
                item.quantity++;
            return item;
        }));
    };

    const down = (id: number, detail: number)=>{
        let tmp = cartItems.length;
        let index = cartItems.findIndex((item)=>item.id == id && item.detail_id == detail);
        console.log(index);
        if(index !== -1 && cartItems[index].quantity === 1)
            setCart((old)=>old.splice(index, 1));
        else
            setCart(cartItems.map((item)=>{
                if(item.id == id && item.detail_id == detail)
                    item.quantity--;
                return item;
            }));
    };

    const sendOrder = ()=>{
        let user = JSON.parse(localStorage.getItem("user"));
        if(cartItems.length > 0)
            MyMutation({
                variables: {
                    input :{
                        employee_id: parseInt(user.id),
                        restaurant_id: parseInt(id),
                        phone: user.phone,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        haveTicket: user.haveTicket,
                        detail: cartItems.map((item)=>({
                            menuId: item.id,
                            detail_id: item.detail_id,
                            quantity: item.quantity,
                            price: item.price,
                        }))
                    },
                }
            });
            if(data !== undefined){
                setOpen(!open);
                setCart([]);
            }
            toast.success("order created!", {
                position: toast.POSITION.TOP_RIGHT
            })
    };

    return (
        <div className={`${open ? "" : "hidden"} absolute w-[400px] h-fit max-h-[400px] rounded-md shadow-md bg-white p-5 overflow-y-scroll `}>
            <p className="text-[20px] font-bold">My orders</p>
            {loading ? <Loading /> : cartItems.map((item, i)=>(
                <div className="mt-3 flex justify-between items-center" key={"cart-"+i}>
                    <img className="w-[60px] h-[60px] rounded-md" src={"http://localhost:9003/storage/menu/"+item.image}/>
                    <div className="flex flex-col text-[13px] font-bold justify-center items-center gap-2">
                        <p className="text-[16px]">{item.name}({item.portion})#{item.id}#{item.detail_id}</p>
                        <div className="flex gap-3">
                            <span className="border h-[20px] w-[20px] text-center leading-[20px] rounded-md" onClick={()=>down(item.id, item.detail_id)}>-</span>
                            <span>{item.quantity}</span>
                            <span className="border h-[20px] w-[20px] text-center leading-[20px] rounded-md" onClick={()=>up(item.id, item.detail_id)}>+</span>
                        </div>
                    </div>
                    <button className="text-white bg-red-500 rounded-md p-1 text-[13px]">remove</button>
                </div>
            ))}
            <div className="w-full flex justify-center items-center">
                <button disabled={cartItems.length === 0} className="p-2 bg-green-500 text-white mt-4 rounded-md" onClick={sendOrder}>confirme order</button>
            </div>
        </div>
    );
}