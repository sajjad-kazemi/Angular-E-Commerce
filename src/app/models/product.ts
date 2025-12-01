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
    amountInCart?:number;
}

export type GetProductFilter = {
    id?:number;
    category?:string;
    name?:string;
    onlyInStock?: boolean;
}

export const Categories:string[] =  ['all','accessory','technology','clothes']