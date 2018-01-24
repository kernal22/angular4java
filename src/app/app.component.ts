import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-my-app',
    styleUrls: ['./app.component.css' ],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    constructor() {}

    ngOnInit() {

        $.material.init();
        
    }
}
