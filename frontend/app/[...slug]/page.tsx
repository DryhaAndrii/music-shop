'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import checkIsProduct from '@/functions/checkIsProduct'
import getBreadCrumps from '@/functions/getBreadCrumps'
import { toast } from "react-toastify";
import ProductPage from '@/components/ProductPage/productPage'
import CategoryPage from '@/components/CategoryPage/categoryPage'

const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;



interface BreadCrumb {
    title: string
    id: string
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


            //If user somehow went to wrong url we should redirect him to right url
            const url = breadCrumps.map((breadCrumb: BreadCrumb) =>
                breadCrumb.title.replace(SPACE_REGEX, "_")
            ).join('/')

            const currentPath = window.location.pathname
            if (currentPath !== `/${url}`) {
                router.push(`/${url}`)
            }
        } catch (error: any) {
            console.error("Error fetching product data:", error)
            toast.error('Some error happened during checking if url is product: ' + error.message);

        }
    }

    return (
        <>
            {isProduct
                ? <ProductPage breadCrumbs={breadCrumbs} />
                : <CategoryPage breadCrumbs={breadCrumbs} />}

        </>
    )
}