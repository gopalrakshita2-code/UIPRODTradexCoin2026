import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { Router, RouterModule } from '@angular/router';

declare const TradingView: any;

@Component({
    selector: 'app-panels-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        InputNumberModule,
        DialogModule,
        RouterModule
    ],
    templateUrl: './panelsdemo.html'
})
export class PanelsDemo implements AfterViewInit, OnDestroy {
    @Input() symbol: string = 'BINANCE:BTCUSDT'; // Default to Bitcoin
    @Input() interval: string = 'D'; // D, W, M, 1, 5, 15, 30, 60, 240
    @Input() theme: 'light' | 'dark' = 'dark';
    @Input() height: number = 300;
    @Input() title: string = 'Trading Chart';

    containerId: string = `tradingview_${Math.random().toString(36).substring(2, 11)}`;
    private scriptLoaded: boolean = false;
    private widgetInstance: any = null;
    
    currentSymbol: string = this.symbol;
    currentInterval: string = this.interval;
    
    // Card selection (default to first card - 60 seconds)
    selectedCardIndex: number = 0;
    
    // Input fields
    amount: string = '';
    expectedReturn: string = '$0.00';
    amountError: string = '';
    
    // Dialog
    showSuccessDialog: boolean = false;
    
    coins = [
        { label: 'BTC', value: 'BINANCE:BTCUSDT' },
        { label: 'ETH', value: 'BINANCE:ETHUSDT' },
        { label: 'LTC', value: 'BINANCE:LTCUSDT' },
        { label: 'SUI', value: 'BINANCE:SUIUSDT' },
        { label: 'BNB', value: 'BINANCE:BNBUSDT' },
        { label: 'SOL', value: 'BINANCE:SOLUSDT' },
        { label: 'XRP', value: 'BINANCE:XRPUSDT' },
        { label: 'DOGE', value: 'BINANCE:DOGEUSDT' }
    ];
    
    returnCards = [
        { time: '60 Seconds', return: '10.00%', min: 1000, max: 20000, returnPercent: 10 },
        { time: '90 Seconds', return: '20.00%', min: 20000, max: 60000, returnPercent: 20 },
        { time: '120 Seconds', return: '30.00%', min: 60000, max: 120000, returnPercent: 30 },
        { time: '180 Seconds', return: '40.00%', min: 120000, max: 180000, returnPercent: 40 }
    ];

    constructor(private router: Router) {}

    ngAfterViewInit(): void {
        this.currentSymbol = this.symbol;
        this.currentInterval = this.interval;
        this.loadTradingViewScript();
    }

    getCurrentBalance(): number {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return 0;
        }

