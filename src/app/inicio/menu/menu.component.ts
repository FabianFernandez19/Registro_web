import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [LoginService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  access_token: string | null = null;

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(){
    this.getAccess_token();
  }

  getAccess_token(): void {
    this.access_token = localStorage.getItem('access_token');
  }

  logout() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error('No token found');
        this.router.navigate(['/login']);  // Redirige al login si no hay token
        return;
    }
    this.authService.logout(token).subscribe(
        () => {
            console.log('Logout successful');
            localStorage.removeItem('access_token');  // Limpia el token
            this.router.navigate(['/login']);  // Redirige al login
        },
        error => {
            console.error('Error during logout:', error);
            this.router.navigate(['/error'], { queryParams: { error: 'logout-failed' } });  // Redirige a una página de error
        }
    );
}





}
