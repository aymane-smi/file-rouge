import Head from "next/head";
import SideBar from "../../components/utils/sideBar";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import {useState, useEffect} from "react";
import { HeaderRes } from "../../components/administrator/HeaderRes";
import { AddRes } from "../../components/administrator/AddRes";
import { Spinner, Table } from "flowbite-react";
import { useQuery } from "@apollo/client";
import { getAllEmployees } from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import { AddEmployee } from "../../components/administrator/AddEmployee";
export default function restaurant(){
    const {loading, error, data} = useQuery(getAllEmployees);
    const [toggleAdd, setAdd] = useState<boolean>(false);
    const toggle = ()=>{
        setAdd(!toggleAdd);
    }
    useEffect(()=>{
        console.log(data);
    }, [data]);
    if(error)
        return "error";
    if(loading)
        return <Loading />
    return (<>
        {toggleAdd && <AddEmployee toggle={toggle}/>}
        <Head>
            <title>employee management</title>
        </Head>
        <main className="flex w-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <HeaderRes toggle={toggle}/>
                <div className="z-0">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                                first_name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                last_name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                phone
                            </Table.HeadCell>
                            <Table.HeadCell>
                                email
                            </Table.HeadCell>
                            <Table.HeadCell>
                                class
                            </Table.HeadCell>
                            <Table.HeadCell>
                                year
                            </Table.HeadCell>
                            <Table.HeadCell>
                                actions
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {data && data?.getAllEmployee?.map(({id, email, first_name, last_name, phone, class: c, year})=>(
                            <Table.Row>
                                <Table.Cell>
                                    {first_name}
                                </Table.Cell>
                                <Table.Cell>{last_name}</Table.Cell>
                                <Table.Cell>{phone}</Table.Cell>
                                <Table.Cell>{email}</Table.Cell>
                                <Table.Cell>{c}</Table.Cell>
                                <Table.Cell>{year}</Table.Cell>
                                <Table.Cell></Table.Cell>

                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </main>
    </>);
}