        try {
            const parsed = JSON.parse(storedUser);
            const user = parsed?.data?.user ?? parsed?.user ?? parsed;
            return Number(user?.balance ?? 0);
        } catch {
            return 0;
        }
    }

    selectCard(index: number): void {
        this.selectedCardIndex = index;
        this.amount = '';
        this.expectedReturn = '$0.00';
        this.amountError = '';
    }

    onAmountChange(): void {
        this.amountError = '';
        
        if (!this.amount || this.amount.trim() === '') {
            this.expectedReturn = '$0.00';
            return;
        }

        // Remove any non-numeric characters except decimal point
        const numericValue = this.amount.replace(/[^0-9.]/g, '');
        
        if (!numericValue || isNaN(parseFloat(numericValue))) {
            this.expectedReturn = '$0.00';
            return;
        }

        const amountNum = parseFloat(numericValue);
        const selectedCard = this.returnCards[this.selectedCardIndex];
        
        // Validate amount range
        if (amountNum < selectedCard.min || amountNum > selectedCard.max) {
            this.amountError = `Amount must be between ${selectedCard.min.toLocaleString()} and ${selectedCard.max.toLocaleString()}`;
            this.expectedReturn = '$0.00';
            return;
        }

        // Calculate expected return: amount / 10 = dollar amount
        const dollarAmount = amountNum / 10;
        
        // Calculate return based on percentage
        const returnAmount = (dollarAmount * selectedCard.returnPercent) / 100;
        const totalReturn = dollarAmount + returnAmount;
        
        this.expectedReturn = `$${totalReturn.toFixed(2)}`;
        this.amountError = '';
    }

    checkBalanceAndTrade(direction: 'up' | 'down'): void {
        const currentBalance = this.getCurrentBalance();
        
        // If no balance, clear both fields
        if (!currentBalance || currentBalance === 0) {
            this.amount = '';
            this.expectedReturn = '';
            this.amountError = 'No balance available';
            return;
        }

        if (!this.amount || this.amount.trim() === '') {
            this.amountError = 'Please enter an amount';
            return;
        }

        // Remove any non-numeric characters except decimal point
        const numericValue = this.amount.replace(/[^0-9.]/g, '');
        
        if (!numericValue || isNaN(parseFloat(numericValue))) {
            this.amountError = 'Please enter a valid amount';
            return;
        }

        const amountNum = parseFloat(numericValue);
        const selectedCard = this.returnCards[this.selectedCardIndex];

        // Validate amount is within the selected card's range
        if (amountNum < selectedCard.min || amountNum > selectedCard.max) {
            this.amountError = `Amount must be between ${selectedCard.min.toLocaleString()} and ${selectedCard.max.toLocaleString()}`;
            return;
        }

        // Check if balance is sufficient for the trade
        // Balance should be >= minimum required for the card AND >= entered amount
        if (currentBalance >= selectedCard.min && currentBalance >= amountNum) {
            // Show success dialog
            this.showSuccessDialog = true;
            this.amountError = '';
        } else if (currentBalance < selectedCard.min) {
            this.amountError = `Insufficient balance. Minimum required: ${selectedCard.min.toLocaleString()}, Your balance: ${currentBalance.toLocaleString()}`;
        } else if (currentBalance < amountNum) {
            this.amountError = `Insufficient balance. Required: ${amountNum.toLocaleString()}, Your balance: ${currentBalance.toLocaleString()}`;
        }
    }


    onUpClick(): void {
        this.checkBalanceAndTrade('up');

    }

    onDownClick(): void {
        this.checkBalanceAndTrade('down');
    }

    closeSuccessDialog(): void {
        this.showSuccessDialog = false;
        this.router.navigate(['/app/dashboard']);
        // Clear both fields after successful trade
        this.amount = '';
        this.expectedReturn = '';
        this.amountError = '';
    }

    changeSymbol(symbol: string): void {
        if (this.currentSymbol === symbol) {
            return; // Already selected
        }
        
        this.currentSymbol = symbol;
        this.initWidget();
    }

    changeInterval(interval: string): void {
        if (this.currentInterval === interval) {
            return; // Already selected
        }
        
        this.currentInterval = interval;
        this.initWidget();
    }

    private loadTradingViewScript(): void {
        // Check if script already exists
        if (document.getElementById('tradingview-widget-script')) {
            this.initWidget();
            return;
        }

        const script = document.createElement('script');
        script.id = 'tradingview-widget-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            this.scriptLoaded = true;
            this.initWidget();
        };
        script.onerror = () => {
            console.error('Failed to load TradingView script');
        };

        document.head.appendChild(script);
    }

    private initWidget(): void {
        if (typeof TradingView === 'undefined') {
            console.error('TradingView is not loaded');
            return;
        }

        // Wait a bit for the container to be ready
        setTimeout(() => {
            const container = document.getElementById(this.containerId);
            if (!container) {
                console.error('Container not found:', this.containerId);
                return;
            }

            // Clear any existing widget
            container.innerHTML = '';

            this.widgetInstance = new TradingView.widget({
                container_id: this.containerId,
                symbol: this.currentSymbol,
                interval: this.currentInterval,
                timezone: 'Etc/UTC',
                theme: this.theme,
                style: '1',
                locale: 'en',
                toolbar_bg: '#f1f3f6',
                enable_publishing: false,
                hide_top_toolbar: false,
                save_image: false,
                height: this.height,
                width: '100%',
                autosize: true
            });
        }, 100);
    }

    ngOnDestroy(): void {
        // Clean up widget instance if needed
        if (this.widgetInstance) {
            const container = document.getElementById(this.containerId);
            if (container) {
                container.innerHTML = '';
            }
        }
    }
}