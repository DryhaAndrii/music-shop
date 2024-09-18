export interface User {
    name: string;
    email: string;
    googleId?: string;
    cart: cartItem[];
    bookmarks: string[];
}
export interface cartItem {
    product: string;
    quantity: number;
}
