import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'http://127.0.0.1:8000/api/';
  

  constructor(private http : HttpClient) { }

  obtenerOptions(access_token:any):Object{
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    return {
      'headers': headers
    }
  }

  login(email:any, password:any):Observable<any>{
    return this.http.post(this.url+"login", {email:email, password:password});
  }

  logout(access_token:any): Observable<any> {
    localStorage.removeItem('access_token');
    return this.http.post(`${this.url}logout`, this.obtenerOptions(access_token));
  }


  /*register(name: string, email: string, password: string): Observable<any> {
    // Define el cuerpo de la solicitud basado en los parámetros recibidos
    const userData = {
      name,
      email,
      password
    };

    // Realiza la solicitud POST al endpoint de registro
    return this.http.post(`${this.url}signup`, userData);
  }*/

  register(userData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.url}signup`, userData);
  }

  
 
}
