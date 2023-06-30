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