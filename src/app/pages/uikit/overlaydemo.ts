import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DashboardData } from '../service/dashboard-data';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-overlay-demo',
    standalone: true,
    imports: [CommonModule, TableModule],
    templateUrl: './overlaydemo.html'
})
export class OverlayDemo implements OnInit, OnDestroy {
    tradeHistory: any[] = [];
    private subscription?: Subscription;

    constructor(
        private dashboardData: DashboardData
    ) {}

    ngOnInit(){
        // Subscribe to trade history observable
        this.subscription = this.dashboardData.tradeHistory$.subscribe((data) => {
            if (data) {
                // Extract tradeHistory array from response
                this.tradeHistory = data?.tradeHistory || [];
            }
        });
        
        // Fetch trade history from API
        this.getTradeHistory();
    }

    getTradeHistory() {
        const user = localStorage.getItem('user');
        if (!user) return;
        
        try {
            const userData = JSON.parse(user);
            const userEmail = userData?.data?.user?.email || userData?.user?.email;
            
            if (userEmail) {
                this.dashboardData.getTradeHistory(userEmail).subscribe({
                    next: (res) => {
                        console.log("trade history", res);
                        // Data will be automatically updated via subscription
                    },
                    error: (err) => {
                        console.warn('Error fetching trade history:', err);
                    }
                });
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}