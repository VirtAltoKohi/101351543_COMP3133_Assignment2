import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule], 
  standalone: true 
})
export class LoginComponent {
  username = ''; 
  password = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/employee-list']);
      },
      error: (error) => {
        console.log('Login error', error);
      }
    });
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

}