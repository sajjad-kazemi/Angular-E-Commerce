import { cartItem } from "./cart";

export type Order = {
    id: string;
    userId: number;
    total: number;
    items: cartItem[];
    paymentStatus: 'success' | 'failure'
}