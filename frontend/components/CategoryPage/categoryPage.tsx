'use client'
import Category from "@/types/category"
import styles from "./styles.module.scss"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface BreadCrumb {
    title: string
    id: string
}

interface CategoryProps {
    breadCrumbs: BreadCrumb[]
}

const SPACE_REGEX = / /g;

export default function CategoryPage({ breadCrumbs }: CategoryProps) {
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
            <h1>Category</h1>
            {breadCrumbs.map((breadCrumb, index) => (
                <p key={index}>{breadCrumb.title}</p>
            ))};
        </div>
    )
}