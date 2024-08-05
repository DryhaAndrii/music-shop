import getBreadCrumps from '@/functions/getBreadCrumps';
import ProductPage from '@/components/ProductPage/productPage';
import CategoryPage from '@/components/CategoryPage/categoryPage';
import getAllPossiblePaths from '@/functions/getAllPossiblePaths';
import checkIsProductOrCategory from '@/functions/checkProductOrCategory';
import { notFound } from 'next/navigation';

const UNDERSCORE_REGEX = /_/g;

interface BreadCrumb {
    title: string;
    id: string;
}

export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
    const slugArray = params.slug;
    const lastSlug = slugArray[slugArray.length - 1];
    const formattedSlug = lastSlug.replace(UNDERSCORE_REGEX, " ");

    const productOrCategoryCheck = await checkIsProductOrCategory(formattedSlug);
    if (productOrCategoryCheck === 'Nothing found') {
        return notFound();
    }
    const breadCrumbs = await getBreadCrumps(formattedSlug);

    return (
        <>
            {productOrCategoryCheck === 'Product found'
                ? <ProductPage breadCrumbs={breadCrumbs} />
                : productOrCategoryCheck === 'Category found'
                    ? <CategoryPage breadCrumbs={breadCrumbs} />
                    : <div>Nothing found</div>}
        </>
    );
}

export async function generateStaticParams() {
    const slugs = await getAllPossiblePaths();
    return slugs;
}