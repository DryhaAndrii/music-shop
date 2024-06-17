import { create } from 'zustand'
import {devtools} from 'zustand/middleware'
export const myStore = create(devtools((set) => ({
    loading: true,
    setLoading: (value) => set({ loading: value }),
})))