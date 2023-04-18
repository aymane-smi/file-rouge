import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";
import { useMutation } from "@apollo/client";
import { addCategory } from "../../utils/gql";
import { addMenu as type } from "../../utils/types";
import { Spinner } from "flowbite-react";
import EmojiPicker from "emoji-picker-react";

export const AddCategory = ({toggle})=>{
    const [Mutation, {data, error, loading}] = useMutation(addCategory);
    const [name, setName] = useState<string>("");
    const [emoji, setEmoji] = useState<string>("");

    useEffect(()=>{
        if(data !== undefined){
            toggle();
            setName("");
            setEmoji("");
        }
    },[data]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        Mutation({variables: {
            name,
            emoji,
            restaurant_id: JSON.parse(localStorage.getItem("user")).id,
        }});
    };

    const handleName= (e)=>{
        setName(e.target.value);
    };
    const handleEmoji= (emoji, e)=>{
        setEmoji(emoji.getImageUrl());
    };

    return (<div className="absolute w-screen h-screen bg-transparent/80 flex justify-center items-center z-[99999]">
        {loading ? <Spinner aria-label="Spinner button example" color="info"/> : <div className="bg-white rounded-md p-4 w-[350px] h-[500px] overflow-y-scroll">
            <div className="w-full flex justify-end items-center">
                <GrClose size={20} color="gray" onClick={()=>toggle()}/>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="name" className="font-bold">Name:</label>
                    <input onChange={handleName} id="name" type="text" name="name" className="outline-none rounded-md w-full"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label htmlFor="password" className="font-bold">emoji:</label>
                    <EmojiPicker width={300} height={350} onEmojiClick={handleEmoji}/>
                </div>
                <button className="w-full p-3 bg-black text-white rounded-md">add new menu</button>
            </form>
        </div>}
    </div>)
};