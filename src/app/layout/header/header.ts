import { Component, computed, inject } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar'
import { HeaderActions } from "../header-actions/header-actions";
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, MatIconButton,MatIcon, RouterLink],
  template: `
    <mat-toolbar class="w-full shadow-sm py-2">
      <div class="max-w-[1300px] mx-auto w-full flex items-center justify-between">
        <span class="flex items-center font-bold">
          <button matIconButton="elevated" routerLink="/">
            <mat-icon>home</mat-icon>
          </button>
          <span routerLink="/" class="my-auto cursor-pointer">E-Commerce Store</span>
        </span>
        <app-header-actions></app-header-actions>
    </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
}
