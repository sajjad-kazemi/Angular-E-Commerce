import { Component, computed, input, output } from '@angular/core';
import { Product } from '../../../models/product';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-cart-item-card',
  imports: [MatIconButton, MatIcon, ToggleWishlistButton],
  template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
      <div class="flex items-center gap-4">
        <img
          [src]="item()?.imageUrl"
          class="w-24 h-24 rounded-lg object-cover"
        />
        <div>
          <div class="text-gray-900 text-lg font-semibold">
            {{ item()?.name }}
          </div>
          <div class="text-gray-500 text-lg">\${{ item()?.price }}</div>
        </div>
      </div>

      <div class="flex jusitfy-between align-center">
        <button
        class="my-auto"
        matIconButton
        [disabled]="item()?.amountInCart === 1"
        (click)="RemoveOneFromCart.emit(item()?.id)"
        >
        <mat-icon>remove</mat-icon>
      </button>
        <div class="my-auto">
          {{ item()?.amountInCart || 0 }}
        </div>
      <button
        class="my-auto"
        matIconButton
        (click)="AddToCart.emit(item()?.id)"
      >
        <mat-icon>add</mat-icon>
      </button>
      </div>

      <div class="flex flex-col items-end">
        <div class="text-xl font-bold">\${{ total() }}</div>
        <div>
          <app-toggle-wishlist-button
            [productId]="item()?.id"
          />
          <button matIconButton (click)="DeleteFromCart.emit(item()?.id)">
            <mat-icon class="!text-red-500">delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CartItemCard {
  item = input<Product>();
  total = computed(() =>
    ((this.item()?.price || 0) * (this.item()?.amountInCart || 0)).toFixed(2)
  );
  AddToCart = output<number | undefined>();
  RemoveOneFromCart = output<number | undefined>();
  DeleteFromCart = output<number|undefined>();
}
