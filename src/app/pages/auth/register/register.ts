import { Component } from '@angular/core';
import { Authservice } from '../service/authservice';
import { Router, RouterModule } from '@angular/router';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [AppFloatingConfigurator, ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, DialogModule, FloatLabelModule , FluidModule ,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  userName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  successDialog: boolean = false;
  errorDialog: boolean = false;
  errorMessage: string = '';

  // Touched states
  userNameTouched: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;

  // Error messages
  userNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  private emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,2}$/;

  constructor(
      private authService: Authservice,
      private router: Router
  ) {}

  // Validation methods
  validateUserName(): void {
      if (!this.userName || this.userName.trim().length === 0) {
          this.userNameError = 'Please enter your username';
      } else if (this.userName.trim().length < 3) {
          this.userNameError = 'Username must be at least 3 characters';
      } else {
          this.userNameError = '';
      }
  }

  validateEmail(): void {
      if (!this.email || this.email.trim().length === 0) {
          this.emailError = 'Please enter your email';
      } else if (!this.emailRegex.test(this.email)) {
          this.emailError = 'Please enter a valid email address';
      } else {
          this.emailError = '';
      }
  }

  validatePassword(): void {
      if (!this.password || this.password.length === 0) {
          this.passwordError = 'Please enter your password';
      } else if (this.password.length < 6) {
          this.passwordError = 'Password must be at least 6 characters';
      } else {
          this.passwordError = '';
      }
      // Re-validate confirm password if it's already touched
      if (this.confirmPasswordTouched) {
          this.validateConfirmPassword();
      }
  }

  validateConfirmPassword(): void {
      if (!this.confirmPassword || this.confirmPassword.length === 0) {
          this.confirmPasswordError = 'Please confirm your password';
      } else if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = 'Passwords do not match';
      } else {
          this.confirmPasswordError = '';
      }
  }

  // Blur handlers
  onUserNameBlur(): void {
      this.userNameTouched = true;
      this.validateUserName();
  }

  onEmailBlur(): void {
      this.emailTouched = true;
      this.validateEmail();
  }

  onPasswordBlur(): void {
      this.passwordTouched = true;
      this.validatePassword();
  }

  onConfirmPasswordBlur(): void {
      this.confirmPasswordTouched = true;
      this.validateConfirmPassword();
  }

  // Change handlers for password fields (since blur doesn't work well with p-password)
  onPasswordChange(): void {
      if (!this.passwordTouched) {
          this.passwordTouched = true;
      }
      this.validatePassword();
  }

  onConfirmPasswordChange(): void {
      if (!this.confirmPasswordTouched) {
          this.confirmPasswordTouched = true;
      }
      this.validateConfirmPassword();
  }

  onRegister() {
      // Mark all fields as touched
      this.userNameTouched = true;
      this.emailTouched = true;
      this.passwordTouched = true;
      this.confirmPasswordTouched = true;

      // Validate all fields
      this.validateUserName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      // Check if there are any errors
      if (this.userNameError || this.emailError || this.passwordError || this.confirmPasswordError) {
          return;
      }

      this.isLoading = true;

      const payload = {
          name: this.userName.trim(),
          email: this.email.trim(),
          password: this.password,
          confirmPassword: this.confirmPassword
      };
      console.log(payload);
      

      this.authService.register(payload).subscribe({
          next: (response) => {
              this.isLoading = false;
              this.successDialog = true;
          },
          error: (error) => {
              this.isLoading = false;
              this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
              this.errorDialog = true;
          }
      });
  }

  goToLogin() {
      this.successDialog = false;
      this.router.navigate(['/auth/login']);
  }

  closeErrorDialog() {
      this.errorDialog = false;
      // Clear all form fields
      this.userName = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      // Reset touched states
      this.userNameTouched = false;
      this.emailTouched = false;
      this.passwordTouched = false;
      this.confirmPasswordTouched = false;
      // Clear error messages
      this.userNameError = '';
      this.emailError = '';
      this.passwordError = '';
      this.confirmPasswordError = '';
  }
}
