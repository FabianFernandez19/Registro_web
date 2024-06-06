import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalesClub } from '../modelos/TotalesClub.model'

@Injectable({
  providedIn: 'root'
})
export class TotalesclubService {

  private apiUrl = 'http://localhost:8000/api/Clubes/{clubId}/calcular-totales';

  constructor(private http: HttpClient) { }

  obtenerOptions(access_token: any): Object {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    return { headers: headers };
  }

  /*getTotalclub(access_token: any, id: number): Observable<TotalesClub> {
    return this.http.get<TotalesClub>(`${this.apiUrl}/${id}`, this.obtenerOptions(access_token));
  }*/

  getTotalclub(access_token: any, id: number): Observable<any> {  // Cambiamos el tipo a 'any'
    const url = `${this.apiUrl.replace('{clubId}', id.toString())}`;
    return this.http.get<any>(url, this.obtenerOptions(access_token));
  }


}
