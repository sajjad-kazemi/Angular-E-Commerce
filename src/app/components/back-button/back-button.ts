import { Component, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [MatAnchor, RouterLink, MatIcon, CommonModule],
  template: `
    <button
      matButton="text"
      [routerLink]="navigateTo() || '/'"
      class="flex items-center gap-1 mb-3"
    >
      <mat-icon> arrow_back </mat-icon>
      <span class="capitalize">
        <ng-content/>
      </span>
    </button>
  `,
  styles: `
    :host{
      display:block;
    }
  `,
})
export class BackButton {
  navigateTo = input<string>('');
}
