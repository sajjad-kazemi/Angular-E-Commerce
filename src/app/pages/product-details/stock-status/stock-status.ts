import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../../models/product';
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
    @if(product().inStock){
    <div
      class="flex items-center gap-2 border border-green-200 rounded-lg px-3 py-3 bg-white w-full text-green-500"
    >
      <mat-icon class="small">check_circle</mat-icon>
      <span class="text-xs text-gray-800">In stock and ready to ship</span>
    </div>
    } @else {
    <div
      class="flex items-center gap-2 border border-red-200 rounded-lg px-3 py-3 bg-white w-full text-red-500"
    >
      <mat-icon class="small">warning</mat-icon>
      <span class="text-xs text-gray-800">
        This item is currently out of stock. Add it to your wishlist to be
        notified when it's available again.
      </span>
    </div>
    }
  `,
  styles: ``,
  host:{
    class:'block'
  }
})
export class StockStatus {
  store = inject(EcommerceStore);
  product = input.required<Product>();
}
