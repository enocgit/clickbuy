export type ProductType = {
    _id: number;
    image: string;
    name: string;
    description?: string;
    price?: number;
    quantity?: number;
    category_id?: string;
    featured?: string;
    extras?: string;
}

export type ProductTypeArray = {
    _id: number;
    image: string;
    name: string;
    description?: string;
    price?: number;
    quantity?: number;
    category_id?: string;
    featured?: string;
    extras?: string;
}[]


export type CartProductsType = {
    product_id: string;
    is_selected: boolean;
    quantity: number;
}