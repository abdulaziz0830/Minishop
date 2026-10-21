import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import type { IProfile } from "../types";

export const getStoredUserId = (): string | null => {
    const stored = localStorage.getItem("userId");
    if (stored) return stored;
    const token = localStorage.getItem("access");
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload?.sub) {
                localStorage.setItem("userId", String(payload.sub));
                return String(payload.sub);
            }
        } catch {
            // ignore
        }
    }
    return null;
};

export const useGetProfileQuery = () => {
    const userId = getStoredUserId();
    return useQuery<{ data: IProfile }>({
        queryKey: ["profile", userId],
        queryFn: () => api.get(`/users/${userId || "1"}`),
        enabled: Boolean(localStorage.getItem("access"))
    });
};