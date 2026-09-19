import { useQuery } from "@tanstack/react-query"
import { api } from "./api"
import type { IProduct } from "../types";


export const useGetProductsQuery = (offset: number, limit: number, select: string, search: string) => {
    return useQuery({
        queryKey: ['products', offset, limit, select, search],
        queryFn: async () => {
            const res = await api.get(`/products`);
            let items: IProduct[] = res.data;

            if (search) {
                items = items.filter(p =>
                    p.title.toLowerCase().includes(search.toLowerCase())
                );
            }

                   if (select) {
                const isDescending = select.startsWith("-");
                const field = (isDescending ? select.slice(1) : select) as keyof IProduct;
                items = [...items].sort((a, b) => {
                    const valA = a[field] as any;
                    const valB = b[field] as any;
                    if (valA < valB) return isDescending ? 1 : -1;
                    if (valA > valB) return isDescending ? -1 : 1;
                    return 0;
                });
            }

            const count = items.length;
            const results = items.slice(offset, offset + limit);

            return { results, count };
        }
    })
}

export const useGetProductIDQuery = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await api.get<IProduct>(`/products/${id}`);
            return res.data
        }
    })
}