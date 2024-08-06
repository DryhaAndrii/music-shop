import Link from 'next/link';
import styles from "./styles.module.scss";

interface BreadCrumpsProps {
    path: string;
}

function BreadCrumps({ path }: BreadCrumpsProps) {
    const segments = path.split('/').filter(Boolean);

    const accumulatedPaths = segments.map((segment, index) =>
        segments.slice(0, index + 1).join('/')
    );

    return (
        <div className={`${styles.breadCrumps} container`}>
            <Link href={`/`}>
                <span className="material-symbols-outlined">
                    home
                </span>/
            </Link>
            {accumulatedPaths.map((crumbPath, index) => (
                <span key={index}>
                    {index === accumulatedPaths.length - 1 ? (
                        // If the current path is the last one, then we display the text
                        <span className={styles.last}>{segments[index].replace(/_/g, " ")}</span>
                    ) : (
                        // If the current path is not the last one, then we display the link
                        <Link href={`/${crumbPath}`}>
                            {segments[index].replace(/_/g, " ")}
                        </Link>
                    )}
                    {index !== accumulatedPaths.length - 1 && <span>/</span>}
                </span>
            ))}
        </div>
    );
}

export default BreadCrumps;