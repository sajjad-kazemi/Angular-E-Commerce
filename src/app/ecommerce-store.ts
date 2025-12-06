import { computed, inject } from '@angular/core';
import { GetProductFilter, Product } from './models/product';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Toaster } from './services/toaster';
import { cartItem } from './models/cart';

export type EcommerceState = {
  products: Product[];
  wishlistItems: Product[];
  cartItems: cartItem[];
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [] as Product[],
    wishlistItems: [] as Number[],
    cartItems: [] as cartItem[],
  }),
  withProps(() => ({
    http: inject(HttpClient),
    toaster: inject(Toaster),
  })),
  withMethods((store) => ({
    addProduct: (item: Product) => {
      if (item) {
        let newProducts = store.products();
        newProducts.push(item);
        patchState(store, { products: newProducts });
      }
    },
    getProducts: (filter: GetProductFilter) => {
      return computed(() => {
        let products = store.products().filter((product) => {
          let filterAccept: boolean = true;
          if (!!filter.id && filterAccept) {
            filterAccept = product.id === filter.id;
          }
          if (!!filter.name && filterAccept) {
            filterAccept =
              product.name
                .toLocaleLowerCase()
                .indexOf(filter.name.toLocaleLowerCase()) > -1;
          }
          if (
            !!filter.category &&
            filter.category.toLocaleLowerCase() !== 'all' &&
            filterAccept
          ) {
            filterAccept = product.category === filter.category;
          }
          if (!!filter.onlyInStock && filterAccept) {
            filterAccept = product.inStock;
          }
          return filterAccept;
        });
        return products;
      });
    },
    getAllProducts: () => {
      return store.products();
    },
    wishlistItemsIds: () => {
      return store.wishlistItems();
    },
    addWishlistItem: (productId?: number) => {
      if (!productId) return;
      const findProduct = store
        .products()
        .find((item) => item.id === productId);
      if (!findProduct) return;
      const newWishlistItems = [...store.wishlistItems(), findProduct.id];
      patchState(store, { wishlistItems: newWishlistItems });
      store.toaster.success('Product added to wishlist');
    },
    removeWishlistItem: (productId?: number) => {
      if (productId == null) {
        store.toaster.error('Invalid product id');
        return;
      }
      const current = store.wishlistItems();
      const newWishlistItems = current.filter((id) => id !== productId);
      if (newWishlistItems.length === current.length) {
        store.toaster.error('Product not in wishlist');
        return;
      }
      patchState(store, { wishlistItems: newWishlistItems });
      store.toaster.success('Removed from wishlist');
    },
    isInWishlist: (productId?: number): boolean => {
      if (productId == null) return false;
      return store.wishlistItems().includes(productId);
    },
    getCartProducts: (): Product[] => {
      let items = store.cartItems();
      // let cartProducts = store.products().map(product =>{
      let cartProducts: Product[] = [];
      store.products().forEach((product) => {
        let findCartItem = items.find((x) => x.productId === product.id);
        if (findCartItem) {
          cartProducts.push({
            ...product,
            amountInCart: findCartItem.quantity,
          });
        }
      });
      return cartProducts;
    },
    addToCart: (productId?: number): void => {
      if (productId == null) {
        store.toaster.error();
        return;
      }

      let findCartItem = store
        .cartItems()
        .find((item) => item.productId === productId);

      if (!findCartItem) {
        const findProduct = store
          .products()
          .find((item) => item.id === productId);

        if (!findProduct?.id) {
          store.toaster.error();
          return;
        }
        findCartItem = { productId: findProduct.id, quantity: 1 } as cartItem;
      } else {
        findCartItem.quantity++;
      }
      const newCartItems = store
        .cartItems()
        .filter((item) => item.productId !== productId);
      newCartItems.push(findCartItem);

      patchState(store, { cartItems: newCartItems });
      store.toaster.success('Product added to cart');
    },
    removeFromCart: (productId?: number): void => {
      if (productId == null) {
        store.toaster.error();
        return;
      }

      let findCartItem = store
        .cartItems()
        .find((item) => item.productId === productId);

      if (!findCartItem) {
        store.toaster.error();
        return;
      } else {
        findCartItem.quantity--;
      }
      const newCartItems = store
        .cartItems()
        .filter((item) => item.productId !== productId);
      if (findCartItem.quantity > 0) {
        newCartItems.push(findCartItem);
      }
      patchState(store, { cartItems: newCartItems });
      store.toaster.success('Product removed to cart');
    },
  })),
  withComputed((store) => ({
    getWishlistItems: () => {
      let wishlist = store.wishlistItems();
      let wishlistProducts = store.products();
      wishlistProducts = wishlistProducts.filter((item) =>
        wishlist.includes(item.id)
      );
      return wishlistProducts;
    },
    wishlistLength: () => {
      return store.wishlistItems().length;
    },
    cartLength: () => {
      return store.cartItems().length;
    },
  })),
  withHooks({
    async onInit(store) {
      try {
        const products = await firstValueFrom(
          store.http.get<Product[]>('/api/products.json')
        );
        // store.setProducts(products)
        patchState(store, { products: products });
      } catch (err: any) {
        console.error('Failed to fetch data from products.json\n', err);
      }
    },
  })
);
