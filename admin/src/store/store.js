import { create } from 'zustand'
import {devtools} from 'zustand/middleware'
export const myStore = create(devtools((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),
    login: false,
    setLogin: (value) => set({ login: value })
})))