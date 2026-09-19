import { useQuery } from "@tanstack/react-query"
import { api } from "./api"
import type { IProfile } from "../types"


export const useGetProfileQuery = () => {
    return useQuery<{ data: IProfile }>({
        queryKey: ["profile"],
        queryFn: () => api.get("/users/1")
    })
}