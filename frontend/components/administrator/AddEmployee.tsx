import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";
import { useMutation } from "@apollo/client";
import { addEmployee, addRestaurant } from "../../utils/gql";
import { EmployeeInput as type } from "../../utils/types";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export const AddEmployee = ({toggle})=>{
    const [MyMutation, {data, error, loading}] = useMutation(addEmployee);
    const [password, setPassword] = useState<string>("");
    const [form, setForm] = useState<type>({
        "email": "",
        "first_name": "",
        "last_name": "",
        "phone": "",
        "password": "",
        "haveTicket": false,
        "class": "",
        "year": 0
    });
    useEffect(()=>{
        let tmp = makeid(8);
        setPassword(tmp);
        setForm((old)=>({...old, password: tmp}));
    }, []);

    useEffect(()=>{
        if(data !== undefined){
            toggle();
            setForm({
                "email": "",
                "first_name": "",
                "last_name": "",
                "phone": "",
                "password": "",
                "haveTicket": false,
                "class": "",
                "year": ""
            });
        }
    },[data]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        MyMutation({variables: {
            input: {
                "email": form.email,
                "first_name": form.first_name,
                "last_name": form.last_name,
                "password": form.password,
                "phone": form.phone,
                "class": form.class,
                "year": parseInt(form.year),
                "haveTicket": form.haveTicket
              }
        }});

        toast.success("new employee was added", {
            position: toast.POSITION.TOP_RIGHT
        });
        toggle();
    };

    const handleInput = (e)=>{
        setForm((old)=>({
            ...old,
            [e.target.name]: e.target.value,
        }));
    };

    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
        {loading ? <Spinner aria-label="Spinner button example" color="info"/> : <div className="bg-white rounded-md p-4 w-[350px] h-[500px] overflow-y-scroll">
            <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={()=>toggle()}/>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="fn" className="font-bold">First name:</label>
                    <input onChange={handleInput} id="fn" type="text" name="first_name" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="ln" className="font-bold">Last name:</label>
                    <input onChange={handleInput} id="ln" type="text" name="last_name" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="email" className="font-bold">Email:</label>
                    <input onChange={handleInput} id="email" type="email" name="email" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="phone" className="font-bold">Phone:</label>
                    <input onChange={handleInput} id="phone" type="text" name="phone" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="password" className="font-bold">Password:</label>
                    <input onChange={handleInput} id="password" value={password} type="text" name="password" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="class" className="font-bold">Class:</label>
                    <input onChange={handleInput} type="text" id="class" name="class" className="outline-none rounded-md w-full h-[50px]"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="year" className="font-bold">Year:</label>
                    <input onChange={handleInput} type="number" max="1" min="1" id="year" name="year" className="outline-none rounded-md w-full h-[50px]"/>
                </div>
                <button className="w-full p-3 bg-black text-white rounded-md">add new employee</button>
            </form>
        </div>}
    </div>)
};