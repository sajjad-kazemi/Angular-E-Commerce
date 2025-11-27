import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <router-outlet/>
  `,
  styles: [],
})
export class App {
  protected title = 'Modern-E-Commerce';
}
