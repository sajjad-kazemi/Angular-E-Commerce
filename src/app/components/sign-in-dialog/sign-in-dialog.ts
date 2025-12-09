import { Component, inject, signal } from '@angular/core';
import { MatIconButton } from '../../../../node_modules/@angular/material/button/index';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import {
  NonNullableFormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import {
  MatFormField,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatSuffix,
    MatPrefix,
    ɵInternalFormsSharedModule,
  ],
  template: `
    <div class="p-8 max-w-[480px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
        </div>
        <button
          tabindex="-1"
          matIconButton
          class="-mt-2 -mr-2"
          mat-dialog-close
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form>
        <mat-form-field class="w-full mb-4">
          <mat-icon matPrefix>email</mat-icon>
          <input
            matInput
            class="mr-2"
            formControlName="email"
            type="email"
            placeholder="Email"
          />
        </mat-form-field>
        <mat-form-field class="w-full mb-6">
          <mat-icon matPrefix>lock</mat-icon>
          <input
            matInput
            class="mr-2"
            formControlName="password"
            placeholder="Password"
            [type]="passwordVisible() ? 'text' : 'password'"
          />
          <button
            matSuffix
            matIconButton
            class="mr=2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon
              [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"
            ></mat-icon>
          </button>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);

  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
}
