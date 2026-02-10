import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiservice } from '@/service/apiservice';

// One coin item from the dashboard API
export interface DashboardCoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    market_cap_rank: number;
}

// Full response shape from `/api/user/dashboard`
export interface DashboardResponse {
    success: boolean;
    message: string;
    dashboardData: DashboardCoin[];
}

@Injectable({
    providedIn: 'root'
})
export class DashboardData {
    constructor(private apiService: Apiservice) {}

    /**
     * GET dashboard data from backend.
     * Backend URL: http://localhost:8000/api/user/dashboard
     */
    getDashboardData(): Observable<DashboardResponse> {
        return this.apiService.get<DashboardResponse>('user/dashboard');
    }
}