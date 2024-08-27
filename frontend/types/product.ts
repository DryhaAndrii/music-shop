

export default interface Product {
    attributes: ProductAttribute[];
    parentCategoryId: string;
    description: ProductDescriptions
    pictureCodes: string[];
    price: string;
    title: string;
    url: string;
    _id: string;
    discount?: string
}
export interface ProductAttribute {
    [key: string]: string
}
export interface ProductDescriptions {
    raw: string;
    html: string;
}
