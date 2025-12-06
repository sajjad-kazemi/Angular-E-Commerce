import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { BackButton } from "../../components/back-button/back-button";
@Component({
  selector: 'app-my-wishlist',
  imports: [CommonModule, MatCardModule, MatIcon, BackButton],
  template: `
    <div class="mx-auto max-w-[1200px] px-4">
      <app-back-button navigateTo="/products">Back To Home</app-back-button>
      @for(item of wishlistItems;track item.id;){
      <div>
        {{ item.name }}
      </div>
      } @empty {
      <mat-card class="text-center max-w-[600px] mx-auto" color="">
        <div class="text-red-500">
          <mat-icon>priority_high</mat-icon>
        </div>
        <div class="text-center text-lg">
          <h2 class="warning-title">there is no item in your wishlist</h2>
          <p class="warning-description">
            Browse items and add them to your wishlist to see them here.
          </p>
        </div>
      </mat-card>
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
  wishlistItems = this.store.getWishlistItems();
}