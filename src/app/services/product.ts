import { computed, Injectable, signal, Signal } from '@angular/core';
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
    shareReplay({bufferSize:1, refCount:true})
    )

    this.productsSignal = toSignal(this.products$, { initialValue: [] });

    this.filteredProducts = computed(()=>{
      return this.productsSignal().filter(this.productsFilterFunc)
    })
  }
  
  private readonly url = '/api/products.json'
  private readonly products$: Observable<Product[]>;
  readonly productsSignal: Signal<Product[]>;
  private readonly filteredProducts: Signal<Product[]>;

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
    if(!!filter.category && filter.category.toLocaleLowerCase() !== 'all'){
      filterAccept = (product.category === filter.category)
    }
    if(!!filter.onlyInStock){
      filterAccept = product.inStock
    }
    return filterAccept;
  }

  private productsFilter = signal<GetProductFilter>({});

  setFilter(filter?: GetProductFilter){
    if(filter) this.productsFilter.set(filter)
  }

  getProductsSignal():Signal<Product[]>{
    return this.filteredProducts;
  }

  getProducts$():Observable<Product[]>{
    return this.products$;
  }
}
