'use client';

import { useAtom } from 'jotai';
import { countAtom, userAtom } from '@/atoms';

export default function Counter() {
    const [count, setCount] = useAtom(countAtom);
    const [user] = useAtom(userAtom);
    return (
        <div>
            <h1>Counter</h1>
            <h2>{user?.name}{user?.googleId}{user?.password}</h2>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>
            <h3>{count}</h3>
        </div>
    )
}