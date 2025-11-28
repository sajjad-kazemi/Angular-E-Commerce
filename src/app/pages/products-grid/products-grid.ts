import { Component, input, OnInit, Signal, signal } from '@angular/core';
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
  category = input<string>('');

  products:Signal<Product[]>;
  productsFilter = signal<GetProductFilter>({});

  constructor(private productService: ProductService) {
    this.products = this.productService.getProductsSignal(this.productsFilter());
  }
  
  ngOnInit(): void {
    this.productsFilter.update(filter => ({...filter, category:this.category()}) )
  }
}