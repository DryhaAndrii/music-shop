import CategoryAttribute from "@/types/categoryAttribute";

export default interface Category {
    attributes: CategoryAttribute[];
    isSubcategory: boolean;
    pictureCode: string,
    products: Product[];
    subcategories: Category[];
    title: string;
}

export interface Product {
    [key: number]: string;
}