import Link from "next/link";

import styles from './styles.module.scss';

export default function Item({ item }: any) {
    return (
        <Link href={item.url}>
            <div className={styles.searchResults__item}>
                <div>
                    {item.type === 'category' && (
                        <span className="material-symbols-outlined">
                            grid_view
                        </span>
                    )}
                    {item.type === 'product' && (
                        <span className="material-symbols-outlined">
                            pallet
                        </span>
                    )}
                </div>
                <div className={styles.imageContainer}>
                    {item.pictureCode && (
                        <img
                            className={styles.image}
                            src={`data:image/png;base64, ${item.pictureCode}`}
                            alt="categoryPicture"
                        />
                    )}
                    {item.pictureCodes && (
                        <img
                            className={styles.image}
                            src={`data:image/png;base64, ${item.pictureCodes[0]}`}
                            alt="categoryPicture"
                        />
                    )}
                </div>
                <div>
                    <p>{item.title}</p>
                </div>
            </div>
        </Link>
    )
}