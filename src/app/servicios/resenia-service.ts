import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resenia } from '../interfaces/resenia';

@Injectable({
  providedIn: 'root'
})
export class ReseniaService {
  // La URL de tu backend
  private apiUrl = 'http://localhost:8080/api/resenias/publicar';

  constructor(private http: HttpClient) { }

  // Método para obtener el muro del usuario
  getMuro(idUsuario: number): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(`${this.apiUrl}/muro/${idUsuario}`);
  }
  crearResenia(resenia: any) {
    return this.http.post(this.apiUrl, resenia);
  }
}