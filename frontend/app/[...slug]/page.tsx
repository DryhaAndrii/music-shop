'use client'

import checkIsProduct from '@/functions/checkIsProduct'
import getBreadCrumps from '@/functions/getBreadCrumps'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function DynamicPage() {
    const params = useParams()
    const [isProduct, setIsProduct] = useState(false)
    const slugArray = params.slug

    useEffect(() => {

        //checkIfProduct();
        setBreadCrumps();
    }, [slugArray])

    async function checkIfProduct() {
        const lastSlug = slugArray[slugArray.length - 1]
        const productCheck = await checkIsProduct(lastSlug.replace(/_/g, " "));//replacing all '_' in slug to ' ' spaces
        setIsProduct(productCheck)
    }
    async function setBreadCrumps() {
        const lastSlug = slugArray[slugArray.length - 1]
        const breadCrumps = await getBreadCrumps(lastSlug.replace(/_/g, " "));//replacing all '_' in slug to ' ' spaces
        console.log(breadCrumps)
    }

    return (
        <div>
            <h1>{isProduct ? 'Страница товара' : 'Страница категории'}</h1>
            <p>Текущий путь: {slugArray.join(' / ')}</p>
            <div>
                <h2>Структура:</h2>
                <ul>
                    {slugArray.map((item, index) => (
                        <li key={index}>
                            {index === slugArray.length - 1 && isProduct ? 'Товар' : 'Категория'} {index + 1}: {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}