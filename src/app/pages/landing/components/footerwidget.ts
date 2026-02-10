import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    imports: [RouterModule],
    templateUrl:"./footerwidget.html"
})
export class FooterWidget {
    constructor(public router: Router) {}

    scrollToSection(event: Event, sectionId: string): void {
        event.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    handleAnchorClick(event: Event): void {
        const target = event.target as HTMLAnchorElement;
        if (target && target.hash) {
            const sectionId = target.hash.substring(1); // Remove the # symbol
            if (sectionId) {
                this.scrollToSection(event, sectionId);
            }
        }
    }
}
