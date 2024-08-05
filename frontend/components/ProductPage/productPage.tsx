'use client'

import Product from "@/types/product"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import styles from "./styles.module.scss"

interface BreadCrumb {
    title: string
    id: string
}

interface ProductProps {
    breadCrumbs: BreadCrumb[]
}

const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;

export default function ProductPage({ breadCrumbs }: ProductProps) {
    const router = useRouter()

    useEffect(() => {
        checkUrl();
    }, [])
    function checkUrl() {
        const url = breadCrumbs.map((breadCrumb: BreadCrumb) =>
            breadCrumb.title.replace(SPACE_REGEX, "_")
        ).join('/');

        const currentPath = window.location.pathname
        if (currentPath !== `/${url}`) {
            console.log('moving to ' + url);
            router.push(`/${url}`)
        }
    }


    if (!breadCrumbs) return;

    return (
        <div>
            <h1>Product</h1>
            {breadCrumbs.map((breadCrumb, index) => (
                <p key={index}>{breadCrumb.title}</p>
            ))};
        </div>
    )
}