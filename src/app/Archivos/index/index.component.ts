import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivosService } from '../../servicios/archivos.service';
//import { Tipomascota } from '../../modelos/tipomascota.model';
import { Archivos } from '../../modelos/archivos.model';
import { Router } from '@angular/router';
//import { Usuario } from '../../modelos/usuarios.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers: [ArchivosService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  listaArchivos:Archivos []=[];

  clave: string | null = null;
 // usuario: Usuario | null = null;

  constructor(private archivosService: ArchivosService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarArchivos();
    }
    validarToken(): void{
      if(this.clave==null){
        this.clave=localStorage.getItem("access_token");
    
      }

      if (!this.clave){
        this._router.navigate(['archivos/index']);
      }
    
    } 

    /*cargarArchivos():void{
      this.archivosService.getarchivos(this.clave).subscribe(data=>{
        this.listaArchivos = data;
      },
      err =>{
        console.log(err);
      });
    }*/
    cargarArchivos(): void {
      this.archivosService.getarchivos(this.clave).subscribe({
        next: (archivos:  any) => {
          this.listaArchivos = archivos;
        },
        error: (err:  any) => {
          console.error("Error cargando archivos: ", err);
        }
      });
    }
    

    eliminararchivos(id:any): void {
      this.archivosService. deletearchivos(this.clave, id).subscribe(data=>{
        this.cargarArchivos();
      },
      err =>{
        console.log(err );
      });
    }

    agregarArchivos(): void {
      this._router.navigateByUrl("/archivos/create");
    }

    downloadFile(id: number | undefined) {
      if (id === undefined) {
        console.error('El archivo no tiene ID.');
        return;  // No continuar si el ID es undefined
      }
      const token = localStorage.getItem('access_token');
      if (token) {
        this.archivosService.downloadPdf(token, id).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'archivo.pdf';  // Usa un nombre dinámico si es necesario
          a.click();
          window.URL.revokeObjectURL(url);
        }, error => {
          console.error('Error downloading the file:', error);
        });
      }
    }
    
    




}
