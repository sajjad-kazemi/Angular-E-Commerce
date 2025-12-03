import { Component, computed, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../ecommerce-store';
import { MatBadge } from '@angular/material/badge'

@Component({
  selector: 'app-header-actions',
  imports: [MatIconButton, MatButton, MatIcon, MatTooltipModule, RouterLink, MatBadge],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton matTooltip="Cart" routerLink="/cart"><mat-icon>shopping_cart</mat-icon></button>
      <button matIconButton [matBadgeHidden]="WishlistLength() === 0" [matBadge]="WishlistLength()" matTooltip="Wish List" routerLink="/my_wishlist"><mat-icon>favorite</mat-icon></button>
      <button matButton>Sign in</button>
      <button matButton="filled">Sign up</button>
      <button matIconButton matTooltip="Profile"><mat-icon>person</mat-icon></button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  WishlistLength = this.store.wishlistLength;
}
