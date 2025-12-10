import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [],
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
        [formGroup]="signUpForm"
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
            [disabled]="signUpForm.invalid"
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
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder)
  signUpForm = this.fb.group({
    
  }) 
}
