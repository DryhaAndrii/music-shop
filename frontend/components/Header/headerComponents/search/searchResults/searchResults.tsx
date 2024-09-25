import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

function SearchResults({ searchResults, hideEverything }: any) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    //useEffect to hide element if clicked out of this component
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                hideEverything();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hideEverything]);

    if (searchResults === null) {
        return null;
    }
    if (searchResults.length === 0) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.searchResults}>
                    <h3 style={{ textAlign: 'center' }}>Nothing was found</h3>
                </div>
            </div>
        )
    }


    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div className={styles.searchResults}>
                {searchResults.map((item: any) => (
                    <Link href={item.url} key={item._id}>
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

                ))}
            </div>
        </div>
    );
}

export default SearchResults;