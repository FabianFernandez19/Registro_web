import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clubes } from '../modelos/clubes.model'; // Asegúrate que la ruta de importación sea correcta

@Injectable({
  providedIn: 'root'
})
export class ClubesService {

  private apiUrl = 'http://localhost:8000/api/Clubes';
  private totalAcampantesUrl = 'http://localhost:8000/api/obtener-total-acampantes';

  constructor(private http: HttpClient) { }

  obtenerOptions(access_token: string): Object {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    return { headers: headers };
  }

  getClubes(access_token: string): Observable<Clubes[]> {
    return this.http.get<Clubes[]>(this.apiUrl, this.obtenerOptions(access_token));
  }

  addClubes(access_token: string, clubes: Clubes): Observable<Clubes> {
    return this.http.post<Clubes>(this.apiUrl, clubes, this.obtenerOptions(access_token));
  }

  getClub(access_token: string, id: number): Observable<Clubes> {
    return this.http.get<Clubes>(`${this.apiUrl}/${id}`, this.obtenerOptions(access_token));
  }

  updateClub(access_token: string, id: number, clubes: Clubes): Observable<Clubes> {
    return this.http.put<Clubes>(`${this.apiUrl}/${id}`, clubes, this.obtenerOptions(access_token));
  }

  deleteClub(access_token: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.obtenerOptions(access_token));
  }

  getTotalAcampantes(token: string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<number>(this.totalAcampantesUrl, { headers });
  }

}
