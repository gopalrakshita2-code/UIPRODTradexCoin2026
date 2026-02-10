import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AItrading {
  getAItradingData() {
    return [
      {
        period: '5 Day AI Trade',
        amount: '2,000 - 10,000 USDT',
        daily_roi: '0.6%'
      },
      {
        period: '15 Day AI Trade',
        amount: '10,000 - 50,000 USDT',
        daily_roi: '0.9%'
      },
      {
        period: '30 Day AI Trade',
        amount: '50,000 - 100,000 USDT',
        daily_roi: '1.2%'
      },
      {
        period: '60 Day AI Trade',
        amount: '100,000 - 200,000 USDT',
        daily_roi: '1.5%'
      },
      {
        period: '120 Day AI Trade',
        amount: '200,000 - 500,000 USDT',
        daily_roi: '2.2%'
      },
    ]
}
}
