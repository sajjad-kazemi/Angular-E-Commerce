import { Component, computed, effect, input, OnInit, Signal, signal } from '@angular/core';
import { Categories, GetProductFilter, Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../../components/product-card/product-card";
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatListModule} from "@angular/material/list"
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-products-grid',
  imports: [CommonModule, ProductCard, MatSidenavModule, MatListModule, RouterLink],
  template: `
  <mat-sidenav-container>
      <mat-sidenav opened="true" mode="side" class="max-w-[15%]">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list class="">
            @for(cat of categories(); track cat){
                <mat-list-item [activated]="cat === category()" [routerLink]="['/products',cat]">
                  <span matListItemTitle>
                    {{cat | titlecase}}
                  </span>
                </mat-list-item>  
              }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <div>
          <h2 class="text-2xl font-bold">{{category() | uppercase}}</h2>
          <p>{{products().length}} items found</p>
        </div>
        <div class="responsive-grid mt-5">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `

  `
})
export default class ProductsGrid implements OnInit {
  category = input<string>('all');
  categories = signal<string[]>(Categories)
  products:Signal<Product[]>;
  productsFilterSignal = signal<GetProductFilter>({});
  
  productsFilter = computed<GetProductFilter>(()=>({
    ...this.productsFilterSignal(),
    category:this.category()
  }));

  constructor(private productService: ProductService) {
    effect(()=>{
      this.updateFilter();
    })
    this.products = this.productService.getProductsSignal();
  }
  
  ngOnInit(): void {
    this.updateFilter();
  }
  
  updateFilter(){
    this.productService.setFilter({...this.productsFilter(),category:this.category()});
  }
  
}