import { Component, computed, input, OnInit, Signal, signal } from '@angular/core';
import { GetProductFilter, Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [CommonModule],
  template: `
    @for (item of products(); track $index) {
      <div>{{item.name}} {{item.category}}</div>
    }
  `,
  styles: ``,
})
export default class ProductsGrid implements OnInit {
  category = input<string>('all');

  productsFilterSignal = signal<GetProductFilter>({});
  productsFilter = computed<GetProductFilter>(()=>({
    ...this.productsFilterSignal(),
    category:this.category()
  }));
  products:Signal<Product[]>;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProductsSignal();
  }
  
  ngOnInit(): void {
    this.productService.setFilter(this.productsFilter());
  }
}