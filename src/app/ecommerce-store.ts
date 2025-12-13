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
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit'

export type EcommerceState = {
  products: Product[];
  wishlistItems: number[];
  cartItems: cartItem[];
  user: User | null;
  loading: boolean;
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withStorageSync({
    key:'ecommerce-store',
    select:(state:EcommerceState) => ({wishlistItems:state.wishlistItems,cartItems:state.cartItems,user:state.user})
  }),
  withState({
    products: [] as Product[],
    wishlistItems: [] as number[],
    cartItems: [{ productId: 101, quantity: 2 }] as cartItem[],
    user: { name: 'john doe', email: 'example@email.com', id: 1 },
    loading: false,
  } as EcommerceState),
  withProps(() => ({
    http: inject(HttpClient),
    toaster: inject(Toaster),
    matDialog: inject(MatDialog),
    router: inject(Router),
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
    getAllProducts: (): Product[] => {
      return store.products();
    },
    wishlistItemsIds: (): number[] => {
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
    addToCart: (productId?: number) => {
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
    removeOneFromCart: (productId?: number) => {
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
    deleteFromCart: (productId?: number) => {
      if (!productId) {
        store.toaster.error();
        return;
      }
      let newCartItems = store
        .cartItems()
        .filter((item) => item.productId !== productId);

      patchState(store, { cartItems: newCartItems });
    },
    allWishlistToCart: () => {
      let wishlistItems = store.wishlistItems();
      let CartItemIds = store.cartItems().map((item) => item.productId);
      let newCartItems = [...store.cartItems()];
      for (let id of wishlistItems) {
        let product = store.products().find((item) => item.id == id);
        if (!CartItemIds.includes(id) && product?.inStock) {
          newCartItems.push({ productId: id, quantity: 1 } as cartItem);
        }
      }
      patchState(store, { cartItems: newCartItems });
    },
    proceedToCheckout: () => {
      store.matDialog.open(SignInDialog, {
        disableClose: true,
        data: {
          checkout: true,
        },
      });
      // patchState(store,{cartItems:[]})
      // store.toaster.success('The Checkout process is done.\n Your order is on the way')
    },
    signIn: (params: SignInParams) => {
      patchState(store, {
        user: {
          id: 1,
          name: 'John',
          email: params.email,
          imageUrl: 'assets/user.png',
        },
      });
      if (params.dialogId) {
        store.matDialog.getDialogById(params.dialogId)?.close();
      }
      if (params.checkout) {
        store.router.navigate(['/checkout']);
      }
    },
    signUp: (params: SignUpParams) => {
      patchState(store, {
        user: {
          id: 1,
          name: params.name,
          email: params.email,
          imageUrl: 'assets/user.png',
        },
      });
      store.matDialog.getDialogById(params.dialogId)?.close();
      if (params.checkout) {
        store.router.navigate(['/checkout']);
      }
    },
    signOut: () => {
      patchState(store, { user: null });
      return;
    },
    placeOrder: async () => {
      if(!store.user()){
        store.toaster.error('Please Sign In first')
        return;
      }
      patchState(store, { loading: true });
      const cartItems = store.cartItems().map((item) => {
        let prodeuct = store.products().find((x) => x.id == item.productId);
        return {
          id: item.productId,
          price: prodeuct?.price,
          quantity: item.quantity,
        };
      });
      const order: Order = {
        id: crypto.randomUUID(),
        userId: store.user()?.id || 0,
        total: +cartItems
          .reduce(
            (acc, item) => acc + item.quantity || 0 * (item.price || 0),
            0
          )
          .toFixed(2),
        items: store.cartItems(),
        paymentStatus: 'success',
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      patchState(store, { loading: false, cartItems: [] });
      store.router.navigate(['/order_success']);
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
    isUserLoggedIn: (): boolean => {
      return !!store.user;
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
