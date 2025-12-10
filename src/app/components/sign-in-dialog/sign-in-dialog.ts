import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import {
  MatFormField,
  MatPrefix,
  MatSuffix,
  MatError,
  MatLabel,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

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
    MatError,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatAnchor,
  ],
  template: `
    <div class="p-8 max-w-[480px] flex flex-col rounded-lg shadow-md space-y-4">
      <div class="flex justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Sign In</h2>
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
      <form
        [formGroup]="signInForm"
        (ngSubmit)="signIn()"
        class="max-w-md mx-auto"
      >
        <mat-form-field MatFormField appearance="fill" class="w-full my-6">
          <mat-label>Email</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input
            matInput
            formControlName="email"
            type="email"
            aria-label="Email"
            placeholder="you@example.com"
          />
          @if(email.hasError('required') && email.touched){
          <mat-error> Email is required </mat-error>
          } @if(email.hasError('email') && email.touched){
          <mat-error> Please enter a valid email address </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Password</mat-label>
          <mat-icon matPrefix>lock</mat-icon>
          <input
            matInput
            [type]="passwordVisible() ? 'text' : 'password'"
            formControlName="password"
            aria-label="Password"
            placeholder="At least 8 characters"
          />
          <button
            mat-icon-button
            type="button"
            matSuffix
            (click)="togglePasswordVisible()"
            [attr.aria-pressed]="passwordVisible()"
            [attr.aria-label]="
              passwordVisible() ? 'Hide password' : 'Show password'
            "
          >
            <mat-icon>{{
              passwordVisible() ? 'visibility_off' : 'visibility'
            }}</mat-icon>
          </button>

          @if(password.hasError('required') && password.touched){
          <mat-error> Password is required </mat-error>
          } @if(password.hasError('minlength') && password.touched){
          <mat-error> Password must be at least 8 characters </mat-error>
          }
        </mat-form-field>

        <div class="w-full flex items-center justify-center">
          <button
            matButton="filled"
            color="primary"
            type="submit"
            class="px-auto py-2 w-full"
            [disabled]="signInForm.invalid"
          >
            Sign in
          </button>
        </div>
        <div class="text-sm hover:underline text-slate-600 mt-6">
          Already have account?
          <a class="underline">Log In</a>
        </div>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Don't have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()"
          >Sign Up</a
        >
      </p>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);
  fb = inject(NonNullableFormBuilder);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);

  passwordVisible = signal(false);
  togglePasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email() {
    return this.signInForm.controls.email;
  }
  get password() {
    return this.signInForm.controls.password;
  }

  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this.store.signIn({
      ...(<SignInParams>this.signInForm.value),
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id,
    });
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data.checkout,
      },
    });
  }
}
