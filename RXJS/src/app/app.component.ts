import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataComponent } from "./user-data/user-data.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, UserDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RXJS';
}