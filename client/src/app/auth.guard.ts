import { CanActivateFn } from '@angular/router';
import { AuthService } from './service/auth.service';  // Make sure to import your AuthService
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject AuthService
  const router = inject(Router);  // Inject Router for navigation

  const user = authService.currentUser;

  if (!user) {
    // If user is not authenticated, redirect to the login page
    router.navigate(['/login']);  
    return false;  // Prevent route activation
  }

  return true;  // Allow access if user is authenticated
};
