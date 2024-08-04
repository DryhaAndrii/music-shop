// app/[...slug]/page.tsx

import checkIsProduct from '@/functions/checkIsProduct';
import getBreadCrumps from '@/functions/getBreadCrumps';
import ProductPage from '@/components/ProductPage/productPage';
import CategoryPage from '@/components/CategoryPage/categoryPage';
import getAllPossiblePaths from '@/functions/getAllPossiblePaths';

const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;

interface BreadCrumb {
    title: string;
    id: string;
}

interface DynamicPageProps {
    isProduct: boolean;
    breadCrumbs: BreadCrumb[];
}

export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
    const slugArray = params.slug;
    const lastSlug = slugArray[slugArray.length - 1];
    const formattedSlug = lastSlug.replace(UNDERSCORE_REGEX, " ");


    const [productCheck, breadCrumps] = await Promise.all([
        checkIsProduct(formattedSlug),
        getBreadCrumps(formattedSlug)
    ]);



    return (
        <>
            {productCheck
                ? <ProductPage breadCrumbs={breadCrumps} />
                : <CategoryPage breadCrumbs={breadCrumps} />}
        </>
    );
}

// Define the static paths to be generated at build time
export async function generateStaticParams() {
    // Define a way to fetch all possible slug paths.
    const slugs = await getAllPossiblePaths();
    return slugs;
}