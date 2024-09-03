import { atom } from 'jotai';
import { User } from './types/user';

export const countAtom = atom(0);
export const userAtom = atom<User | null | undefined>(undefined);