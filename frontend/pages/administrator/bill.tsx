import Head from "next/head";
import SideBar from "../../components/administrator/SideBar";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import {useState, useEffect} from "react";
import { HeaderRes } from "../../components/administrator/HeaderRes";
import { AddRes } from "../../components/administrator/AddRes";
import { Dropdown, Spinner, Table } from "flowbite-react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { bill, employeeByClass, getAllEmployees, getAllRestaurants } from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import { AddEmployee } from "../../components/administrator/AddEmployee";
import { useRouter } from "next/router";
export default function Bill(){
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const [id, setId] = useState<number>(0);
    const [bills, setBills] = useState(null);
    const [Query, {loading, data}] = useLazyQuery(bill);
    const {data: d, loading: l} = useQuery(getAllRestaurants);
    const [total, setTotal] = useState<number>(0);
    const {push} = useRouter();

    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "administrator")
                push("/");
    }, []);
    useEffect(()=>{
        if(year !== 0 && id !== 0 && month !== 0){
            Query({
                variables: {
                    id,
                    year,
                    month
                }
            })
        }
    }, [month, year, id]);

    useEffect(()=>{
        if(data?.OrderBill.length > 0){
            setBills(data?.OrderBill);
            for(let tmp of data?.OrderBill){
                console.log(total + tmp.total);
                setTotal(total + tmp.total);
            }
        }else{
            setTotal(0);
        }
    }, [data])
    // useEffect(()=>{
    //     if(month !== 0 && id !== 0){
    //         Query({
    //             variables: {
    //                 id,
    //                 year,
    //                 month
    //             }
    //         })
    //     }

    //     if(data?.OrderBill.length > 0)
    //         setBills(data?.OrderBill);
    // }, [year]);
    // useEffect(()=>{
    //     if(year !== 0 && month !== 0){
    //         Query({
    //             variables: {
    //                 id,
    //                 year,
    //                 month
    //             }
    //         })
    //     }

    //     if(data?.OrderBill.length > 0)
    //         setBills(data?.OrderBill);
    // }, [id]);
    return (<>
        <Head>
            <title>bills management</title>
        </Head>
        <main className="flex w-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <Header/>
                <div className="p-2 flex gap-5">
                    <Dropdown label="Month">
                        <Dropdown.Item onClick={()=>setMonth(1)}>January</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(2)}>February</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(3)}>March</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(4)}>April</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(5)}>May</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(6)}>June</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(7)}>July</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(8)}>August</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(9)}>September</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(10)}>October</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(11)}>November</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setMonth(12)}>December</Dropdown.Item>
                    </Dropdown>
                    <Dropdown label="Restaurant">
                        { d && d.getAllRestaurant.map((item, i)=>(
                            <Dropdown.Item key={i} onClick={()=>setId(parseInt(item.id))}>{item.name}</Dropdown.Item>
                        ))}
                    </Dropdown>
                    <input type="number" min="2023" className="p-2 rounded-md border-[1px]" placeholder="Year" onChange={(e)=>setYear(parseInt(e.target.value))}/>
                </div>
                <div className="z-0 mt-3">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                                first_name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                last_name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                total
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {data?.OrderBill.length > 0 && data?.OrderBill?.map((item, i)=>{
                            return (<Table.Row key={i}>
                                <Table.Cell>
                                    {item.first_name}
                                </Table.Cell>
                                <Table.Cell>{item.last_name}</Table.Cell>
                                <Table.Cell>{item.total}</Table.Cell>
                            </Table.Row>);
                        })}
                        </Table.Body>
                    </Table>
                    <div className="w-full flex justify-between items-center mt-3 p-6">
                        <span className="font-bold text-[20px]">Total</span>
                        <span className="font-bold text-[20px]">{total} mad</span>
                    </div>
                </div>
            </div>
        </main>
    </>);
}