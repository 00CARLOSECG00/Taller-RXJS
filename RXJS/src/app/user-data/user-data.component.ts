import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent {
  @Input() usuario: User | null = null;
}
