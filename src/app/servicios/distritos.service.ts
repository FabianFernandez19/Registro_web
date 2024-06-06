import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distrito } from '../modelos/distrito.model';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {

  private apiUrl = 'http://localhost:8000/api/Distritos';

  constructor(private http: HttpClient) { }

 /* obtenerOptions(access_token: any): Object {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    return { headers: headers };
  }

  getDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`${this.apiUrl}/distritos`);
  }*/

  getDistritos(access_token: string): Observable<Distrito[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    });

    return this.http.get<Distrito[]>(this.apiUrl, { headers });
  }
}
