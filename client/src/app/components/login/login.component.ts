import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
