import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';
import { Comment} from '../interfaces/comment';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'] 
})
export class UserPostsComponent implements OnInit {
  @Input() posts: Post[] | null = null;

  ngOnInit() {
    this.logPosts();
  }

  logPosts() {
    if (this.posts) {	
      console.log('Posts en UserPostsComponent:', this.posts);
      this.posts.forEach((post) => {
        console.log(`Comentarios para el post ${post.id}:`, post.comments);
      });
    }
  }
}
