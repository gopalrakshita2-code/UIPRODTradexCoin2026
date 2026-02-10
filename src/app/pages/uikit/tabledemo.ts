import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { Customer, CustomerService, Representative } from '../service/customer.service';
import { Product, ProductService } from '../service/product.service';
import {ObjectUtils} from "primeng/utils";
import { FluidModule } from 'primeng/fluid';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        FluidModule
    ],
    templateUrl: 'tabledemo.html',
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class TableDemo implements OnInit {
    amount: number = 0;
    walletAddress: string = '';
    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private service: MessageService
    ) {}

    ngOnInit() {
        
    }
    showSuccessViaToast() {
        if (this.isFormValid()) { 
            this.service.add({ severity: 'success', summary: 'Withdraw Funds', detail: 'Your funds have been withdrawn successfully.' });
            // Reset form after submission
            this.amount = 0;
            this.walletAddress = '';
        }
    }
    isFormValid(): boolean {
        return this.amount > 0 && this.walletAddress.trim() !== '' && this.amount < 1000000;
    }

}
