

export default interface Category {
    attributes: CategoryAttribute[];
    isSubcategory: boolean;
    pictureCode: string,
    products: Product[];
    subcategories: Category[];
    title: string;
}

interface Product {
    [key: number]: string;
}
export interface CategoryAttribute {
    name: string;
    options: Option[];
}
export interface Option {
    [key: number]: string;
}

