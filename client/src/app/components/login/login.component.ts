import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.error = '';

        // Redirect or show success
        this.router.navigate(['/search/movie']);
        console.log('Login successful');
      })
      .catch(err => {
        this.error = err.message;
      });
  }
  googleLogin() {
  this.authService.loginWithGoogle()
    .then(() => {
      this.error = '';
              this.router.navigate(['/search/movie']);

      console.log('Google login successful');
    })
    .catch(err => {
      this.error = err.message;
    });
}

}
