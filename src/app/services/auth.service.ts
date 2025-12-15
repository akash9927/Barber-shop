import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private ADMIN_KEY = 'salon_admin';
    private USER_SESSION_KEY = 'loggedUser';

    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    // 🌐 Browser check
    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    // 👤 User login check (backend-based)


    loginAdmin(email: string, password: string): boolean {
        if (!this.isBrowser()) return false;

        if (email === 'admin@salon.com' && password === 'amar123') {
            localStorage.setItem('salon_admin', 'true');
            return true;
        }
        return false;
    }

    logout(): void {
        if (this.isBrowser()) {
            // Clear user session
            localStorage.removeItem('loggedUser');

            // Clear admin session
            localStorage.removeItem('salon_admin');
        }

        // Always redirect to login
        this.router.navigate(['/login']);
    }
    isLoggedIn(): boolean {
        if (!this.isBrowser()) return false;
        return !!localStorage.getItem('loggedUser');
    }

    isAdmin(): boolean {
        if (!this.isBrowser()) return false;
        return localStorage.getItem('salon_admin') === 'true';
    }

}
