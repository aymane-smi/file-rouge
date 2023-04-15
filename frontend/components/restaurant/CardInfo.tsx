import { FC } from "react";
import { cardInfo } from "../../utils/types";
import CountUp from 'react-countup';

export const CardInfo:FC<cardInfo> = ({numberOf, description})=>{
    return (<div className="p-4 w-[300px] h-[100px] rounded-md border border-black flex justify-between items-center">
        <p className="font-bold text-[20px] w-[150px]">{description}</p>
        <p className="font-semibold text-[30px]">
            <CountUp end={numberOf} delay={2} start={0}/>
        </p>
    </div>)
};