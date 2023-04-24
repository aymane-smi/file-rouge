import Head from "next/head";
import styles from "../../styles/restaurant.module.css";
import { HeaderRes } from "../../components/restaurant/HeaderRes";
import { useEffect, useState } from "react";
import { CardInfo } from "../../components/restaurant/CardInfo";
import { AddMenu } from "../../components/restaurant/AddMenu";
import { AddCategory } from "../../components/restaurant/AddCategory";
import { RestaurantOrders, changeStatus, deleteMenu, getRestaurantMenus } from "../../utils/gql";
import { Menus } from "../../utils/types";
import { Table } from "flowbite-react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Loading } from "../../components/utils/Loading";
import { AddDetails } from "../../components/restaurant/AddDetails";
import { EditMenu } from "../../components/restaurant/EditMenu";
import { toast } from "react-toastify";
import { ShowDetails } from "../../components/restaurant/ShowDetails";
import SideBar from "../../components/restaurant/sideBar";
import { AuthRestaurant } from "../../utils/authRestaurant";
import { useRouter } from "next/router";

export default function Index(){
        const [GetRestaurantById, {data, loading, error}] = useLazyQuery(getRestaurantMenus);
        const [MyMutation, {data:d, loading:l, error:e}] = useMutation(deleteMenu);
        const [editStatus, {data: dd, loading: ll, error: ee}] = useMutation(changeStatus);
        const {data: ddd, loading: lll} = useQuery(RestaurantOrders);
        const {push} = useRouter();
        useEffect(()=>{
            let token = localStorage.getItem("token");
            let role = localStorage.getItem("role");
            if(!token || role != "restaurant")
                push("/");
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
        const [info, setInfo] = useState<boolean>(false);

        useEffect(()=>{}, [menus]);

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

        const handleMenu = (e)=>{
            MyMutation({
                variables: {
                    id: parseInt(e.target.value)
                }
            });

            setMenus((old)=>old?.filter((menu)=>menu.id !== e.target.value));

            toast.success("menu deleted", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        const handleStatus = (e, available: boolean)=>{
            editStatus({
                variables: {
                    id: parseInt(e.target.value),
                    status: !available,
                }
            });

            setMenus((old)=>{
                let tmp = old?.map((item)=>{
                    if(item.id == e.target.value)
                        return {
                            ...item,
                            available,
                        }
                    return item;
                });
                console.log(tmp, e.target.value);
                return tmp;
            });

            toast.success("status changed", {
                position: toast.POSITION.TOP_RIGHT
            });
        };

        const toggleInfo = (e)=>{

            setInfo((old)=>!old);
            setMenuId(parseInt(e.target.value));
        }

        if(loading || l || ll || lll || ddd == undefined)
            return <Loading />
        else
            return (<>
            <Head>
                <title>Restaurant Dashboard</title>
            </Head>
            {Edit && <EditMenu toggle={setEdit} id={editId}/>}
            {toggleMenu && <AddMenu toggle={toggle} menu={setMenus}/>}
            {Category && <AddCategory toggle={toggleCategory}/>}
            {addDetails && <AddDetails id={menuId} toggle={toggleDetails}/>}
            {info && <ShowDetails id={menuId} toggle={setInfo}/>}
            <main className="flex w-screen h-screen">
                <SideBar />
                <div className={["max-h-screen pb-3", "overflow-y-scroll", styles.width].join(" ")}>
                    <HeaderRes toggle={toggle} category={toggleCategory}/>
                    <div className="flex gap-5 justify-center items-center mt-5">
                    <CardInfo description="number of orders" numberOf={ddd.OrderByRestaurant}/>
                    <CardInfo description="successful order" numberOf={ddd.OrderSuccess}/>
                    <CardInfo description="canceled order" numberOf={ddd.OrderFailure}/>
                    </div>
                    <Table className="z-0 mt-10">
                        <Table.Head>
                            <Table.HeadCell>name</Table.HeadCell>
                            <Table.HeadCell>image</Table.HeadCell>
                            <Table.HeadCell>category</Table.HeadCell>
                            <Table.HeadCell>status</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {menus && menus.map(({id, name, image, available, category_id})=>(<Table.Row key={id}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>
                                    <img src={"http://localhost:9003/storage/menu/"+image} className="w-[100px] h-[100px]"/>
                                </Table.Cell>
                                <Table.Cell>
                                    {category_id}
                                </Table.Cell>
                                <Table.Cell>
                                    {available ? <p className="py-2 px-4 rounded-md bg-green-100 text-green-600 w-fit">available</p> : <p className="py-2 px-4 rounded-md bg-red-100 text-red-600 w-fit">not available</p>}
                                </Table.Cell>
                                <Table.Cell>
                                    <button className="rounded-md font-semibold text-orange-500 p-3 bg-orange-200" onClick={toggleEdit} value={id}>edit</button>
                                    <button className="rounded-md ml-2 font-semibold text-red-500 p-3 bg-red-200" value={id} onClick={handleMenu}>remove</button>
                                    {available ? <button className="rounded-md ml-2 font-semibold text-gray-500 p-3 bg-gray-200" onClick={(e)=>handleStatus(e, available)} value={id}>disable</button> : <button className="rounded-md ml-2 font-semibold text-blue-500 p-3 bg-blue-200" onClick={(e)=>handleStatus(e, available)} value={id}>enable</button>}
                                    <button className="ml-2 rounded-md font-semibold text-green-500 p-3 bg-green-200" value={id} onClick={handleDetails}>add details</button>
                                    <button className="ml-2 rounded-md font-semibold text-blue-200 p-3 bg-blue-500" value={id} onClick={toggleInfo} >show details</button>
                                </Table.Cell>
                            </Table.Row>))}
                        </Table.Body>
                    </Table>
                </div>
            </main>
        </>);
}