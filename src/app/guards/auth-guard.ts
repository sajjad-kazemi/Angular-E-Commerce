import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EcommerceStore } from '../ecommerce-store';
import { SignInDialog } from '../components/sign-in-dialog/sign-in-dialog';
import { MatDialog } from '@angular/material/dialog';

export const authGuard: CanActivateFn = () => {
  const store = inject(EcommerceStore);
  const matDialog = inject(MatDialog);
  const router = inject(Router);
  if(store.user()){
    return true;
  }
  else{
    matDialog.open(SignInDialog,{
      disableClose:true
    })
    return router.createUrlTree(['/'])
  }
};
