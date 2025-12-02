import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { DecimalPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, MatAnchor, MatIcon],
  template: `
    <div class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl hover:scale-101 transition-transform transition-shadow duration-200 ease-in-out select-none">
        <img src={{product()?.imageUrl}} class="w-full object-contain rounded-t-xl h-[250px]" />
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

// AddToCartClick = output();
AddToCartClick = () => console.log('cart')
}
