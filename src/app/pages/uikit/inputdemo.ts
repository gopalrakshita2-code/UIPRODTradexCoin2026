import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import {AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageService, TreeNode } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Country } from '../service/customer.service';

@Component({
    selector: 'app-input-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        SelectButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        AutoCompleteModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        InputGroupAddonModule,
        TextareaModule
    ],
    templateUrl:"./inputdemo.html",
    providers: [MessageService]
})
export class InputDemo  {
    fullName = '';
    email = '';
    message = '';
    whatsappNumber = '13022139766';

    constructor(private service: MessageService) {}



    multiselectSelectedCountries!: Country[];

    toggleValue: boolean = false;

    selectButtonValue: any = null;



 
    ngOnInit() {
    
    }
    isFormValid(): boolean {
        return this.fullName.trim() !== '' && 
               this.email.trim() !== '' && 
               this.message.trim() !== '';
    }
    showSuccessViaToast() {
        if (this.isFormValid()) {
            this.service.add({ severity: 'success', summary: 'Request Submitted', detail: 'Your support request has been sent successfully.' });
            // Reset form after submission
            this.fullName = '';
            this.email = '';
            this.message = '';
        }
    }
     openWhatsApp() {
        // Remove all non-numeric characters (spaces, +, dashes, etc.)
        const cleanNumber = this.whatsappNumber.replace(/\D/g, '');
        const message = encodeURIComponent('Hi, I have a query related to your platform. Shall we connect?');
        
        // Use api.whatsapp.com which works on both iOS and Android
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${message}`;
        
        // Use location.href instead of window.open for better iOS compatibility
        window.location.href = whatsappUrl;
    }
}
