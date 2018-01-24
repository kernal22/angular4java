import { Component, OnInit, OnDestroy, Renderer, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { DomAdapter, getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { CommonService } from '../service/common/common.service';
import { AuthService } from '../service/authservice/authservice.service';
import { Subscription } from 'rxjs/Subscription';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { ApiService } from '../service/api/apiservice.service';
import { TokenExpiryService } from '../service/api/tokenExpiry.service';

const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public _min: number = 0;
    public _sec: number = 0;
    private subscription: Subscription;
    public _btc: number;
    public _eth: number;

    @ViewChild('app-navbar-cmp') button: any;

    constructor(
        location: Location,
        private renderer: Renderer,
        private element: ElementRef,
        private authService: AuthService,
        public common: CommonService,
        public api: ApiService,
        public router: Router,
        private tokenExpService: TokenExpiryService
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        let timer = TimerObservable.create(2000, 1000);
        this.subscription = timer.subscribe(t => {
            let tt = 5*60 - t;
            this._sec = tt % 60;
            this._min = Math.floor(tt/60);
            if(tt === 0){
              this.stopTimer();
              // $('.timer h3').fadeOut(500);
              this.api.post('/profile/updatetaskstatus', {tasktoken: this.common.taskToken}).subscribe(data=>{
                console.log(data);
              })
            }
        });
        
        this.api.get('/user/me').subscribe(data=>{
            if(!data.data.memberid){
                return this.router.navigate(['/login']);
            }
            this.common.user = data.data.membername;
            this.common.pic = data.data.profileimg;
            this.common.taskToken = data.data.tasktoken;

            if(data.data.taskstatus !== "1"){
                this.stopTimer();
                $('.timer').hide();
                console.log(data.data.taskstatus);
                console.log(this.common.pic);
            }

            this.api.get('/getbtctousd').subscribe(data=>{
                this._btc = data.data;
                this.api.get('/getethtousd').subscribe(data=>{
                    this._eth = data.data;
                });
            });
        }, err=>{
            this.tokenExpService.isTokenValid();
        });
            

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        //console.log(this.listTitles);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if ($('body').hasClass('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if ($('body').hasClass('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        $('#minimizeSidebar').click(function() {
            if (misc.sidebar_mini_active === true) {
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;

            } else {
                setTimeout(function() {
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            const simulateWindowResize = setInterval(function() {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function() {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
        $('#hideSidebar').click(function() {
            if (misc.hide_sidebar_active === true) {
                setTimeout(function() {
                    $('body').removeClass('hide-sidebar');
                    misc.hide_sidebar_active = false;
                }, 300);
                setTimeout(function () {
                    $('.sidebar').removeClass('animation');
                }, 600);
                $('.sidebar').addClass('animation');

            } else {
                setTimeout(function() {
                    $('body').addClass('hide-sidebar');
                    // $('.sidebar').addClass('animation');
                    misc.hide_sidebar_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            const simulateWindowResize = setInterval(function() {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function() {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
    }

    stopTimer(){
        this.subscription.unsubscribe();
    }

    onLogout() {
        // alert("hiiii");
        this.authService.onLogout();

    }

    onResize(event) {
      if ($(window).width() > 991) {
        return false;
      }
      return true;
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        let titlee: any = this.location.prepareExternalUrl(this.location.path()).replace("#", '');
        for (let i = 0; i < this.listTitles.length; i++) {
            if (this.listTitles[i].type === "link" && this.listTitles[i].path === titlee) {
                return this.listTitles[i].title;
            } else if (this.listTitles[i].type === "sub") {
                for (let j = 0; j < this.listTitles[i].children.length; j++) {
                    let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                    if (subtitle === titlee) {
                        return this.listTitles[i].children[j].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }
    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

    ngOnDestroy(){
        this.stopTimer();
    }
}
