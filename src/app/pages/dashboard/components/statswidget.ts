import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardData } from '../../service/dashboard-data';
import { Subscription } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    templateUrl: './statswidget.html'
})
export class StatsWidget implements OnInit, OnDestroy {
    balance = 0;
    totalDeposit = 0;
    totalWithdrawal = 0;
    todayPnl = 0;
    todayGain = 0;
    private subscription?: Subscription;

    constructor(private dashboardData: DashboardData) {}

    ngOnInit(): void {
        // Subscribe to user data from API via BehaviorSubject
        this.subscription = this.dashboardData.userData$.subscribe((userData) => {
            if (userData) {
                // Handle different response structures
                const data = userData?.data || userData;
                const user = data?.user || data;

                this.balance = Number(user?.balance ?? 0);
                this.totalDeposit = Number(user?.totalDeposit ?? 0);
                this.totalWithdrawal = Number(user?.totalWithdrawal ?? 0);
                this.todayPnl = Number(user?.todayPnl ?? 0);
                this.todayGain = Number(user?.todayGain ?? 0);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}