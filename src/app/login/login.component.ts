import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
  ) { }

  login() {
    this.error = '';

    this.apiService.getUsers().subscribe({
      next: (users) => {
        console.log('Users from API:', users);
        console.log('Entered Email:', this.email);
        console.log('Entered Password:', this.password);

        const user = users.find(u =>
          u.email.trim().toLowerCase() === this.email.trim().toLowerCase() &&
          u.password === this.password &&
          u.isActive === true
        );

        if (user) {
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.router.navigate(['/booking']);
        } else {
          this.error = 'Invalid credentials or access disabled';
        }
      },
      error: () => {
        this.error = 'Backend error. Please try again.';
      }
    });
  }
  goToAdminLogin(): void {
    this.router.navigate(['/admin-login']);
  }
}
