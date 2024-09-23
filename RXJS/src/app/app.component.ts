import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataComponent } from "./user-data/user-data.component";
import { HttpClientModule } from '@angular/common/http';
import { BuscadorComponent } from './buscador/buscador.component';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, UserDataComponent, BuscadorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RXJS';
  usuario: User | null = null;

  onUsuarioChange(usuario: User | null) {
    this.usuario = usuario;
  }
}
