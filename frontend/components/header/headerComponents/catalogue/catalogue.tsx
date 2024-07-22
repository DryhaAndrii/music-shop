'use client'
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import MyButton from "@/components/myButton/myButton";
import reactDom from "react-dom";
import Link from "next/link";
import Categories from "./catalogueComponents/categories";
import getMainCategories from '@/functions/getMainCategories';

import Category from "@/types/category";

function Catalogue() {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState<Category[]>();

    useEffect(() => {
        fetchCategories();
    }, [])

    async function fetchCategories() {
        const categories = await getMainCategories();
        if (!categories || categories.length === 0) {
            return;
        };//if category not found return
        setCategories(categories);
    }
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