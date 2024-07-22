export default interface CategoryAttribute {
    name: string;
    options: Option[];
}
export interface Option {
    [key: number]: string;
}

