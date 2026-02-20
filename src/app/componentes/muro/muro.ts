import { Component, OnInit } from '@angular/core';
import { ReseniaService } from '../../servicios/resenia-service';
import { Resenia } from '../../interfaces/resenia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-muro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muro.html',
  styleUrls: ['./muro.css']
})
export class MuroComponent implements OnInit {
  
  resenias: Resenia[] = [];

  constructor(private reseniaService: ReseniaService) { }

  ngOnInit(): void {
    // Llamamos al servicio al cargar el componente
    this.reseniaService.getMuro(1).subscribe({
      next: (data) => {
        this.resenias = data;
        console.log('Datos recibidos:', data);
      },
      error: (e) => console.error('Error al cargar el muro:', e)
    });
  }
}