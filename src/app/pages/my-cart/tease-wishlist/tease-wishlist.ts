import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel, MatIcon, RouterLink, MatAnchor],
  template: `
    <div appViewPanel class="flex items-center justify-start gap-6">
    <div class="text-red-500 my-auto"> 
      <mat-icon >favorite_border</mat-icon>
    </div>  
      <div class="flex flex-col ">
        <h2 class="text-2xl font-bold mb-4">Wish list ({{ store.wishlistLength() }})</h2>
        <p>You have {{ store.wishlistLength() }} items in your wish list</p>
      </div>
      <div class="ml-auto flex gap-6 items-center">
        <a class="underline" [routerLink]="'/my_wishlist'">View All</a>
        <button (click)="store.allWishlistToCart()" matButton="filled">
          <mat-icon>shopping_cart</mat-icon>
          Add All to Cart
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeaseWishlist {
  store = inject(EcommerceStore);
}
