import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
  ) { }

  signup() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      isActive: true,
      role: 'USER'
    };

    this.apiService.createUser(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Signup failed. Try again.';
      }
    });
  }


}
