import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubesService } from '../../servicios/clubes.service';
//import { Tipomascota } from '../../modelos/tipomascota.model';
import { Clubes } from '../../modelos/clubes.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule ],
  providers: [ClubesService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  listaClubes:Clubes []=[];
  totalAcampantes: any = {};
  
  
   // Propiedad para almacenar el total de acampantes


  clave: string | null = null;
  //usuario: Usuario | null = null;

  constructor(private clubesService: ClubesService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarClubes();
      this.getTotalAcampantes();
    }

    validarToken(): void{
      if(this.clave==null){
        this.clave=localStorage.getItem("access_token");
    
      }
        //console.log(this.clave);
      if (!this.clave){
        this._router.navigate(['clubes/index']);
      }
    
    }
    
    cargarClubes():void{
      if (!this.clave) {
        console.error('Error: Clave no disponible');
        return;
      }
    
      this.clubesService.getClubes(this.clave).subscribe(data=>{
        this.listaClubes = data;
      },
      err =>{
        console.log(err);
      });
    }
    editarClubes(id:any): void {
      this._router.navigateByUrl("/clubes/editar/"+id);
  
    
    }
  
    agregarClubes(): void {
      this._router.navigateByUrl("/clubes/create");
    }

    eliminarClubes(id: any): void {
      if (!this.clave) {
        console.error('Error: Clave no disponible');
        return;
      }
    
      this.clubesService.deleteClub(this.clave, id).subscribe(data => {
        this.cargarClubes();
      }, err => {
        console.log(err);
      });
    }

    verAcampantes(clubId: number): void {
      this._router.navigateByUrl(`/clubes/${clubId}/acampantes`);
    }

   /* verTotalclub(clubId: number): void{
      this._router.navigateByUrl(`/Clubes/${clubId}/calcular-totales`);

    }*/
    getTotalAcampantes(): void {
      if (!this.clave) {
        console.error('Error: Clave no disponible');
        return;
      }

      this.clubesService.getTotalAcampantes(this.clave).subscribe(total => {
        console.log('Total de acampantes:', total);
        this.totalAcampantes = total;
      }, err => {
        console.log(err);
      });
    }
    isAdmin(): boolean {
      const userRole = localStorage.getItem('user_role');
      return userRole === 'Administrator';
    }




}
