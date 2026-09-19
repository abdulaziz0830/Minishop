import { create } from "zustand";
import type { IProduct } from "../types";
import { devtools } from "zustand/middleware";


interface IBasketStore {
    basket: IProduct[];
    setBasket: (basket: IProduct[]) => void;
}
const localBasket = () => {
    const data = localStorage.getItem("basket");
    if (data) {
        return JSON.parse(data);
    }else {
        return [];
    }
}

export const basketStore = create<IBasketStore>()(devtools(
    (set) => ({
        basket: localBasket(),
        setBasket: (data) => {
            localStorage.setItem("basket", JSON.stringify(data))
            set({ basket: data })
        }
    })
))