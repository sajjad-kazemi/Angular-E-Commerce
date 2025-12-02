import { Injectable, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  toaster = inject(HotToastService)

  success(message:string = 'Success 🎉'){
    this.toaster.success(message);
  }

  error(message:string = 'There is some Error! 💥'){
    this.toaster.error(message);
  }
}
