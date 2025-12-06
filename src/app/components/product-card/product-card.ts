import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { Product } from '../../models/product';
import { DecimalPipe } from '@angular/common';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { MatChipsModule } from '@angular/material/chips'
import { RouterLink } from "@angular/router";
import { ToggleWishlistButton } from "../toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, MatAnchor, MatIcon, MatChipsModule, RouterLink, ToggleWishlistButton],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl overflow-hidden flex flex-col h-full hover:shadow-xl hover:scale-101 transition-transform transition-shadow duration-200 ease-in-out select-none"
    >
      <img
        src="{{ product()?.imageUrl }}"
        class="w-full object-contain !color-red rounded-t-xl h-[250px]"
      />
      <app-toggle-wishlist-button [productId]="product()?.id" [isDeleteButton]="wishlistDeleteButton()"/>
      <div class="p-5 flex flex-col items-center">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product()?.name }}
        </h3>
        <p class="text-sm text-gray-600">{{ product()?.description }}</p>
        <br />
        <!-- add rating component -->
        <div class="flex flex-row w-full justify-between mb-2">
          <div class="badge-container">
            <mat-chip>
              {{product()?.category}}
            </mat-chip>
          </div>
          <span>rating</span>
        </div>
        <div class="flex flex-row w-full justify-between">
          @if (!product()?.inStock){
          <div class="text-lg h-[45PX] flex">
            <span class="my-auto">{{
              product()?.inStock ? '' : 'Out Of Stock'
            }}</span>
          </div>
          } @else {
          <div>
            <span class="text-2xl font-bold text-gray-900"
              >\${{ product()?.price | number : '2.2-4' }}</span
            >
          </div>
          <div>
            <button matButton="filled" (click)="AddToCartClick()">
              <mat-icon>add</mat-icon>
              Add To Cart
            </button>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .red-heart{
      color:red !important;
    }
  `,
})
export class ProductCard {
  product = input<Product>();
  store = inject(EcommerceStore);
  wishlistDeleteButton = input<boolean>(false);
  
  // AddToCartClick = output();
  AddToCartClick = () => console.log('cart');
}
