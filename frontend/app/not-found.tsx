// app/not-found-page.tsx
import Link from 'next/link';
import styles from './not-found-page.module.css'; // Импортируйте стили

const NotFoundPage = () => (
    <div className={styles.container}>
        <div className={styles.errorSection}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>Page Not Found</p>
            <p className={styles.description}>It looks like this page doesn't exist or has been moved.</p>
        </div>
        <div className={styles.linkSection}>
            <Link href="/" className={styles.homeLink}>Go to Homepage</Link>
        </div>
    </div>
);

export default NotFoundPage;
