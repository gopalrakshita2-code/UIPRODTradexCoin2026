import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FluidModule } from 'primeng/fluid';
import { Authservice } from './service/authservice';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator 
        ,FluidModule , DialogModule , FluidModule ,CommonModule],
    templateUrl:"./login.html"
})
export class Login {
    email: string = '';
    password: string = '';
    checked: boolean = false;
    isLoading: boolean = false;
    errorDialog: boolean = false;
    errorMessage: string = '';

    constructor(
        private authService: Authservice,
        private router: Router
        
    ) {}

    onLogin() {
        if (!this.email || !this.password) {
            this.errorMessage = 'Please provide email and password';
            this.errorDialog = true;
            return;
        }

        this.isLoading = true;

        const payload = {
            email: this.email,
            password: this.password
        };

        this.authService.login(payload).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response) {
                    localStorage.setItem('user', JSON.stringify(response));
                }
                this.router.navigate(['/app/dashboard']);
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
                this.errorDialog = true;
            }
        });
    }

    closeErrorDialog() {
        this.errorDialog = false;
        this.errorMessage = '';
        this.email = '';
        this.password = '';
        this.checked = false;
        this.isLoading = false;
        this.errorDialog = false;
        this.errorMessage = '';
        this.email = '';
        this.password = '';
        this.checked = false;
        this.isLoading = false;
        this.errorDialog = false;
    }



}
