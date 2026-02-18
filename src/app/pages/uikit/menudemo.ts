// Add these imports at the top
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
    selector: 'app-menu-demo',
    standalone: true,
    imports: [
        CommonModule,
        BreadcrumbModule,
        MenuModule,
        ButtonModule,
        ToastModule,
        FileUploadModule,
        FormsModule,
        InputNumberModule,
        SelectModule
    ],
    providers: [MessageService],
    templateUrl: './menudemo.html'
})
export class MenuDemo {
 
    loanAmount: number | null = null;
    selectedLoanTerm: number | null = null;
    calculatedInterest: number = 0;
    dailyInterestRate: number = 0.33;
    isFormDisabled: boolean = true; // Set to true to disable form, false to enable

    uploadedFiles: any[] = [];

    loanTermOptions = [
        { label: '7 Days', value: 7 },
        { label: '15 Days', value: 15 },
        { label: '30 Days', value: 30 },
        { label: '45 Days', value: 45 },
        { label: '60 Days', value: 60 }
    ];

    constructor(private messageService: MessageService) {}

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    calculateInterest() {
        if (this.loanAmount && this.selectedLoanTerm) {
            // Calculate: (Loan Amount * Daily Interest Rate / 100) * Number of Days
            this.calculatedInterest = (this.loanAmount * this.dailyInterestRate / 100) * this.selectedLoanTerm;
        } else {
            this.calculatedInterest = 0;
        }
    }

    isFormValid(): boolean {
        return this.loanAmount !== null && 
               this.loanAmount > 0 && 
               this.selectedLoanTerm !== null;
    }

    submitLoanApplication() {
        if (this.isFormValid()) {
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Application Submitted', 
                detail: 'Your loan application has been submitted successfully.' 
            });
            // Reset form
            this.loanAmount = null;
            this.selectedLoanTerm = null;
            this.calculatedInterest = 0;
        }
    }
}