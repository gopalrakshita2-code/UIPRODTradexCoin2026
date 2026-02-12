import { Component,OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { DashboardData } from '../service/dashboard-data';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget,NotificationsWidget],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
    dashboardDatas: any[] = [];

    constructor(private dashboardData: DashboardData){

    }
    ngOnInit() {
        this.gettableData();
    }
    gettableData() {
        this.dashboardData.getData().subscribe({
          next: (res) => {
             this.dashboardDatas = res;
         },
         error: (err) => {
         console.warn('API error:', err);
         }
                 });
      }
}
