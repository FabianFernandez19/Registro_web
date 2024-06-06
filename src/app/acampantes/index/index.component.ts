import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcampantesService } from '../../servicios/acampantes.service';
import { Acampante } from '../../modelos/acampantes.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [AcampantesService],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  acampantes: Acampante[] = [];
  clubId!: number;
  clave: string | null = null;
  //userRole: string | undefined;

  constructor(
    private acampantesService: AcampantesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clubId = Number(params['clubId']);
      if (!this.clubId) {
        console.error('Club ID is missing');
        this._router.navigate(['/error']);
        return;
      }

      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('Authentication token is missing');
        this._router.navigate(['/login']);
        return;
      }

      this.cargarAcampantes(this.clubId, token);
    });
  }

  cargarAcampantes(clubId: number, token: string): void {
    this.acampantesService.getAcampantesByClub(clubId, token).subscribe(
      data => {
        this.acampantes = data;
      },
      error => {
        console.error('Error al cargar acampantes:', error);
      }
    );
  }

  createAcampante(): void {
    if (this.clubId) {
      this._router.navigateByUrl(`/clubes/${this.clubId}/acampantes/create`);
    } else {
      console.error('Club ID is missing');
      this._router.navigate(['/error']);
    }
  }

  editAcampante(acampante: Acampante): void {
    this._router.navigate([`/clubes/${this.clubId}/acampantes/editar`, acampante.id]);
  }

  validarToken(): void {
    if (this.clave == null) {
      this.clave = localStorage.getItem("access_token");
    }

    if (!this.clave) {
      this._router.navigate(['acampantes/index']);
    }
  }


  deleteAcampante(acampanteId: number): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Authentication token is missing');
      this._router.navigate(['/login']);
      return;
    }

    this.acampantesService.deleteAcampante(acampanteId, token).subscribe(
      response => {
        this.acampantes = this.acampantes.filter(a => a.id !== acampanteId);
        console.log('Acampante eliminado exitosamente:', response);
        alert('Acampante eliminado correctamente');
      },
      error => {
        console.error('Error al eliminar acampante:', error);
      }
    );
  }
  isAdmin(): boolean {
    const userRole = localStorage.getItem('user_role');
    return userRole === 'Administrator';
  }

  downloadExcel(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Authentication token is missing');
      this._router.navigate(['/login']);
      return;
    }
  
    this.acampantesService.downloadExcel(this.clubId, token).subscribe(
      blob => {
        // Crear un objeto URL para el blob y abrirlo en una nueva ventana
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Error al descargar el archivo Excel:', error);
      }
    );
  }

  downloadPDF(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Authentication token is missing');
      this._router.navigate(['/login']);
      return;
    }

    this.acampantesService.downloadPDF(this.clubId, token).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'acampantes.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al descargar el archivo PDF:', error);
      }
    );
  }

  



}