export interface User {
    name: string;
    email: string;
    googleId?: string;
    password?: string;
    cart: string[];
    bookmarks: string[];
}
