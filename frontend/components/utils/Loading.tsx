import { Spinner } from "flowbite-react";
export const Loading = ()=>{
    return <div className="h-screen w-screen absolute flex justify-center items-center bg-transparent/80">
                <div className="p-4 rounded-md bg-white">
                    <Spinner aria-label="Spinner button example" color="info"/>
                </div>
            </div>
}