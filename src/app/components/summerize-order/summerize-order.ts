import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summerize-order',
  imports: [ViewPanel,CommonModule],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Order Summary</h2>

        <ng-content select="[checkoutItems]"></ng-content>

      <div class="space-y-3 text-lg pt-4 border-t">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>\$ {{ subTotal() | number:'1.2'}}</span>
        </div>
        <div class="flex justify-between">
          <span>Tax</span>
          <span>\$ {{ tax() | number:'1.2'}}</span>
        </div>
        <hr/>
        <div class="flex justify-between">
          <span>Total</span>
          <span>\$ {{ total() | number:'1.2'}}</span>
        </div>
        <ng-content select="[actionButtons]"></ng-content>
      </div>
    </div>
  `,
  styles: ``,
})
export class SummerizeOrder {
  store = inject(EcommerceStore);
  subTotal = computed<number>((): number => {
    let totalprice = 0;
    this.store.getCartProducts().forEach((item) => {
      if (item.amountInCart && item.price) {
        totalprice += item.price * item?.amountInCart;
      }
    });
    return totalprice;
  });
  tax = computed(() => {
    if (this.subTotal()) {
      return 0.05 * this.subTotal();
    }
    return 0;
  });
  total = computed(() => this.subTotal() - this.tax());
}
