import { Injectable, signal, Signal } from '@angular/core';
import { catchError, filter, map, Observable, of, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'
import { GetProductFilter, Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private readonly http:HttpClient) {
    this.products$ = this.http.get<Product[]>(this.url).pipe(
    map(data => data.filter(this.productsFilterFunc)),
    catchError(err =>{
      console.error('Failed to load products.json', err);
      return of([]);
    }),
    shareReplay({bufferSize:1, refCount:true}),
  )

    this.productsSignal = toSignal(this.products$, { initialValue: [] });
  }
  
  private readonly url = '/api/products.json'
  
  private readonly products$: Observable<Product[]>;

  readonly productsSignal: Signal<Product[]>;

  private productsFilterFunc = (product:Product):boolean => {
    let filter = this.productsFilter();
    if(!filter){
      return true;
    }
    let filterAccept:boolean = true;
    if(!!filter.id){
      filterAccept = (product.id === filter.id)
    }
    if(!!filter.name){
      filterAccept = (product.name.toLocaleLowerCase().indexOf(filter.name.toLocaleLowerCase())) > -1
    }
    if(!!filter.category){
      filterAccept = (product.category === filter.category)
    }
    return filterAccept;
  }

  private productsFilter = signal<GetProductFilter>({});

  getProductsSignal(filter?:GetProductFilter):Signal<Product[]>{
    if(filter){
      this.productsFilter.set(filter);
    }
    return toSignal(this.products$,{initialValue:[]});
  }

  getProducts():Observable<Product[]>{
    return this.products$;
  }
}
