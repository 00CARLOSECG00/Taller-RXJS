import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post';

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
  posts: Post[] | null = null;

  @Output() usuarioChange: EventEmitter<User | null> = new EventEmitter<User | null>();
  @Output() postsChange: EventEmitter<Post[] | null> = new EventEmitter<Post[] | null>();

  constructor(private http: HttpClient) {}

  searchUser() {
    this.http.get(`${this.ROOT_URL}/users`).subscribe({
      next: (response: any) => {
        const users = response.users; 
        const UsuarioEncontrado = users.find((user: any) => user.username === this.txtUser);

        if (UsuarioEncontrado) {
          this.usuario = UsuarioEncontrado; 
          this.usuarioChange.emit(UsuarioEncontrado); 
          this.buscarPosts(UsuarioEncontrado.id); 
          
        } else {
          this.usuarioChange.emit(null); 
        }
      }
    });
  }

  
  buscarPosts(userId: number) {
    this.http.get(`${this.ROOT_URL}/posts/user/${userId}`).subscribe({
      next: (response: any) => {
        this.posts = response.posts; 
        this.postsChange.emit(this.posts); 
        // Llamar a obtenerComentarios para cada post
        if (this.posts) {
          this.posts.forEach(post => {
            this.obtenerComentarios(post); 
          });
        }
      },
      error: (err) => {
        this.posts = null; 
        this.postsChange.emit(null);
      }
    });
  }


  obtenerComentarios(post: Post) {
    this.http.get(`${this.ROOT_URL}/comments/post/${post.id}`).subscribe({
        next: (response: any) => {
            post.comments = response.comments;
        },
        error: (err) => {
            console.error(`Error al obtener comentarios para el post ${post.id}:`, err);
            post.comments = [];
        }
    });
}
}
