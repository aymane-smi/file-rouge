import { useRouter } from "next/router"
import { useEffect } from "react";

export const AuthRestaurant = ()=>{
    const {push} = useRouter();
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if(!token && role !== "restaurant")
        push("/");
}
