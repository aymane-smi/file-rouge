'use client';

import { createContext, useContext, useState } from "react";
import { cart } from "../utils/types";

export const CartContext = createContext<cart | null>(null);

export const CartProvider = ({children})=>{
    const [cartItems, setCart] = useState<cart>([]);
    const [open, setOpen] = useState<boolean>(false);
    return <CartContext.Provider value={{ cartItems, setCart, open, setOpen}}>
        {children}
    </CartContext.Provider>
}

export const GlobalCartContext = () => useContext(CartContext);