import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-my-cart',
  imports: [ProductCard],
  template: `
    <div class="responsive-grid">
      @for (product of cartItems; track product.id){
        {{product.name+' '+product.amountInCart+'\n'}}
        <br>
      }
    </div>
  `,
  styles: ``,
})
export default class MyCart {
  store = inject(EcommerceStore)
  cartItems = this.store.getCartProducts()
}
