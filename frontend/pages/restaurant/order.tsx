import Head from "next/head";
import SideBar from "../../components/restaurant/sideBar";
import styles from "../../styles/restaurant.module.css";
import Header from "../../components/restaurant/Header";
import { useEffect, useState } from "react";
import { Table, Toast } from "flowbite-react";
import { useMutation, useQuery } from "@apollo/client";
import { getOrder, changeOrderStatus as change } from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import { toast } from "react-toastify";
import { orderType } from "../../utils/types";
import { OrderDetails } from "../../components/restaurant/OrderDetails";

export default function Order(){
    const [user, setUser] = useState(null);
    const {loading, data, error} = useQuery(getOrder, {
        variables: {
            restaurant_id: user?.id
        }
    });
    const [changeOrderStatus, {loading: l, error: e, data: d}] = useMutation(change);

    const [orders, setOrders] = useState<orderType>([]);
    const [add, setAdd] = useState<boolean>(false);
    const [detail, setDeatil] = useState<number>(0);
    const [ticket, setTicket] = useState<boolean>(false);

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")));
    },[]);

    useEffect(()=>{
        setOrders(data?.getRestaurantOrder);
    }, [data]);

    const handleStatus = (id: number, status:number)=>{
        changeOrderStatus({variables:{
            id,
            status,
        }});

        setOrders((old)=>old.map((item)=>{
            if(item.id == id)
                return {
                    ...item,
                    status,
                }
            return item;
        }))

        toast.success("order status changed", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    const handletoggle = (id: number, t: boolean)=>{
        setAdd(!add);
        setDeatil(id);
        console.log(0);
        setTicket(t);
    }
    return (<>
        <Head>
            <title>Restaurant orders</title>
        </Head>
        {add && <OrderDetails id={detail} toggle={setAdd} ticket={ticket}/>}
        {data == undefined ? <Loading /> : <main className="flex w-screen h-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <Header />
                <Table className="mt-3">
                    <Table.Head>
                        <Table.HeadCell>first name</Table.HeadCell>
                        <Table.HeadCell>last name</Table.HeadCell>
                        <Table.HeadCell>status</Table.HeadCell>
                        <Table.HeadCell>phone</Table.HeadCell>
                        <Table.HeadCell>ticket</Table.HeadCell>
                        <Table.HeadCell>status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {orders?.map(({id, first_name, last_name, ticket: t, phone, status})=>(
                            <Table.Row key={id}>
                                <Table.Cell>{first_name}</Table.Cell>
                                <Table.Cell>{last_name}</Table.Cell>
                                <Table.Cell>
                                    {status === 2 && <p className="text-center rounded-md fond-semibold p-2 bg-blue-100 text-blue-400">pending</p>}
                                    {status === 0 && <p className="text-center rounded-md fond-semibold p-2 bg-red-100 text-red-400">refused</p>} 
                                    {status === 1 && <p className="text-center rounded-md fond-semibold p-2 bg-green-100 text-green-400">accepted</p>}
                                </Table.Cell>
                                <Table.Cell>{phone}</Table.Cell>
                                <Table.Cell>
                                    {t ? <div className="p-2 bg-green-200 text-green-500 rounded-md text-center">with ticket</div> :
                                     <div className="p-2 bg-red-200 text-red-500 rounded-md text-center">without ticket</div>}
                                </Table.Cell>
                                <Table.Cell className="flex gap-3">
                                    <button className="p-2 bg-blue-200 text-blue-500 rounded-md text-center" onClick={()=>handletoggle(parseInt(id), t)}>show details</button>
                                    <button className="p-2 bg-green-200 text-green-500 rounded-md text-center" onClick={()=>handleStatus(parseInt(id), 1)}>accept</button>
                                    <button className="p-2 bg-red-300 text-red-600 rounded-md text-center" onClick={()=>handleStatus(parseInt(id), 0)}>refuse</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </main>}
    </>);
}