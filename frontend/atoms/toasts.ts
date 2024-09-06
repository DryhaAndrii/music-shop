import { TOAST_TYPES } from "@/types/toastTypes";
import { atom } from 'jotai';
import { ToastType } from "@/types/toastTypes";

export const TOAST_LIFE_TIME = 5000;

export const toastsAtom = atom<ToastType[]>([]);

export const addToastAtom = atom(
    null,
    (get, set, { message, type }: { message: string; type: TOAST_TYPES }) => {
        const id = Date.now();
        set(toastsAtom, (prevToasts) => [
            ...prevToasts,
            { id, message, type }
        ]);

        setTimeout(() => {
            set(toastsAtom, (prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
            );
        }, TOAST_LIFE_TIME  ); 
    }
);