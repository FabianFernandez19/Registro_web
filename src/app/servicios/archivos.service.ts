import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Archivos } from '../modelos/archivos.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  url='http://127.0.0.1:8000/api/pdfs';
  //downloadUrl = 'http://127.0.0.1:8000/api/auth/pdfs/download';

  downloadUrl = 'http://127.0.0.1:8000/api/pdfs/download';

  // Ajusta la URL para incluir el clubId como parte de la ruta
  private uploadUrl = 'http://127.0.0.1:8000/api/pdfs/upload'; // URL correcta



  
  constructor(private http:HttpClient) { }

  obtenerOptions(access_token:any):Object{
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    return {
      'headers': headers
    }
  }

  /*getarchivos(access_token:any):Observable<any>{
    return this.http.get<any>(this.url, this.obtenerOptions(access_token));
  }*/



  getarchivos(access_token: any, clubId: number): Observable<any> {
    return this.http.get<any>(`${this.url}?clubId=${clubId}`, this.obtenerOptions(access_token)).pipe(
      map(response => response.data)
    );
  }

  


  /*addarchivos(access_token: any, formData: FormData): Observable<any> {
    const uploadUrl = 'http://127.0.0.1:8000/api/auth/pdfs/upload'; // Ruta correcta para upload
    const options = this.obtenerOptions(access_token);
    return this.http.post(uploadUrl, formData, options);
  }*/

  addarchivos(access_token: any, formData: FormData, clubId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access_token}`,
    });
  
    // Construye manualmente la URL con el clubId como parte de la misma
    const uploadUrl = `http://127.0.0.1:8000/api/pdfs/${clubId}/upload`;
  
    // Realiza la solicitud POST con los datos del formulario y las cabeceras
    return this.http.post(uploadUrl, formData, { headers });
  }


  
  

  deletearchivos(access_token: any, id: string): Observable<any> {
    const deleteUrl = `http://127.0.0.1:8000/api/pdfs/${id}`; // Construir la URL con el ID
    const options = this.obtenerOptions(access_token);
    return this.http.delete(deleteUrl, options);
  }


  downloadPdf(access_token: any, id: number): Observable<Blob> {
    return this.http.get(`${this.downloadUrl}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token
      }),
      responseType: 'blob'  // Importante para procesar correctamente el archivo PDF
    }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError('Something bad happened; please try again later.');
  }
  

}
