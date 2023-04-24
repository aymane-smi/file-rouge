import Head from "next/head";
import SideBar from "../../components/administrator/SideBar";
import styles from "../../styles/administrator.module.css";
import { Header } from "../../components/administrator/Header";
import {useState, useEffect} from "react";
import { HeaderRes } from "../../components/administrator/HeaderRes";
import { AddRes } from "../../components/administrator/AddRes";
import { Dropdown, Spinner, Table } from "flowbite-react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { employeeByClass, getAllEmployees } from "../../utils/gql";
import { Loading } from "../../components/utils/Loading";
import { AddEmployee } from "../../components/administrator/AddEmployee";
import { useRouter } from "next/router";
export default function Restaurant(){
    const {loading, error, data} = useQuery(getAllEmployees);
    const [Query, {data: d, loading: l}] = useLazyQuery(employeeByClass);
    const [toggleAdd, setAdd] = useState<boolean>(false);
    const [classe, setClass] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [employees, setEmployees] = useState(null);
    const toggle = ()=>{
        setAdd(!toggleAdd);
    }
    const {push}= useRouter();

    useEffect(()=>{
        let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "administrator")
                push("/");
    }, []);
    useEffect(()=>{
        setEmployees(data?.getAllEmployee)
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
                <div className="p-2 flex gap-5">
                    <input type="text" className="p-2 rounded-md border-[1px]" placeholder="search by class" onChange={(e)=>setClass(e.target.value)}/>
                    <Dropdown label="Dropdown button">
                        <Dropdown.Item onClick={()=>setYear(1)}>first year</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setYear(2)}>second year</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setYear(0)}>all</Dropdown.Item>
                    </Dropdown>
                </div>
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
                        {(data && employees) && employees.map(({id, email, first_name, last_name, phone, class: c, year: y})=>{
                            if(year === y && c.includes(classe))
                                return (<Table.Row>
                                    <Table.Cell>
                                        {first_name}
                                    </Table.Cell>
                                    <Table.Cell>{last_name}</Table.Cell>
                                    <Table.Cell>{phone}</Table.Cell>
                                    <Table.Cell>{email}</Table.Cell>
                                    <Table.Cell>{c}</Table.Cell>
                                    <Table.Cell>{y}</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>);
                            if(year === 0 && c.includes(classe))
                                    return (<Table.Row>
                                        <Table.Cell>
                                            {first_name}
                                        </Table.Cell>
                                        <Table.Cell>{last_name}</Table.Cell>
                                        <Table.Cell>{phone}</Table.Cell>
                                        <Table.Cell>{email}</Table.Cell>
                                        <Table.Cell>{c}</Table.Cell>
                                        <Table.Cell>{y}</Table.Cell>
                                        <Table.Cell></Table.Cell>
        
                                    </Table.Row>)
                        })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </main>
    </>);
}