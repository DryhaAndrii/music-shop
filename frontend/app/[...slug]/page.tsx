'use client'

import checkIsProduct from '@/functions/checkIsProduct'
import getBreadCrumps from '@/functions/getBreadCrumps'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function DynamicPage() {
    const params = useParams()
    const [isProduct, setIsProduct] = useState(false)
    const slugArray: string[] = Array.isArray(params.slug) ? params.slug : [params.slug];

    useEffect(() => {
        checkIfProduct();
        setBreadCrumps();
    }, [slugArray])

    async function checkIfProduct() {
        const lastSlug = slugArray[slugArray.length - 1]
        const productCheck = await checkIsProduct(lastSlug.replace(/_/g, " "));
        setIsProduct(productCheck)
    }

    async function setBreadCrumps() {
        const lastSlug = slugArray[slugArray.length - 1]
        const breadCrumps = await getBreadCrumps(lastSlug.replace(/_/g, " "));
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