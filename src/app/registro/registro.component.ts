import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule , 
    HttpClientModule// Asegúrate de añadir ReactiveFormsModule aquí
  ],
  providers: [LoginService],
  standalone: true,
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  registrar(): void {
    if (this.registroForm.valid) {
      this.loginService.register(this.registroForm.value ).subscribe({
        next: () => {
          alert('Registro exitoso. Bienvenido a la plataforma!');
          this.router.navigate(['inicio/body']);  // Redirige a la página principal
          //window.location.reload()
        },
        error: (error: HttpErrorResponse) => {  // Aquí se especifica el tipo HttpErrorResponse
          console.error('Error en el registro:', error.message);
          alert('Error en el registro: ' + (error.error.message || 'No se pudo completar el registro.'));
        }
      });
    }
  }
}

