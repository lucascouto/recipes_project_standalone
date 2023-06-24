import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, LoadingSpinnerComponent],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponse>;

    this.isLoading = true;

    authObs = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signup(email, password);

    authObs.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandlerError() {
    this.error = null;
  }
}
