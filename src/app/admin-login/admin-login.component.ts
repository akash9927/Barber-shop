import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    const success = this.authService.loginAdmin(this.email, this.password);

    if (success) {
      this.router.navigate(['/admin']);
    } else {
      this.error = 'Invalid admin credentials';
    }
  }
}
