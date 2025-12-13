import { Component, computed, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../ecommerce-store';
import { MatBadge } from '@angular/material/badge'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from "@angular/material/divider";
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatIconButton, MatButton, MatIcon, MatTooltipModule, RouterLink, MatBadge, MatMenuItem, MatMenuTrigger, MatMenu, MatDivider],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton matTooltip="Cart" routerLink="/my_cart" [matBadgeHidden]="cartLength() === 0" [matBadge]="cartLength()"><mat-icon>shopping_cart</mat-icon></button>
      <button matIconButton [matBadgeHidden]="wishlistLength() === 0" [matBadge]="wishlistLength()" matTooltip="Wish List" routerLink="/my_wishlist"><mat-icon>favorite</mat-icon></button>
      @if(store.user(); as user) {
        <button matIconButton matTooltip="Profile" [matMenuTriggerFor]="userMenu">
          <img [src]="user.imageUrl || 'assets/user.png'" [alt]="user.name + 'Profile Picture'" class="w-8 h-8 rounded-full" />
        </button>

        <mat-menu #userMenu xPosition="before">
          <div class="flex flex-col px-3 min-w-[200px]">
            <span class="text-sm font-semibold">{{user.name}}</span>
            <span class="text-xs text-gray-500">{{user.email}}</span>
          </div>
          <mat-divider></mat-divider>
          <button 
          class="!min-h-[32px] w-full flex items-center gap-2 p-3"
          mat-menu-item
          (click)="store.signOut()">
          <mat-icon>logout</mat-icon>
          Log Out
          </button>
        </mat-menu>
      } 
      @else {
        <button matButton (click)="openSignInDialog()">Sign in</button>
        <button matButton="filled" (click)="openSignUpDialog()">Sign up</button>
      }
      <!-- <button matIconButton ><mat-icon>person</mat-icon></button> -->
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);
  wishlistLength = this.store.wishlistLength;
  cartLength = this.store.cartLength;
  openSignInDialog(){
    this.matDialog.open(SignInDialog,
      {
        disableClose:true,
        data:{
          checkout:false
        }
      }
    );
  }
  openSignUpDialog(){
    this.matDialog.open(SignUpDialog,
      {
        disableClose:true,
        data:{
          checkout:false
        }
      }
    );
  }
}