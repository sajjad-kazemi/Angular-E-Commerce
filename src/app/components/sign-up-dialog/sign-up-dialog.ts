import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { passwordMatchValidator } from '../../validators/password-match-validator';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
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
          <h2 class="text-2xl font-semibold">Sign Up</h2>
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
        [formGroup]="signUpForm"
        (ngSubmit)="signUp()"
        class="max-w-md mx-auto mt-6"
      >
        <!-- Username Field -->
         <mat-form-field MatFormField appearance="fill" class="w-full">
          <mat-label>User Name</mat-label>
          <mat-icon matPrefix>person</mat-icon>
          <input 
            matInput
            formControlName="userName"
            type="text"
            placeholder="User Name"
          />
          @if(userName.hasError('required') && userName.touched){
            <mat-error>The User Name is required</mat-error>
          }
         </mat-form-field>

        <!-- Email Field -->
        <mat-form-field MatFormField appearance="fill" class="w-full">
          <mat-label>Email</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="you@example.com"
          />
          @if(email.hasError('required') && email.touched){
          <mat-error> Email is required </mat-error>
          } @if(email.hasError('email') && email.touched){
          <mat-error> Please enter a valid email address </mat-error>
          }
        </mat-form-field>

        <!-- Password Field -->
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Password</mat-label>
          <mat-icon matPrefix>lock</mat-icon>
          <input
            matInput
            [type]="passwordVisible() ? 'text' : 'password'"
            formControlName="password"
            placeholder="At least 8 characters"
          />
          <button
            mat-icon-button
            type="button"
            matSuffix
            (click)="togglePasswordVisible()"
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

        <!-- Confirm Password Field -->
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Confirm Password</mat-label>
          <mat-icon matPrefix>lock</mat-icon>
          <input
            matInput
            [type]="confirmPasswordVisible() ? 'text' : 'password'"
            formControlName="confirmPassword"
            placeholder="Repeat your Password"
          />
          <button
            mat-icon-button
            type="button"
            matSuffix
            (click)="toggleConfirmPasswordVisible()"
          >
            <mat-icon>{{
              confirmPasswordVisible() ? 'visibility_off' : 'visibility'
            }}</mat-icon>
          </button>

          @if(confirmPassword.hasError('passwordMismatch')){
          <mat-error> Confirm Password doesn't match the password </mat-error>
        }
        @if(confirmPassword.hasError('required')){
            <mat-error> Confirming Password is required </mat-error>
          }
        </mat-form-field>

        <div class="w-full flex items-center justify-center mt-3">
          <button
            matButton="filled"
            color="primary"
            type="submit"
            class="px-auto py-2 w-full"
            [disabled]="store.loading()"
          >
            {{ store.loading() ? 'Signing Up' : 'Sign Up' }}
          </button>
        </div>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()"
          >Sign In</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  
  signUpForm = this.fb.group(
    {
      userName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [passwordMatchValidator],
    }
  );

  passwordVisible = signal(false);
  togglePasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  confirmPasswordVisible = signal(false);
  toggleConfirmPasswordVisible() {
    this.confirmPasswordVisible.set(!this.confirmPasswordVisible());
  }

  get userName() {
    return this.signUpForm.controls.userName;
  }
  get email() {
    return this.signUpForm.controls.email;
  }
  get password() {
    return this.signUpForm.controls.password;
  }
  get confirmPassword() {
    return this.signUpForm.controls.confirmPassword;
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data.checkout,
      },
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      if(this.signUpForm.hasError('passwordMismatch')){
        this.signUpForm.controls.confirmPassword.setErrors({passwordMismatch:true})
      }
      this.signUpForm.markAllAsTouched()
      return;
    }
    // if(this.confirmPassword !== this.password){
    //   this.signUpForm.setErrors({passwordMismatch:true})
    // }
    this.store.signUp({...this.signUpForm.value,...this.data,dialogId:this.dialogRef.id} as SignUpParams);
  }
}