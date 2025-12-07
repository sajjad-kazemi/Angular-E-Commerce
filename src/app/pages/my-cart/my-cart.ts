import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { CartItemsList } from "./cart-items-list/cart-items-list";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";

@Component({
  selector: 'app-my-cart',
  imports: [BackButton, CartItemsList, TeaseWishlist],
  template: `
    <div class="mx-auto max-w-[1200px] py-3">
      <app-back-button class="mb-6" [navigateTo]="'/products/all'">Continue Shopping</app-back-button>
      <h1 class="font-bold text-2xl">Shopping Cart</h1>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-tease-wishlist></app-tease-wishlist>
        </div>
        <div class="lg:col-span-2">
          <app-cart-items-list></app-cart-items-list>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class MyCart {
  store = inject(EcommerceStore);
  cartItems = this.store.getCartProducts();
}
