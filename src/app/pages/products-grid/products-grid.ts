import { Component, computed, effect, inject, input, OnInit, Signal, signal } from '@angular/core';
import { Categories, GetProductFilter, Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import {MatListModule} from "@angular/material/list"
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [CommonModule, ProductCard, MatSidenavModule, MatListModule, RouterLink, MatSlideToggleModule],
  templateUrl: 'products-grid.html',
  styles: ``
})
export default class ProductsGrid {
  store = inject(EcommerceStore);
  category = input<string>('all');
  categories = signal<string[]>(Categories)
  productsFilterSignal = signal<GetProductFilter>({});
  productsFilter = computed<GetProductFilter>(()=>({
    category:this.category(),
    onlyInStock:this.onlyInStock()
  }));
  onlyInStock = signal<boolean>(false);
  products:Signal<Product[]>;
  
  constructor() {
    this.products = this.store.getProducts(this.productsFilter())
    effect(()=>{
      this.products = this.store.getProducts(this.productsFilter())
    })
  }
}