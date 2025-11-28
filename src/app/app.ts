import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, Header, Footer],
  template: `
    <app-header></app-header>
    <router-outlet/>
    <app-footer></app-footer>
  `,
  styles: [],
})
export class App {
  protected title = 'Modern-E-Commerce';
}
