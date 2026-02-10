import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';


@Component({
    selector: 'app-media-demo',
    standalone: true,
    imports: [CommonModule, ImageModule ],
    templateUrl: './mediademo.html',
    providers: [ ]
})
export class MediaDemo implements OnInit {


    images!: any[];





    constructor(
       
    ) {}

    ngOnInit() {
    
    }

  
}
