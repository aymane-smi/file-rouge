export default function Cart(){
    return (
        <div className="absolute w-[400px] h-fit max-h-[400px] rounded-md shadow-md bg-white p-5 overflow-y-scroll">
            <p className="text-[20px] font-bold">My orders</p>
            {[1,2,3,4,5].map((item)=>(
                <div className="mt-3 flex justify-between items-center" key={"cart-"+item}>
                    <img className="w-[60px] h-[60px] rounded-md" src="https://images.unsplash.com/photo-1555554317-766200eb80d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"/>
                    <div className="flex flex-col text-[13px] font-bold justify-center items-center gap-2">
                        <p className="text-[16px]">Sandwish</p>
                        <div className="flex gap-3">
                            <span className="border h-[20px] w-[20px] text-center leading-[20px] rounded-md">-</span>
                            <span>1</span>
                            <span className="border h-[20px] w-[20px] text-center leading-[20px] rounded-md">+</span>
                        </div>
                    </div>
                    <button className="text-white bg-red-500 rounded-md p-1 text-[13px]">remove</button>
                </div>
            ))}
            <div className="w-full flex justify-center items-center">
                <button className="p-2 bg-green-500 text-white mt-4 rounded-md">confirme order</button>
            </div>
        </div>
    );
}