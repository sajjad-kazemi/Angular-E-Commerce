import { Component } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio'

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanel, MatIcon, MatRadioGroup, MatRadioButton],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>payment</mat-icon>
        Payment Options
      </h2>
      <div>
        <mat-radio-group [value]="'stripe'" class="flex gap-6">
          <mat-radio-button value="stripe">
            <img src="assets/PayPal.svg" alt="Paypal logo" class="h-[clamp(16px,1.5rem,50px)]">
          </mat-radio-button>
          <mat-radio-button>
            <img src="assets/Stripe.png" alt="Stripe logo" class="h-[clamp(16px,1.5rem,50px)]">
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: ``,
})
export class PaymentForm {

}
