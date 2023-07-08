type ProductType = {
    _id: string;
    image: string;
    name: string;
    description?: string;
    price?: number;
    quantity?: number;
    category_id?: string;
    featured?: string;
    extras?: string;
}

type CartType = {
    _id: string;
    products: {
        product_id: string;
        is_selected: boolean;
        quantity: number;
    }[],
    price: number;
    user_id: string;
}

type CartProductType = {
    _id: number,
    is_selected: boolean,
    quantity: number
}


type CategoriesType = {
    _id: string;
    name: string;
    image: string;
    description?: string;
}

type CategoriesProductsType = {
    _id: string;
    name: string;
    image: string;
    alt: string;
    price: string;
    category_id?: string;
}


type CartProductsType = {
    product_id: string;
    is_selected: boolean;
    quantity: number;
}