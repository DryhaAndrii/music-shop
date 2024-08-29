'use client'

import styles from './styles.module.scss';

interface Props {
    loggingIn: boolean
    setLoggingIn: (loggingIn: boolean) => void
}


export default function Switcher({ loggingIn, setLoggingIn }: Props) {
    return (
        <div className={styles.switcher}>
            <div onClick={() => setLoggingIn(true)} className={loggingIn ? styles.active : ''}>
                Log in
            </div>
            <div onClick={() => setLoggingIn(false)} className={!loggingIn ? styles.active : ''}>
                Sign in
            </div>
        </div>
    );
}
