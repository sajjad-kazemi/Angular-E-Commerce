import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { EcommerceStore } from '../../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ToggleWishlistButton } from "../../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-product-info',
  imports: [CommonModule, StockStatus, MatIcon, MatButton, MatIconButton, ToggleWishlistButton],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>
    <div class="flex justify-between">
      <h1 class="text-2xl font-extrabold mb-3">
        {{ product().name | titlecase }}
      </h1>
      <h1 class="text-3xl font-extrabold mb-4">\${{ product().price }}</h1>
    </div>
    <app-stock-status [product]="product()"></app-stock-status>
    <p class="font-semibold mt-2">Description</p>
    <p class="text-gray-600 border-b border-gray-200 pb-4">
      {{ product().description }}
    </p>
    <div class="flex gap-4 mb pb-4 mt-3">
      @if(cartQuantity() <= 0){
      <button matButton="filled" [disabled]="!product().inStock" (click)="addToCart(product().id)" class="w-full">
        <mat-icon [fontIcon]="product().inStock ? 'add' : '' "></mat-icon>
        {{product().inStock ? "Add To Cart" : "Out of Stock"}}
      </button>
      } @else {
      <div class="w-full flex items-center align-center justify-center">
        <button matIconButton (click)="removeFromCart(product().id)">
          <mat-icon>remove</mat-icon>
        </button>
        <span class="m-2 text-xl font-bold">{{ cartQuantity() }}</span>
        <button matIconButton (click)="addToCart(product().id)">
          <mat-icon>add</mat-icon>
        </button>
      </div>
      }
      <app-toggle-wishlist-button [productId]="product().id"></app-toggle-wishlist-button>
    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  store = inject(EcommerceStore);
  product = input.required<Product>();

  cartQuantity = computed(() => {
    return (
      this.store
        .cartItems()
        .find((item) => item.productId === this.product()?.id)?.quantity || 0
    );
  });

  addToCart(productId?: number) {
    this.store.addToCart(productId);
  }

  removeFromCart(productId?: number) {
    this.store.removeOneFromCart(productId);
  }
}
