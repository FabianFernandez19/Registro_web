import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../modelos/login.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule, RouterModule],
  providers: [LoginService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  loginForm=this.fb.group({
    email:'',
    password:''
  });

  rol: string | null = null;

  access_token: string | null = null;

  constructor(private fb: FormBuilder, private loginService:LoginService, 
    private _router:Router){

    }

    ngOnInit(): void{
      this.access_token = localStorage.getItem('access_token');
      if (this.access_token) {
        this._router.navigate(['Pagina/index']);
      }
    }

    /*login(){
      this.loginService.login(this.loginForm.get('email')?.value, 
        this.loginForm.get('password')?.value).subscribe( 
          data => {
            if (data!==null) {
              this.rol=data?.rol;
              if (this.rol=="Administrator") {
                localStorage.setItem('access_token', data?.access_token);
                localStorage.setItem('user_id', data?.user_id);
                //this._router.navigate(['/usuario/index']);
                window.location.reload();
              } else {
                this._router.navigate(['/inicio/body']);
              }
            }
          }, err => {
            console.log(err);
          })
    }*/

    login(): void {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (data) => {
          if (data !== null) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user_role', data.rol); // Guardar el rol en el almacenamiento local
            // Redirecciona tanto a administradores como a usuarios a la misma página
            //this._router.navigate(['Pagina/index']); // Cambia '/pagina/comun' por la ruta adecuada
            window.location.reload();
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Error de inicio de sesión, verifica tus credenciales');
        }
      });
    }


    
}
