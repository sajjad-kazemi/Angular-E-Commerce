import { Routes } from '@angular/router';

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
      path:'checkout',
      loadComponent: () => import('./pages/checkout/checkout')
    },
    {
      path:'order-success',
      loadComponent: () => import('./pages/order-success/order-success')
    }
];
