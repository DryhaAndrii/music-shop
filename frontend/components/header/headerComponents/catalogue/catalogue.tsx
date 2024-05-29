'use client'
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import MyButton from "@/components/myButton/myButton";
import reactDom from "react-dom";
import Link from "next/link";
import Categories from "./catalogueComponents/categories";

function Catalogue() {
    const [show, setShow] = useState('hidden');
    const [categories, setCategories] = useState<string[]>();

    useEffect(() => {
        fetchCategories();

    }, [])

    async function fetchCategories() {
        const staticData: string[] = await fetch(`https://fakestoreapi.com/products/categories`, { cache: 'force-cache' }).then(res => res.json());
        setCategories([...staticData, ...staticData]);
    }
    function toggleMenu() {
        if (show === 'hidden') {
            setShow('shown')
        }
        else {
            setShow('hidden')
        }
    }
    return (
        <div className={styles.catalogue}>

            <MyButton onClick={toggleMenu}>
                <span className="material-symbols-outlined">widgets</span>
            </MyButton>
            




            {typeof window === 'object'
                ? show === 'hidden'
                    ? null
                    : reactDom.createPortal(
                        <Categories show={show} categories={categories} toggleMenu={toggleMenu} />,
                        document.body
                    )
                : null
            }


        </div >

    );
}

export default Catalogue;