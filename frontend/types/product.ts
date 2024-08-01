

export default interface Product {
    attributes: [{
        [key: string]: string
    }];
    parentCategoryId: string;
    description: {
        raw: string;
        html: string;
    },
    pictureCodes: string[];
    price: string;
    title: string;
    _id: string;
}
