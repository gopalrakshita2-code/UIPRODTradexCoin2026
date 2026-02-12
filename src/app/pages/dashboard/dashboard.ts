import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { DashboardData } from '../service/dashboard-data';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, NotificationsWidget],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
    dashboardDatas: any[] = [];
    selectedCoinSymbol: string = 'BINANCE:BTCUSDT'; // Default symbol

    constructor(private dashboardData: DashboardData) {}

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

    // Method to convert coin symbol to TradingView format
    getTradingViewSymbol(coinId: string, symbol: string): string {
        // Map common crypto symbols to TradingView format
        const symbolMap: { [key: string]: string } = {
            'btc': 'BINANCE:BTCUSDT',
            'eth': 'BINANCE:ETHUSDT',
            'bnb': 'BINANCE:BNBUSDT',
            'sol': 'BINANCE:SOLUSDT',
            'xrp': 'BINANCE:XRPUSDT',
            'doge': 'BINANCE:DOGEUSDT',
            'trx': 'BINANCE:TRXUSDT',
            'usdt': 'BINANCE:USDTUSDT',
            'usdc': 'BINANCE:USDCUSDT'
        };
        
        return symbolMap[symbol.toLowerCase()] || `BINANCE:${symbol.toUpperCase()}USDT`;
    }
}