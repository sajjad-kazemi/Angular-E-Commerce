import { Component, input } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [MatAnchor, RouterLink, MatIcon, CommonModule],
  template: `
    <button matButton="text" [routerLink]="navigateTo() ?? null" class="flex items-center gap-1">
      <mat-icon>
        arrow_back
      </mat-icon>
      {{label() | titlecase}}
    </button>
  `,
  styles: `
    :host{
      display:block;
    }
  `,
})
export class BackButton {
  label = input('')
  navigateTo = input<string>('')
}
