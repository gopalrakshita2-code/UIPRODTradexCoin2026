import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Built with precision by
        <a routerLink="/auth/login" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">TradexCoin</a>
          — Smart AI Trading Platform
    </div>`

})
export class AppFooter {}
