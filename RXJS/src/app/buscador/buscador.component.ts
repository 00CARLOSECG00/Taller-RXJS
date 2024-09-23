import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  ROOT_URL = "https://dummyjson.com";
  txtUser: string = "";
  usuario: User | null = null;
  @Output() usuarioChange: EventEmitter<User | null> = new EventEmitter<User | null>();

  constructor(private http: HttpClient) {}

  searchUser() {
    this.http.get(`${this.ROOT_URL}/users`).subscribe({
      next: (response: any) => {
        const users = response.users; 
        const foundUser = users.find((user: any) => user.username === this.txtUser);
        this.usuarioChange.emit(foundUser || null);
      }
    });
  }
}
