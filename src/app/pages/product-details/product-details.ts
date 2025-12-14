import { Component, inject, input, OnInit } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { ProductInfo } from "./product-info/product-info";

@Component({
  selector: 'app-product-details',
  imports: [BackButton, ProductInfo],
  template: ` 
    <div class="mx-auto max-w-[1200px] py-3">
      <app-back-button [navigateTo]="previousUrl">back</app-back-button>
      @if(store.selectedProduct(); as product){
        <div class="flex gap-8">
          <img [src]="product.imageUrl" class="w-[500px] h-[350px] object-contain rounded-lg" />
          <div class="flex-1">
            <app-product-info [product]="product"></app-product-info>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export default class ProductDetails implements OnInit{
  productId = input.required<string>();

  store = inject(EcommerceStore);
  previousUrl:string = '';
  constructor(){
    this.store.setSelectedProductId(this.productId);
  }

  ngOnInit(): void {
    this.previousUrl = history.state.from
  }
}
