import styles from "./styles.module.scss";
import { useCallback, useState } from "react";


type BreadCrumb = {
    title: string;
    id: string;
};

function BreadCrumps({ breadCrumps }: { breadCrumps: BreadCrumb[] }) {

    return (
        <div className={`${styles.breadCrumps} container`}>
            {breadCrumps.map((breadCrumb, index) => (
                <p key={index}>{breadCrumb.title}</p>
            ))}
        </div>
    )

}

export function useBreadCrumps() {
    const [breadCrumps, setBreadCrumps] = useState<BreadCrumb[]>([]);

    return { setBreadCrumps, breadCrumps };

}


export default BreadCrumps;
