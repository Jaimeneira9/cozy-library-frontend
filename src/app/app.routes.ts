import { Routes } from '@angular/router';
import { MuroComponent } from './componentes/muro/muro'; // Ajusta la ruta a tu archivo real
import { BuscadorComponent } from './componentes/buscador/buscador';

export const routes: Routes = [
  { path: '', component: MuroComponent },           // Página de inicio (Muro)
  { path: 'buscar', component: BuscadorComponent }, // Página de búsqueda
  { path: '**', redirectTo: '' }           // Por si acaso, vuelve al inicio
];