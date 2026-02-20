import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que esto esté aquí
  imports: [RouterOutlet, CommonModule, FormsModule,RouterLink, RouterLinkActive], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-libreria');
}