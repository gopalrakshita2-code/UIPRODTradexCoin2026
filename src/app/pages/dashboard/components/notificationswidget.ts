import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule , RouterModule],
    templateUrl:"./notificationswidget.html"
})
export class NotificationsWidget {
    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
    constructor(public router: Router) {}
    goToSupport(){
        this.router.navigate(['/app/page/input']);
    }
    goToDeposit(){
        this.router.navigate(['/app/page/button']);
    }
    goToEvents(){
        this.router.navigate(['/app/page/tree']);
    }
    goToWithdraw(){
        this.router.navigate(['/app/page/table']);
    }
}
