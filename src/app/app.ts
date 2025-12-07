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
    <app-header class="z-10"></app-header>
    <main class="p-5 min-h-[100vh]">
        <router-outlet/>
    </main>
    <app-footer></app-footer>
  `,
  styles: [],
})
export class App {
  protected title = 'Modern-E-Commerce';
}
