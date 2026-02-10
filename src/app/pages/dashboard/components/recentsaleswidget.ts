import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DashboardCoin, DashboardData } from '../../service/dashboard-data';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule,ChartModule],
    templateUrl: './recentsaleswidget.html'
})
export class RecentSalesWidget implements OnInit {
    coins: DashboardCoin[] = [];

    sparklineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      };
    @Input() dashboardDatas: DashboardCoin[] = [];

    constructor(private dashboardData: DashboardData) {}

    ngOnInit(): void {
      const cachedData = localStorage.getItem('dashboardDatas');
      if (cachedData) {
          try {
              const parsedData = JSON.parse(cachedData);
              if (Array.isArray(parsedData) && parsedData.length > 0) {
                  this.coins = parsedData;
              }
          } catch (e) {
              console.error('Error parsing cached data:', e);
          }
      }

      // If input data is already available, use it (will be handled by ngOnChanges too)
      if (this.dashboardDatas && Array.isArray(this.dashboardDatas) && this.dashboardDatas.length > 0) {
          this.coins = this.dashboardDatas;
      }
    }
    ngOnChanges() {
         // When new data arrives from parent, save to localStorage and update display
         if (this.dashboardDatas && Array.isArray(this.dashboardDatas) && this.dashboardDatas.length > 0) {
          console.log(this.dashboardDatas);
          // Save to localStorage
          localStorage.setItem('dashboardDatas', JSON.stringify(this.dashboardDatas));
          // Update display
          this.coins = this.dashboardDatas;
      } else {
          this.coins = [];
      }
    }
    

    getSparklineData(prices: number[]) {
        return {
          labels: prices.map((_, i) => i),
          datasets: [
            {
              data: prices,
              fill: false,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            }
          ]
        };
      }
      
}
