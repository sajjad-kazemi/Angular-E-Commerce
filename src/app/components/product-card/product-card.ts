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

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, MatAnchor, MatIcon, MatIconButton, MatChipsModule, RouterLink],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl hover:scale-101 transition-transform transition-shadow duration-200 ease-in-out select-none"
    >
      <img
        src="{{ product()?.imageUrl }}"
        class="w-full object-contain !color-red rounded-t-xl h-[250px]"
      />
      <button
        (click)="ToggleWishlist(IsInWishlist())"
        matIconButton
        [class]="IsInWishlist() ? '!text-red-500' : '!text-gray-500'"
        class="!absolute z-10 top-3 right-3 w-10 rounded-full !bg-white shadow-md flex item-center justify-center cursor-pointer hover:bg-white-200 hover:shadow-lg"
      >
        <mat-icon>{{IsInWishlist() ? 'favorite' : 'favorite_border'}}</mat-icon>
      </button>
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
  IsInWishlist = computed(() => this.store.isInWishlist(this.product()?.id));
  
  // AddToCartClick = output();
  AddToCartClick = () => console.log('cart');

  ToggleWishlist(isInWishlist: boolean) {
    if (isInWishlist) {
      this.store.removeWishlistItem(this.product()?.id);
    } else {
      this.store.addWishlistItem(this.product()?.id);
    }
  }
}
