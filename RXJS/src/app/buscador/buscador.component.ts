import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment'; 
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

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
    this.http.get(`${this.ROOT_URL}/users`).pipe(
      mergeMap((response: any) => {
        const users = response.users; 
        const UsuarioEncontrado = users.find((user: any) => user.username === this.txtUser);

        if (UsuarioEncontrado) {
          this.usuario = UsuarioEncontrado; 
          this.usuarioChange.emit(UsuarioEncontrado);
          return this.buscarPosts(UsuarioEncontrado.id);
        } else {
          this.usuarioChange.emit(null);
          return of(null);
        }
      }),
      catchError((err) => {
        console.error('Error en la búsqueda de usuario:', err);
        this.usuarioChange.emit(null);
        return of(null);
      })
    ).subscribe();
  }

  buscarPosts(userId: number) {
    return this.http.get(`${this.ROOT_URL}/posts/user/${userId}`).pipe(
      mergeMap((response: any) => {
        this.posts = response.posts; 
        this.postsChange.emit(this.posts); 

        if (this.posts) {
          // Llama a obtenerComentarios para cada post
          return of(...this.posts.map(post => this.obtenerComentarios(post)));
        }
        return of(null);
      }),
      catchError((err) => {
        this.posts = null; 
        this.postsChange.emit(null);
        console.error('Error al buscar posts:', err);
        return of(null);
      })
    );
  }

  obtenerComentarios(post: Post) {
    return this.http.get<Comment[]>(`${this.ROOT_URL}/comments/post/${post.id}`).pipe(
      catchError((err) => {
        console.error(`Error al obtener comentarios para el post ${post.id}:`, err);
        post.comments = []; 
        return of([] as Comment[]); 
      })
    ).subscribe(comments => {
      post.comments = comments;
    });
  }
}
