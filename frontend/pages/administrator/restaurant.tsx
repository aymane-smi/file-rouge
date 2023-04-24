import Head from "next/head";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import {useState, useEffect} from "react";
import { AddRes } from "../../components/administrator/AddRes";
import { Spinner, Table } from "flowbite-react";
import { useQuery } from "@apollo/client";
import { getAllRestaurants } from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import { Header2 } from "../../components/administrator/Header2";
import SideBar from "../../components/administrator/SideBar";
export default function Restaurant(){
    const {loading, error, data} = useQuery(getAllRestaurants);
    const [toggleAdd, setAdd] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [restaurants, setRestaurants] = useState(null);
    const toggle = ()=>{
        setAdd(!toggleAdd);
    }
    useEffect(()=>{
        setRestaurants(data?.GetAllRestaurant);
    }, [data]);
    if(error)
        return "error";
    if(loading)
        return <Loading />
    return (<>
        {toggleAdd && <AddRes toggle={toggle}/>}
        <Head>
            <title>restaurant management</title>
        </Head>
        <main className="flex w-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <Header2 toggle={toggle}/>
                <div className="p-2">
                    <input type="text" className="p-2 rounded-md border-[1px]" placeholder="search by class" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="z-0">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                                name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                phone
                            </Table.HeadCell>
                            <Table.HeadCell>
                                email
                            </Table.HeadCell>
                            <Table.HeadCell>
                                address
                            </Table.HeadCell>
                            <Table.HeadCell>
                                actions
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {data && data?.getAllRestaurant?.map(({id, email, name: n, phone, address})=>{
                            if(n.includes(name))
                                return (<Table.Row id={id}>
                                    <Table.Cell>
                                        {n}
                                    </Table.Cell>
                                    <Table.Cell>{phone}</Table.Cell>
                                    <Table.Cell>{email}</Table.Cell>
                                    <Table.Cell>{address}</Table.Cell>
                                    <Table.Cell></Table.Cell>
    
                                </Table.Row>);
                        })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </main>
    </>);
}