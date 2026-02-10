import { Component,OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { HighlightsWidget } from './components/highlightswidget';
import { PricingWidget } from './components/pricingwidget';
import { FooterWidget } from './components/footerwidget';
import { DashboardCoin, DashboardData } from '../service/dashboard-data';
import { RecentSalesWidget } from '../dashboard/components/recentsaleswidget';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, HeroWidget, FeaturesWidget, HighlightsWidget, PricingWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule,RecentSalesWidget],
    templateUrl: './landing.html'
})
export class Landing implements OnInit, OnDestroy {
    private clickHandler?: (event: MouseEvent) => void;
    dashboardDatas: DashboardCoin[] = [];
    constructor(private dashboardData: DashboardData) {}

    ngOnInit() {
        this.dashboardData.getDashboardData().subscribe({
            next: (response) => {
                this.dashboardDatas = response.dashboardData;
                console.log(response);
            },
            error: (error) => {
                console.error(error);
            }
        });
        // Add global click handler for anchor links with hash fragments
        this.clickHandler = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
            
            if (anchor && anchor.hash) {
                const sectionId = anchor.hash.substring(1); // Remove the # symbol
                if (sectionId && document.getElementById(sectionId)) {
                    event.preventDefault();
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        };

        document.addEventListener('click', this.clickHandler);
    }

    ngOnDestroy() {
        if (this.clickHandler) {
            document.removeEventListener('click', this.clickHandler);
        }
    }
}
