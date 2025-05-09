// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service'; // adjust path

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent {
//   email: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   signup() {
//     if (this.password !== this.confirmPassword) {
//       this.errorMessage = "Passwords do not match.";
//       return;
//     }

//     this.authService.signup(this.email, this.password).subscribe({
//       next: (response) => {
//         this.authService.setToken(response.token);
//         this.router.navigate(['/']);
//       },
//       error: (err) => {
//         console.error('Signup failed:', err);
//         this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
//       }
//     });
//   }
// }
