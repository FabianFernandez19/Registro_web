import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './inicio/menu/menu.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, MenuComponent, FooterComponent, HttpClientModule, FormsModule,],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Registro_web';
}
