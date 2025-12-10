import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { CartItemsList } from "./cart-items-list/cart-items-list";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";
import { SummerizeOrder } from "../../components/summerize-order/summerize-order";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-my-cart',
  imports: [BackButton, CartItemsList, TeaseWishlist, SummerizeOrder, MatAnchor],
  template: `
    <div class="mx-auto max-w-[1200px] py-3">
      <app-back-button class="mb-6" [navigateTo]="'/products/all'">Continue Shopping</app-back-button>
      <h1 class="font-bold text-2xl">Shopping Cart</h1>
      <div class="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-3">
          <app-tease-wishlist></app-tease-wishlist>
        </div>
        <div class="lg:col-span-2">
          <app-cart-items-list></app-cart-items-list>
        </div>
        <div class="lg:col-span-1">
          <app-summerize-order>
            <ng-container actionButtons>
              <button class="w-full mt-6 py-3" matButton="filled" [disabled]="store.cartLength() <= 0" (click)="store.proceedToCheckout()">Proceed To Checkout</button>
            </ng-container>
          </app-summerize-order>
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
