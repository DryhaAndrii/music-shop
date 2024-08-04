'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import checkIsProduct from '@/functions/checkIsProduct'
import getBreadCrumps from '@/functions/getBreadCrumps'
import { toast } from "react-toastify";

const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;

interface BreadCrumb {
    title: string;
    // Добавьте другие необходимые поля
}

export default function DynamicPage() {
    const params = useParams()
    const router = useRouter()
    const [isProduct, setIsProduct] = useState(false)
    const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([])
    const slugArray: string[] = Array.isArray(params.slug) ? params.slug : [params.slug];

    useEffect(() => {
        fetchProductData();
    }, [])

    async function fetchProductData() {
        try {
            const lastSlug = slugArray[slugArray.length - 1]
            const formattedSlug = lastSlug.replace(UNDERSCORE_REGEX, " ")

            const [productCheck, breadCrumps] = await Promise.all([
                checkIsProduct(formattedSlug),
                getBreadCrumps(formattedSlug)
            ]);

            setIsProduct(productCheck)
            setBreadCrumbs(breadCrumps)

            const link = breadCrumps.map((breadCrumb: BreadCrumb) =>
                breadCrumb.title.replace(SPACE_REGEX, "_")
            ).join('/')

            const currentPath = window.location.pathname
            if (currentPath !== `/${link}`) {
                router.push(`/${link}`)
            }
        } catch (error: any) {
            console.error("Error fetching product data:", error)
            toast.error('Some error happened during checking if url is product: ' + error.message);

        }
    }

    return (
        <div>
            <h1>{isProduct ? 'Product`s page' : 'Category`s page'}</h1>
            <p>Current path: {slugArray.join(' / ')}</p>
            <div>
                <h2>Structure:</h2>
                <ul>
                    {slugArray.map((item, index) => (
                        <li key={index}>
                            {index === slugArray.length - 1 && isProduct ? 'Product' : 'Category'} {index + 1}: {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}