import { computed, inject, Inject } from "@angular/core";
import { GetProductFilter, Product } from "./models/product"
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals'
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";


export type EcommerceState = {
    products: Product[];
    productsFilter: GetProductFilter;
}

export const EcommerceStore = signalStore(
    {providedIn: 'root'},
    withState({
        products:[] as Product[]
    }),
    withProps(() => ({
        http:inject(HttpClient),
    })),
    withMethods((store) =>({
       setProducts:(items:Product[]) =>{
        patchState(store,{products:items})
        let x = store.products()
       },
       addProduct:(item:Product) =>{
        if(item){
            let newProducts = store.products()
            newProducts.push(item)
            patchState(store,{products:newProducts})
        }
       },
       getProducts:(filter:GetProductFilter) =>{
            return computed(() => {
                let products = store.products()
                    .filter((product) =>{
                        let filterAccept:boolean = true;
                        if(!!filter.id && filterAccept){
                        filterAccept = (product.id === filter.id)
                        }
                        if(!!filter.name && filterAccept){
                        filterAccept = (product.name.toLocaleLowerCase().indexOf(filter.name.toLocaleLowerCase())) > -1
                        }
                        if(!!filter.category && filter.category.toLocaleLowerCase() !== 'all' && filterAccept){
                        filterAccept = (product.category === filter.category)
                        }
                        if(!!filter.onlyInStock && filterAccept){
                        filterAccept = product.inStock
                        }
                        return filterAccept;
                    })
                return products;
            })
       },
        getAllProducts:() =>{
            return store.products();
        }
    })),
    withComputed(store => ({
        filteredProducts: computed(() =>{
            
        })
    })),
    withHooks({
        async onInit(store){
            try {
                const products = await firstValueFrom(store.http.get<Product[]>('/api/products.json'));
                store.setProducts(products)
            } 
            catch(err:any){
                console.error('Failed to fetch data from products.json\n',err)
            }
        }
    }),
)