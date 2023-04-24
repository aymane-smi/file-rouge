import Head from "next/head";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import {useState, useEffect} from "react";
import { AddRes } from "../../components/administrator/AddRes";
import { Spinner, Table } from "flowbite-react";
import { useQuery } from "@apollo/client";
import { getClaims } from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import SideBar from "../../components/administrator/SideBar";
import { useRouter } from "next/router";
export default function Claim(){
    const {loading, error, data} = useQuery(getClaims);
    const {push} = useRouter();

    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "administrator")
                push("/");
    }, []);
    if(error)
        return "error";
    if(loading)
        return <Loading />
    return (<>
        <Head>
            <title>claims management</title>
        </Head>
        <main className="flex w-screen">
            <SideBar />
            <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                <Header/>
                <div className="z-0">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                                image
                            </Table.HeadCell>
                            <Table.HeadCell>
                                first name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                last phone
                            </Table.HeadCell>
                            <Table.HeadCell>
                                description
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {data && data?.getClaims?.map(({first_name, last_name, description, image}, i)=>{
                                return (<Table.Row id={i}>
                                    <Table.Cell>
                                        <img src={"http://localhost:9003/storage/complain/"+image} className="w-[40px] h-[40px]"/>
                                    </Table.Cell>
                                    <Table.Cell>{first_name}</Table.Cell>
                                    <Table.Cell>{last_name}</Table.Cell>
                                    <Table.Cell>{description}</Table.Cell>
    
                                </Table.Row>);
                        })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </main>
    </>);
}