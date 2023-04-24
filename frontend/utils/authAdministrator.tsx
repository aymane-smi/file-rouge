import { useRouter } from "next/router"
import { useEffect } from "react";

export const AuthAdministrator = ()=>{
    const {router} = useRouter();

    useEffect(()=>{
        let token = localStorage.getItem("token");
        let role = localStorage.getItem("role"));
        if(!token && role !== "administrator")
            router.push("/");
    },[]);
}
