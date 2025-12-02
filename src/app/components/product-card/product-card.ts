import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, MatAnchor, MatIcon, MatIconButton, NgClass],
  template: `
    <div class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl hover:scale-101 transition-transform transition-shadow duration-200 ease-in-out select-none">
        <img src={{product()?.imageUrl}} class="w-full object-contain !color-red rounded-t-xl h-[250px]" />
        <button (click)="ToggleWishlist()" matIconButton [class]="isInWishlist() ? '' : ''" class="!absolute z-10 top-3 right-3 w-10 rounded-full !bg-white shadow-md flex item-center justify-center cursor-pointer transition-all duration-200 hover:bg-white-200 hover:shadow-lg">
          <mat-icon>favorite</mat-icon>
        </button>
        <div class="p-5 flex flex-col items-center">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">{{product()?.name}}</h3>
          <p class="text-sm text-gray-600">{{product()?.description}}</p>
          <br/>
          <!-- add rating component -->
          <div class="flex flex-row w-full justify-between mb-2">
          <div class="badge-container">
            <span class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20 hover:bg-gray-300 hover:text-gray-500">
              {{product()?.category}}
            </span>
          </div>
            <span>rating</span>
          </div>
          <div class="flex flex-row w-full justify-between">
            @if (!product()?.inStock){
              <div class="text-lg h-[45PX] flex">
                <span class="my-auto" >{{product()?.inStock ? '' : 'Out Of Stock'}}</span>
              </div>
            }
            @else {
              <div>
                <span class="text-2xl font-bold text-gray-900">\${{product()?.price | number:'2.2-4'}}</span>
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
  styles: ``,
})
export class ProductCard {
product = input<Product>();
store = inject(EcommerceStore)
// AddToCartClick = output();
AddToCartClick = () => console.log('cart')

isInWishlist = computed(() => {
  return (this.store.wishlistItemsIds().indexOf(this.product()?.id ?? -1) >= 0)
})

ToggleWishlist(){
  if(this.isInWishlist()){
    this.store.removeWishlistItem(this.product()?.id)
  }
  else{
    this.store.addWishlistItem(this.product()?.id)
  }
}
}
