import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    templateUrl: './statswidget.html'
})
export class StatsWidget implements OnInit {
    balance = 0;
    totalDeposit = 0;
    totalWithdrawal = 0;
    todayPnl = 0;
    todayGain = 0;

    ngOnInit(): void {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            return;
        }

        try {
            const parsed = JSON.parse(storedUser);
            // Support both { data: { user } } and plain { user } shapes
            const user = parsed?.data?.user ?? parsed?.user ?? parsed;

            this.balance = Number(user?.balance ?? 0);
            this.totalDeposit = Number(user?.totalDeposit ?? 0);
            this.totalWithdrawal = Number(user?.totalWithdrawal ?? 0);
            this.todayPnl = Number(user?.todayPnl ?? 0);
            this.todayGain = Number(user?.todayGain ?? 0);
        } catch {
            // If parsing fails, keep default zero values
        }
    }
}
