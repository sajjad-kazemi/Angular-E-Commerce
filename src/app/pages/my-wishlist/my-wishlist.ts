import { Component, computed, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BackButton } from '../../components/back-button/back-button';
import { ProductCard } from '../../components/product-card/product-card';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-my-wishlist',
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon,
    BackButton,
    ProductCard,
    MatAnchor,
    RouterLink,
  ],
  template: `
    <div class="mx-auto max-w-[1200px] px-4">
      <app-back-button class="mb-3" navigateTo="/products">{{
        'back to home' | titlecase
      }}</app-back-button>
      <div class="flex justify-between mb-10">
        <h1 class="text-3xl font-bold">Wishlist</h1>
        <p class="text-lg">
          {{ wishlistLen() || 'No' }} Item{{ wishlistLen() > 1 ? 's' : '' }}
        </p>
      </div>
      @if(wishlistLen() > 0){
      <div class="responsive-grid">
        @for(item of this.store.getWishlistItems();track item.id;){
        <app-product-card [product]="item" [wishlistDeleteButton]="true" />
        }
      </div>
      } @else {
      <div
        class="flex flex-col items-center justify-center py-16 text-center gap-5"
      >
        <mat-icon class="text-gray-400 transform scale-150"
          >favorite_border</mat-icon
        >
        <div>
          <h2 class="text-xl font-bold">{{ 'your wishlist is empty' | titlecase }}</h2>
          <p class="text-gray-600 mb-8 text-lg">
            {{ 'save your favorite items here' | titlecase }}
          </p>
        </div>
        <button matButton="filled" routerLink="/products/all">
          Explore Products
        </button>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
  wishlistLen = computed(() => {
    return this.store.getWishlistItems().length;
  });
}
