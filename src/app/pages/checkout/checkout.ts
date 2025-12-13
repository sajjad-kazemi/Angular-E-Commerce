import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from './shipping-form/shipping-form';
import { PaymentForm } from './payment-form/payment-form';
import { SummerizeOrder } from '../../components/summerize-order/summerize-order';
import { EcommerceStore } from '../../ecommerce-store';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SummerizeOrder, MatAnchor],
  template: `
    <div class="mx-auto max-w-[1200px] py-3">
      <app-back-button class="mb-6" navigateTo="/my_cart"
        >Back to Cart</app-back-button
      >
      <h1 class="font-bold text-2xl">Checkout</h1>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 flex flex-col gap-6">
          <app-shipping-form></app-shipping-form>
          <app-payment-form></app-payment-form>
        </div>
        <div class="lg:col-span-2">
          <app-summerize-order>
            <ng-container checkoutItems>
              <div class="space-y-2 border-b pb-4">
                @for(item of store.getCartProducts();track item.id){
                  <div class="text-sm font-semibold flex justify-between">
                    <span>{{item.name}} x {{item.amountInCart}}</span>
                    <span>\${{((item.price || 0) * (item.amountInCart || 0)).toFixed(0)}}</span>
                  </div>
                }
              </div>
            </ng-container>
            <ng-container actionButtons>
              <button 
                matButton="filled"
                class="w-full mt-6 py-3"
                [disabled]="store.loading()"
                (click)="store.placeOrder()"
              >
              {{store.loading() ? 'Processing...' : 'Place Order'}}
              </button>
            </ng-container>
          </app-summerize-order>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Checkout {
  store = inject(EcommerceStore);
}
