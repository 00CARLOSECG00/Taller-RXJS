import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataComponent } from "./user-data/user-data.component";
import { HttpClientModule } from '@angular/common/http';
import { BuscadorComponent } from './buscador/buscador.component';
import { User } from './interfaces/user.interface';
import { Post } from './interfaces/post';
import{UserPostsComponent} from'./user-posts/user-posts.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, UserDataComponent, BuscadorComponent,UserPostsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RXJS';
  usuario: User | null = null;
  posts: Post[] | null=null;

  onUsuarioChange(usuario: User | null) {
    this.usuario = usuario;
  }
  onPostsChange(posts: Post[] | null){
    this.posts=posts;

  }
  
}
