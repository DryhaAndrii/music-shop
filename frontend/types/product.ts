

export default interface Product {
    attributes: ProductAttribute[];
    parentCategoryId: string;
    description: {
        raw: string;
        html: string;
    },
    pictureCodes: string[];
    price: string;
    title: string;
    url: string;
    _id: string;
}
export interface ProductAttribute {
    [key: string]: string
}
