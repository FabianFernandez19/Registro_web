import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acampante } from '../modelos/acampantes.model'

@Injectable({
  providedIn: 'root'
})
export class AcampantesService {

  private apiUrl = 'http://localhost:8000/api';  // URL base estática
 

  private contentTypeHeader = 'application/json'


  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': this.contentTypeHeader
    });
  }



  constructor(private http: HttpClient) { }

  getAcampantesByClub(clubId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/Clubes/${clubId}/acampantes`;
    return this.http.get(url, { headers });
  }

  getAcampanteById(id: number, token: string): Observable<Acampante> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Acampante>(`${this.apiUrl}/acampantes/${id}`, { headers });
  }

  createAcampante(acampante: Acampante, clubId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // Asegúrate de que la URL es correcta según el club_id
    const url = `${this.apiUrl}/clubes/${clubId}/acampantes`;
    return this.http.post(url, acampante, { headers });
  }
  
  updateAcampante(clubId: number, acampante: Acampante, token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/clubes/${clubId}/acampantes/${acampante.id}`, acampante, { headers });
}





  deleteAcampante(acampanteId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/acampantes/${acampanteId}`;
    return this.http.delete(url, { headers });
  }

   // New method: editAcampante
   editAcampante(acampante: Acampante, token: string): Observable<any> {
    const headers = this.createHeaders(token);
    return this.http.patch(`${this.apiUrl}/acampantes/${acampante.id}`, acampante, { headers });
  }

  downloadExcel(clubId: number, token: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/descargar-excel/${clubId}`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }
    

  downloadPDF(clubId: number, token: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/descargar-PDF/${clubId}`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  /*getTotalAcampantes(token: string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/obtener-total-acampantes`;
    return this.http.get<number>(url, { headers });
  }*/



}
