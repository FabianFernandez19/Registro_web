import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalesclubService } from '../../servicios/totalesclub.service';
import { TotalesClub } from '../../modelos/TotalesClub.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchivosService } from '../../servicios/archivos.service';
import { Archivos} from '../../modelos/archivos.model';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule  ],
  providers: [TotalesclubService, ArchivosService  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {


  clubId?: number;
  totalClub?: TotalesClub;
 access_token: any;
 archivos: Archivos[] = []

  constructor(private totalesclubService: TotalesclubService, private route: ActivatedRoute, 
    private cd: ChangeDetectorRef,  private archivosService: ArchivosService ) { }

 /*/ ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = +params['clubId'];
      this.obtenerTotalClub(this.clubId);
    });
  }*/





  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = +params['clubId'];
      this.access_token = localStorage.getItem('access_token'); // Obtener el token de localStorage
      this.obtenerTotalClub(this.clubId);
      this.obtenerArchivos(this.clubId);
    });
  }





  obtenerArchivos(clubId: number): void {
    this.archivosService.getarchivos(this.access_token, clubId).subscribe(
      archivos => {
        this.archivos = archivos;
        console.log(this.archivos)
        this.cd.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al obtener los archivos:', error);
      }
    );
  }


  obtenerTotalClub(clubId: number): void {
    console.log('Token:', this.access_token); // Imprimir el token en la consola
    this.totalesclubService.getTotalclub(this.access_token, clubId).subscribe(
      response => {
        console.log('Respuesta del backend:', response); // Imprimir la respuesta del backend en la consola

        // Mapear la respuesta a la estructura esperada de TotalesClub
        this.totalClub = {
          id: response.totales_club.id,
          club_id: response.club.id,
          club_nombre: response.club.nombre,
          total_acampantes: response.totales_club.total_acampantes,
          total_club: response.totales_club.total_club
        };

        this.cd.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al obtener los datos:', error); // Manejar cualquier error que ocurra al obtener los datos
      }
    );
  }

  descargarArchivo(id: number): void {
    this.archivosService.downloadPdf(this.access_token, id).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `archivo_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }

  eliminarArchivo(id: number): void {
    const idString: string = id.toString(); // Convertir el número a string
    this.archivosService.deletearchivos(this.access_token, idString).subscribe(
      response => {
        console.log('Archivo eliminado exitosamente:', response);
        alert('Archivo eliminado exitosamente:) ');
        // Actualizar la lista de archivos después de eliminar
        this.obtenerArchivos(this.clubId!);
      },
      error => {
        console.error('Error al eliminar el archivo:', error);
      }
    );
  }
  
}
 
  


