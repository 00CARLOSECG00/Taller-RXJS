import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';
import {Reaction} from'../interfaces/reaction'

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'] 
})
export class UserPostsComponent {
  @Input() posts: Post[] | null = null;  
  
}
