import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Item from './item';

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
                    <Item item={item}  key={item._id}/>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;