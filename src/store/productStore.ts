import { create } from "zustand";
import type { IProduct } from "../types";
import { devtools } from "zustand/middleware";


interface IProductStore {
    products: IProduct[] | null;
    limit: number;
    offset: number;
    select: string;
    search: string;
    setSEarch: (search: string) => void;
    setSelect: (select: string) => void;
    setOffset: (offset: number) => void;
    setLimit: (limit: number) => void;
    setProducts: (products: IProduct[]) => void;
}

export const productStore = create<IProductStore>()(devtools(
    (set) => ({
        select:"",
        products: null,
        limit: 6,
        offset: 0,
        search: "",
        setSEarch: (data) => set({ search: data }),
        setSelect: (data) => set({ select: data }),
        setOffset: (data) => set({ offset: data }),
        setProducts: (data) => set({ products: data })
    })
))