import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AcampantesService } from '../../servicios/acampantes.service';
import { ClubesService } from '../../servicios/clubes.service';
import { Acampante } from '../../modelos/acampantes.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [AcampantesService, ClubesService],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  acampanteForm: FormGroup;
  clubId!: number;
  acampanteId?: number;
  cargos: string[] = [];

  cargoOptions: { [key: string]: string[] } = {
    'Familia Pastoral-Ministerial': ['Pastor', 'Hijo/a de pastor-ministro', 'Ministro', 'Esposa de ministro'],
    'Directivo': ['Director', 'Subdirector', 'Consejero'],
    'Acampante': ['Acampante'],
    'Acompañanate': ['Acudiente', 'Anciano consejero'],
    'Economo': ['Oficial', 'Auxiliar']
  };

  constructor(
    private fb: FormBuilder,
    private acampantesService: AcampantesService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.acampanteForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      tipo_entrada: ['', Validators.required],
      cargo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_sangre: ['', Validators.required],
      tipo_documento_identificacion: ['', Validators.required],
      numero_identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      fecha_nacimiento: ['', Validators.required],
      fecha_ingreso_club: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      direccion: ['', Validators.required],
      Edad: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      eps_afiliada: ['', Validators.required],
      alergico: [''],
      medicamento_alergias: [''],
      enfermedades_cronicas: [''],
      medicamento_enfermedades_cronicas: [''],
      
      en_caso_de_accidente_avisar_a: ['', Validators.required],
      relacion_persona_de_contacto: ['', Validators.required],
      telefono_persona_contacto: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });

    this.acampanteForm.get('tipo_entrada')?.valueChanges.subscribe(selectedTipo => {
      this.cargos = this.cargoOptions[selectedTipo] || [];
      this.acampanteForm.get('cargo')?.reset();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = +params['clubId']; // Retrieve clubId from route parameters
      this.acampanteId = +params['id']; // Retrieve acampanteId from route parameters

      if (this.acampanteId) {
        this.loadAcampante(this.acampanteId);
      }
    });
  }

  loadAcampante(id: number): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.acampantesService.getAcampanteById(id, token).subscribe(
        acampante => {
          this.acampanteForm.patchValue(acampante); // Update form values with acampante data
        },
        error => console.error('Error al cargar acampante:', error)
      );
    }
  }

  save(): void {
    const token = localStorage.getItem('access_token');
    if (this.acampanteForm.valid && token) {
      if (this.acampanteId) {
        this.acampantesService.updateAcampante(this.clubId, { ...this.acampanteForm.value, id: this.acampanteId }, token).subscribe(
          data => {
            console.log('Acampante actualizado con éxito:', data);
            alert('Acampante actualizado con exito');
            this.cdr.detectChanges();
            this.router.navigate(['/clubes', this.clubId, 'acampantes']);
          },
          error => console.error('Error al actualizar acampante:', error)
        );
      } else {
        this.acampantesService.createAcampante(this.acampanteForm.value, this.clubId, token).subscribe(
          response => {
            console.log('Acampante creado con éxito', response);
            alert('Acampante creado con éxito');
            this.router.navigate(['/clubes', this.clubId, 'acampantes']);
          },
          error => console.error('Error al crear acampante', error)
        );
      }
    } else {
      console.error('Authentication token is missing or form is invalid');
      console.log('Form is valid', this.acampanteForm.value);
      console.log('Token:', token);
    }
  }
}

