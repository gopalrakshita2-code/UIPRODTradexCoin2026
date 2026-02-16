import { Component } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, ConfirmDialogModule, DialogModule, ButtonModule],
   templateUrl: './app.topbar.html',
   providers: [ConfirmationService]
})
export class AppTopbar {
    items!: MenuItem[];
    displayConfirmation: boolean = false;
    userName: string = '';

    constructor(public layoutService: LayoutService, 
        
        public confirmationService: ConfirmationService ,public router: Router) {}
        ngOnInit(): void {
            this.getUserName();
        }

        getUserName() {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    this.userName = parsedData?.data?.user?.name || '';
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                this.userName = '';
            }
        }


    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
    openConfirmation() {
        this.displayConfirmation = true;
        this.confirmationService.confirm({
            message: 'Are you sure you want to logout?',
            header: 'Logout Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                // User clicked Yes - proceed with logout
                this.logOutConfirmation();
            },
            reject: () => {
                // User clicked No - just close
            }
        });
    }
  
    logOutConfirmation() {
        this.displayConfirmation = false;
         // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('dashboardDatas');
        // Navigate to login
        this.router.navigate(['/auth/login']);   
    }
    closeConfirmation() {
        this.displayConfirmation = false;
    }


}
