import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IChangeProfile, ILogin, IRegister } from "../types"
import { api } from "./api"

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: (data: IRegister) => api.post("/register", data)
    })
}
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: (data: ILogin) => api.post("/login", { email: data.username, password: data.password }),
        onSuccess: ({ data }) => {
            localStorage.setItem("access", data.accessToken)
        }
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: IChangeProfile, id: number }) => {
            return api.patch(`/users/${id}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        }
    })
}

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: any, id: number }) => {
            const formData = new FormData();
            formData.append("avatar", data);
            return api.patch(`/users/${id}`, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        }
    })
}