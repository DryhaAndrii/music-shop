'use client'
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

import styles from "./styles.module.scss";
import MyButton from "@/components/myButton/myButton";
import reactDom from "react-dom";
import Categories from "./catalogueComponents/categories";
import Category from "@/types/category";

function Catalogue({ categories }: { categories: Category[] | undefined }) {
    const [show, setShow] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setShow(false);
    }, [pathname]);

    function toggleMenu() {
        setShow(prev => !prev);
    }
    return (
        <div className={styles.catalogue}>

            <MyButton onClick={toggleMenu}>
                <span className="material-symbols-outlined">widgets</span>
            </MyButton>

            {typeof window !== 'undefined'
                ? reactDom.createPortal(
                    <Categories show={show} categories={categories} toggleMenu={toggleMenu} />,
                    document.querySelector<HTMLElement>('header') ?? document.createDocumentFragment()
                )
                : null
            }
        </div >
    );
}

export default Catalogue;

export const revalidate = 3600; // Regenerate the component every hour