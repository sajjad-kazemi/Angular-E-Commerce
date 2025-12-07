import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { EcommerceStore } from '../../../ecommerce-store';
import { CartItemCard } from "../cart-item-card/cart-item-card";

@Component({
  selector: 'app-cart-items-list',
  imports: [ViewPanel, CartItemCard],
  template: `
    <div appViewPanel>
      <h2 class="text-xl">Cart Items {{store.cartLength()}}</h2>
      <div class="flex flex-col gap-6">
        @for (item of store.getCartProducts(); track item.id) {
          <app-cart-item-card (DeleteFromCart)="store.deleteFromCart($event)" (AddToCart)="store.addToCart($event)" (RemoveOneFromCart)="store.removeOneFromCart($event)" [item]="item"></app-cart-item-card>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CartItemsList {
  store = inject(EcommerceStore);
}
