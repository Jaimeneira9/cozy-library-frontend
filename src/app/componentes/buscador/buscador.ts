import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../servicios/libro-service';
import { ReseniaService } from '../../servicios/resenia-service';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule], // Necesarios para el *ngFor y el input
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class BuscadorComponent {
  terminoBusqueda: string = '';
  cargando: boolean = false;
  
  // 🟢 LA CLAVE: Debe tener el "= signal<any[]>([])"
  resultados = signal<any[]>([]); 
  // En la clase BuscadorComponent
  libroParaReseniar = signal<any | null>(null);

  constructor(private libroService: LibroService, private reseniaService: ReseniaService) {}
  seleccionarLibro(libro: any) {
    console.log("¡Botón pulsado para el libro!", libro.titulo);
  this.libroParaReseniar.set(libro);
  // Aquí podríamos hacer scroll hacia el formulario o abrir un modal
  }
  ejecutarBusqueda() {
    if (!this.terminoBusqueda.trim()) return;
    this.cargando = true;

    this.libroService.buscarLibros(this.terminoBusqueda).subscribe({
      next: (data) => {
        // Ahora .set(data) funcionará porque 'resultados' es un Signal
        this.resultados.set(data); 
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }
  guardarResenia(puntuacion: string, texto: string) {
  const libro = this.libroParaReseniar();
  if (!libro) return;

  const objetoAEnviar = {
    // Asegúrate de que los nombres coincidan EXACTAMENTE con tu DTO en Java
    googleId: libro.googleId,
     // Temporal: Java espera un Long (número). 
    idUsuario: 1, // Tu usuario de prueba
    tituloLibro: libro.titulo,
    nombresAutores: Array.isArray(libro.autores) ? libro.autores : [libro.autores],
    urlPortada: libro.urlPortada,
    nombreUsuario: "Usuario Demo",
    fecha: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD para LocalDate
    valoracion: parseFloat(puntuacion),
    comentario: texto
  };

  console.log("Enviando DTO:", objetoAEnviar);

  this.reseniaService.crearResenia(objetoAEnviar).subscribe({
    next: (res) => {
      this.libroParaReseniar.set(null);
      alert("¡Reseña publicada!");
    },
    error: (err) => {
      console.error("Error detallado:", err);
      alert("Error al guardar. Mira la consola.");
    }
  });
}
}
