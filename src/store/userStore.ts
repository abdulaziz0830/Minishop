import { create } from "zustand";
import type { IProfile } from "../types";
import { devtools } from "zustand/middleware";


interface IUserStore {
    user: IProfile | null;
    setUser: (data: IProfile) => void;
}

export const userStore = create<IUserStore>()(devtools(
    (set) => ({
        user: null,
        setUser: (data) => set({ user: data })
    })
))