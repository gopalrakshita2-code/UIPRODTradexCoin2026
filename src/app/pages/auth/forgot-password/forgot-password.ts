import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Authservice } from '../service/authservice';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterModule,
        RippleModule,
        AppFloatingConfigurator,
        FluidModule,
        FloatLabelModule,
        DialogModule,
        CommonModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './forgot-password.html'
})
export class ForgotPassword {
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    isLoading: boolean = false;
    successDialog: boolean = false;
    errorDialog: boolean = false;
    errorMessage: string = '';

    // Touched states for validation
    emailTouched: boolean = false;
    passwordTouched: boolean = false;
    confirmPasswordTouched: boolean = false;

    // Error messages
    emailError: string = '';
    passwordError: string = '';
    confirmPasswordError: string = '';

    private emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,2}$/;

    constructor(
        private authService: Authservice,
        private router: Router,
        private messageService: MessageService
    ) {}

    validateEmail(): void {
        if (!this.email || this.email.trim().length === 0) {
            this.emailError = 'Please enter your email address';
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

    onResetPassword() {
        // Mark all fields as touched
        this.emailTouched = true;
        this.passwordTouched = true;
        this.confirmPasswordTouched = true;

        // Validate all fields
        this.validateEmail();
        this.validatePassword();
        this.validateConfirmPassword();

        // Check if there are any errors
        if (this.emailError || this.passwordError || this.confirmPasswordError) {
            return;
        }

        this.isLoading = true;

        const payload = {
            email: this.email.trim(),
            password: this.password,
            confirmPassword: this.confirmPassword
        };
        console.log(payload);
        

        // Call auth service reset password method
        this.authService.resetPassword(payload).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.successDialog = true;
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
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
        this.errorMessage = '';
    }
}