import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8080/api/libros/buscar';

  constructor(private http: HttpClient) { }

  // El método que llama a Java (y Java llamará a Python si hace falta)
  buscarLibros(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?query=${query}`);
  }
}