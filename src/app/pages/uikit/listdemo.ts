import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { Product, ProductService } from '../service/product.service';
import { AItrading } from '../service/aitrading';

interface AITradingData {
    period: string;
    amount: string;
    daily_roi: string;
}

const aitradingData: AITradingData[] = [
    { period: '5 Day AI Trade', amount: '2,000 - 10,000 USDT', daily_roi: '0.6%' },
    { period: '15 Day AI Trade', amount: '10,000 - 50,000 USDT', daily_roi: '0.9%' },
    { period: '30 Day AI Trade', amount: '50,000 - 100,000 USDT', daily_roi: '1.2%' },
    { period: '60 Day AI Trade', amount: '100,000 - 200,000 USDT', daily_roi: '1.5%' },
    { period: '120 Day AI Trade', amount: '200,000 - 500,000 USDT', daily_roi: '2.2%' },
]
@Component({
    selector: 'app-list-demo',
    standalone: true,
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule],
    templateUrl: './listdemo.html',
    styles: `
        ::ng-deep {
            .p-orderlist-list-container {
                width: 100%;
            }
        }
    `,
    providers: [ProductService]
})
export class ListDemo {
    aitradingData: AITradingData[] = [];
      // Crypto coin images - you can replace these with actual image paths
      cryptoCoins = [
        { name: 'ETH', image: 'assets/demo/images/deposit/ETH.png' },
        { name: 'BTC', image: 'assets/demo/images/deposit/BTC.png' },
        { name: 'BNB', image: 'assets/demo/images/deposit/BNB.png' },
        { name: 'USDT', image: 'assets/demo/images/deposit/USDT.png' },
        { name: 'SOL', image: 'assets/demo/images/deposit/SOL.png' },
        { name: 'XRP', image: 'assets/demo/images/deposit/XRP.png' }
    ]; 
 

    constructor() {}

    ngOnInit() {
        this.aitradingData = aitradingData;
    }
     // Get number of images for each card: 1, 3, 4, 5, 6
     getImageCount(index: number): number {
        const counts = [1, 3, 4, 5, 6];
        return counts[index] || 1;
    }

    // Get images to display for a specific card
    getImagesForCard(index: number) {
        const count = this.getImageCount(index);
        return this.cryptoCoins.slice(0, count);
    }

}
