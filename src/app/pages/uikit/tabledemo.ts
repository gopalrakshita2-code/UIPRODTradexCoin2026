import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { Router } from '@angular/router';

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        DialogModule,
        FluidModule
    ],
    templateUrl: 'tabledemo.html',
    providers: [MessageService]
})
export class TableDemo implements OnInit {
    amount: number | string = '';
    walletAddress: string = '';
    showSuccessDialog: boolean = false;

    constructor(
        private service: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        
    }

    showSuccessViaToast() {
        if (this.isFormValid) { 
            // Show dialog instead of toast
            this.showSuccessDialog = true;
            // Reset form after showing dialog
            this.amount = '';
            this.walletAddress = '';
        }
    }

    onDialogOk() {
        // Close dialog and redirect to dashboard
        this.showSuccessDialog = false;
        this.router.navigate(['/app/dashboard']);
    }

    get isFormValid(): boolean {
        // Check if amount has a value and is a valid positive number
        const amountValue = this.amount;
        const amountNum = Number(amountValue);
        const hasValidAmount = amountValue !== '' && 
                              amountValue !== null && 
                              amountValue !== undefined && 
                              !isNaN(amountNum) && 
                              amountNum > 0 && 
                              amountNum < 10000000;
        
        // Check if wallet address has a value (ensure boolean return)
        const hasValidAddress = Boolean(this.walletAddress && this.walletAddress.trim() !== '');
        
        // Both must be valid
        return hasValidAmount && hasValidAddress;
    }
}