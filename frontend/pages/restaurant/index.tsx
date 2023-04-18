import Head from "next/head";
import SideBar from "../../components/employee/sideBar";
import styles from "../../styles/restaurant.module.css";
import { HeaderRes } from "../../components/restaurant/HeaderRes";
import { useEffect, useState } from "react";
import { CardInfo } from "../../components/restaurant/CardInfo";
import { AddMenu } from "../../components/restaurant/AddMenu";
import { AddCategory } from "../../components/restaurant/AddCategory";
import { getRestaurantMenus } from "../../utils/gql";
import { Menus } from "../../utils/types";
import { Table } from "flowbite-react";
import { useLazyQuery } from "@apollo/client";
import { Loading } from "../../components/utils/Loading";
import { AddDetails } from "../../components/restaurant/AddDetails";
import { EditMenu } from "../../components/restaurant/EditMenu";

export default function index(){
        const [GetRestaurantById, {data, loading, error}] = useLazyQuery(getRestaurantMenus);
        useEffect(()=>{
            GetRestaurantById({
                variables: {
                    id: parseInt(JSON.parse(localStorage.getItem("user")).id),
                }
            });
        },[]);
        useEffect(()=>{
            setMenus(data?.getRestaurantById?.menus);
        }, [data]);
        const [menus, setMenus] = useState<Menus | null>(null);
        const [toggleMenu, setToggleMenu] = useState<boolean>(false);
        const [Category, setToggleCategory] = useState<boolean>(false);
        const [addDetails, setAddDetails] = useState<boolean>(false);
        const [menuId, setMenuId] = useState<number>(0);
        const [Edit, setEdit] = useState<boolean>(false);
        const [editId, setEditId] = useState<number>(0);
        const toggle = ()=>{
            setToggleMenu(!toggleMenu);
        }
        const toggleCategory = ()=>{
            setToggleCategory(!Category);
        }

        const handleDetails = (e)=>{
            setMenuId(e.target.value);
            setAddDetails(true);
        }

        const toggleDetails = ()=>{
            setAddDetails(!addDetails);
        }

        const toggleEdit = (e)=>{
            setEditId(parseInt(e.target.value));
            setEdit(!Edit);
        }

        if(loading)
            return <Loading />
        else
            return (<>
            <Head>
                <title>Restaurant Dashboard</title>
            </Head>
            {Edit && <EditMenu toggle={setEdit} id={editId}/>}
            {toggleMenu && <AddMenu toggle={toggle}/>}
            {Category && <AddCategory toggle={toggleCategory}/>}
            {addDetails && <AddDetails id={menuId} toggle={toggleDetails}/>}
            <main className="flex w-screen h-screen">
                <SideBar />
                <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                    <HeaderRes toggle={toggle} category={toggleCategory}/>
                    <div className="flex gap-5 justify-center items-center mt-5">
                    <CardInfo description="number of orders" numberOf={12}/>
                    <CardInfo description="successful order" numberOf={10}/>
                    <CardInfo description="canceled order" numberOf={2}/>
                    </div>
                    <Table className="z-0 mt-10">
                        <Table.Head>
                            <Table.HeadCell>name</Table.HeadCell>
                            <Table.HeadCell>image</Table.HeadCell>
                            <Table.HeadCell>status</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {menus && menus.map(({id,name, image, available})=>(<Table.Row key={id}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>
                                    <img src={"http://localhost:9003/storage/menu/"+image} className="w-[100px] h-[100px]"/>
                                </Table.Cell>
                                <Table.Cell>
                                    {available ? <p className="py-2 px-4 rounded-md bg-green-100 text-green-600 w-fit">available</p> : <p className="py-2 px-4 rounded-md bg-red-100 text-red-600 w-fit">not available</p>}
                                </Table.Cell>
                                <Table.Cell>
                                    <button className="rounded-md font-semibold text-orange-500 p-3 bg-orange-200" onClick={toggleEdit} value={id}>edit</button>
                                    <button className="rounded-md ml-2 font-semibold text-red-500 p-3 bg-red-200">remove</button>
                                    {available ? <button className="rounded-md ml-2 font-semibold text-gray-500 p-3 bg-gray-200">disable</button> : <button className="rounded-md ml-2 font-semibold text-blue-500 p-3 bg-blue-200">enable</button>}
                                    <button className="ml-2 rounded-md font-semibold text-green-500 p-3 bg-green-200" value={id} onClick={handleDetails}>add details</button>
                                </Table.Cell>
                            </Table.Row>))}
                        </Table.Body>
                    </Table>
                </div>
            </main>
        </>);
}