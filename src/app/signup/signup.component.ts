import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { GraphqlService } from '../graphql.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule], 
  standalone: true
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private graphqlService: GraphqlService, private router: Router) {}

  onSignup(): void {
    this.graphqlService.signup(this.username, this.email, this.password).subscribe({
      next: (response: any) => { 
        console.log('Signup successful', (response.data as any).signup); 
      },
      error: (error) => {
        console.error('Signup failed', error);
        this.errorMessage = error.message || 'Signup failed. Please try again.';
      }
    });
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}