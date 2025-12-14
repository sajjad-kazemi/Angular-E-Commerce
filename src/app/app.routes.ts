import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path:'',
        pathMatch: 'full',
        redirectTo: 'products/all'
    },
    {
        path:'products',
        pathMatch: 'full',
        redirectTo: 'products/all',
    },
    {
        path:'products/:category',
        loadComponent: () => import('./pages/products-grid/products-grid')
    },
    {
        path:'my_wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist')
    },
    {
        path:'my_cart',
        loadComponent: () => import('./pages/my-cart/my-cart')
    },
    {
        path:'product/:productId',
        loadComponent: () => import('./pages/product-details/product-details')
    },
    {
      path:'checkout',
      loadComponent: () => import('./pages/checkout/checkout'),
      canActivate: [authGuard]
    },
    {
      path:'order_success',
      loadComponent: () => import('./pages/order-success/order-success')
    }
];
