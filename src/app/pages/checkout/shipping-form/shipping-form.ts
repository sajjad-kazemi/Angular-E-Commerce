import { Component } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatFormField, MatInput, MatLabel],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-cetner gap-2">
        <mat-icon class="my-auto">local_shipping</mat-icon>
        Shipping Information
      </h2>
      <form class="grid grid-cols-4">
        <mat-form-field appearance="outline" class="col-span-2">
          <mat-label>First Name</mat-label>
          <input matInput type="text" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-2">
          <mat-label>Last Name</mat-label>
          <input matInput type="text" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-4">
          <mat-label>Address</mat-label>
          <textarea matInput></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-2">
          <mat-label>City</mat-label>
          <input matInput type="text" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-2">
          <mat-label>State</mat-label>
          <input matInput type="text" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-4">
          <mat-label>Zip</mat-label>
          <input matInput type="text" />
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {}
