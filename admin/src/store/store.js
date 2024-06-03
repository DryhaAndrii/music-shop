import { create } from 'zustand'

export const myStore = create((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value })
}))