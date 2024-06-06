import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DistritosService } from '../../servicios/distritos.service';
import { ClubesService } from '../../servicios/clubes.service';
import { Clubes } from '../../modelos/clubes.model';
import { Distrito } from '../../modelos/distrito.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  standalone: true,
  providers: [DistritosService, ClubesService ],
  imports:[
    FormsModule, ReactiveFormsModule, CommonModule],
    styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  clubesForm: FormGroup;
  distritos: Distrito[] = [];
  clave: string | null = null;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private distritosService: DistritosService,
    private clubesService: ClubesService,
    private route: ActivatedRoute
  ) {
    this.clubesForm = this.fb.group({
      nombre: ['', Validators.required],
      distrito_id: ['', Validators.required]
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.clave = localStorage.getItem("access_token");
    if (!this.clave) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarDistritos();
    if (this.id) {
      this.cargarDatosClub();
    }
  }

  cargarDistritos(): void {
    this.distritosService.getDistritos(this.clave!).subscribe(distritos => {
      this.distritos = distritos;
    }, error => {
      console.error('Error al cargar distritos:', error);
    });
  }

  cargarDatosClub(): void {
    this.clubesService.getClub(this.clave!, +this.id!).subscribe(data => {
      this.clubesForm.setValue({
        nombre: data.nombre,
        distrito_id: data.distrito?.id ?? ''
      });
    }, error => {
      console.error('Error al cargar el club:', error);
    });
  }

  guardarClub(): void {
    if (this.clubesForm.invalid) {
      return;
    }
    const club: Clubes = this.clubesForm.value;
    if (this.id) {
      this.clubesService.updateClub(this.clave!, +this.id, club).subscribe(() => {
        this.router.navigate(['clubes/index']);
      });
    } else {
      this.clubesService.addClubes(this.clave!, club).subscribe(() => {
        this.router.navigate(['clubes/index']);
      });
    }
  }
}