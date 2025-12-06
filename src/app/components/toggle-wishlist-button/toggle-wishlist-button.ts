import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon,MatIconButton],
  template: `
    <button
      (click)="ToggleWishlist(IsInWishlist())"
      matIconButton
      [class]="
        IsInWishlist() ? colorTrue() : colorFalse()
      "
      class="!absolute z-10 top-3 right-3 w-10 rounded-full !bg-white shadow-md flex item-center justify-center cursor-pointer hover:bg-white-200 hover:shadow-lg"
    >
      <mat-icon>{{
        IsInWishlist() ? iconNameTrue() : iconNameFalse()
      }}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {
  store = inject(EcommerceStore);
  productId = input<number>();

  isDeleteButton = input<boolean>(false);

  iconNameTrue = computed(() => {
    return this.isDeleteButton() ? 'delete' : 'favorite';
  });
  iconNameFalse = computed(() => {
    return this.isDeleteButton() ? '' : 'favorite_border';
  });

  colorTrue = computed(() => {
    return this.isDeleteButton() ? '!text-gray-800' : '!text-red-500';
  });
  colorFalse = computed(() => {
    return this.isDeleteButton() ?  '!text-gray-500' : '!text-gray-500'
  });

  IsInWishlist = computed(() => this.store.isInWishlist(this.productId()));

  ToggleWishlist(isInWishlist: boolean) {
    if (isInWishlist) {
      this.store.removeWishlistItem(this.productId());
    } else {
      this.store.addWishlistItem(this.productId());
    }
  }
}
