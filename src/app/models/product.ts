export type Product = {
    id:number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    category: string;
}

export type GetProductFilter = {
    id?:number;
    category?:string;
    name?:string;
}