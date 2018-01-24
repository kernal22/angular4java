import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { Router } from '@angular/router';
import { ApiService } from '../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../shared/service/api/tokenExpiry.service';
import { CommonService } from '../shared/service/common/common.service';
import { AuthService } from '../shared/service/authservice/authservice.service';
declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/package',
        title: 'Package',
        type: 'sub',
        icontype: 'insert_chart',
        collapse: 'package',
        children: [
            { path: 'upgrade-package', title: 'Upgrade Package' },      
            { path: 'upgrade-details', title: 'Upgrade Details' }
        ]
    },
    {
        path: '/profile',
        title: 'Profile',
        type: 'sub',
        icontype: 'person_outline',
        collapse: 'profile',
        children: [
            { path: 'edit-profile', title: 'Your Profile' },
            { path: 'change-password', title: 'Change Password' },
            { path: 'update-wallet-address', title: 'Update Wallet Address' }
        ]
    },
    {
        path: '/networks',
        title: 'Networks',
        type: 'sub',
        icontype: 'group',
        collapse: 'networks',
        children: [
            { path: 'genealogy-tree', title: 'Genealogy Tree' },
            { path: 'referrals', title: 'Referrals' },
            { path: 'downline', title: 'Downline' },
            { path: 'left-users', title: 'Left Users' },
            { path: 'right-users', title: 'Right Users' }
        ]
    },
    {
        path: '/my-wallet',
        title: 'Wallet',
        type: 'sub',
        icontype: 'account_balance_wallet',
        collapse: 'my-wallet',
        children: [
            { path: 'transactions', title: 'Transactions' },
            { path: 'withdraw', title: 'Withdraw' },
            //{ path: 'transfer-wallet', title: 'Wallet Transfer' }, 
            
        ]
    },
    /*{
        path: '/e-pins',
        title: 'E-Pins',
        type: 'sub',
        icontype: 'map',
        collapse: 'e-pins',
        children: [
            { path: 'purchase-e-pin', title: 'Purchase E-Pin' },
            { path: 'transfer-e-pin', title: 'Transfer E-Pin' },
            { path: 'purchase-e-pin-report', title: 'Purchase E-Pin Report' },
            { path: 'e-pin-request-status', title: 'E-Pin Request Status' }
        ]
    },*/
    {
        path: '/purchase-wallet',
        title: 'Purchase Wallet',
        type: 'sub',
        icontype: 'card_travel',
        collapse: 'purchase-wallet',
        children: [
            { path: 'add-fund', title: 'Add Fund' },
            { path: 'add-fund-history', title: 'Add Fund History' },
            { path: 'transactions', title: 'Transactions' },
            { path: 'transfer-to-purchase-wallet', title: 'Transfer To Purchase Wallet' }
        ]
    },
    {
        path: '/promotion',
        title: 'Promotion',
        type: 'link',
        icontype: 'share'
    },
    {
        path: '/profit-share',
        title: 'Profit Share',
        type: 'sub',
        icontype: 'show_chart',
        collapse: 'profit-share',
        children: [
            { path: 'daily-profit', title: 'Daily Profit' },
            { path: 'direct-profit', title: 'Direct Profit' },
            { path: 'binary-profit', title: 'Binary Profit' },
            { path: 'booster-binary-profit', title: 'Booster Binary Profit' }
        ]
    },
    {
        path: '/profit-calculator',
        title: 'Profit Calculator',
        type: 'link',
        icontype: 'keyboard'
    },
    {
        path: '/support',
        title: 'Support',
        type: 'sub',
        icontype: 'show_chart',
        collapse: 'support',
        children: [
            { path: 'submit-query', title: 'Submit Query' },
            { path: 'ticket-summary', title: 'Ticket Summary' },
            { path: 'timeline', title: 'Timeline' }
        ]
    }
];


@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    user: string;
    pic: string;

    constructor( private router: Router, private api: ApiService,
        private tokenExpService: TokenExpiryService,
        public common: CommonService,
        private authService: AuthService
        ){}

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        /*this.api.get('/user/me').subscribe(
                                data=> {
                                    if(!data.data.memberid){
                                        return this.router.navigate(['/login']);
                                    }
                                    this.user = data.data.membername;
                                    this.common.pic = data.data.profileimg;
                                    this.common.taskStatus = data.data.taskstatus;
                                    this.common.taskToken = data.data.tasktoken;
                                }, err=>{
                                      this.tokenExpService.isTokenValid();
                                  });*/
    }

    updatePS(target): void  {
        if(!$("#"+target).hasClass("in")){
            $("a.cool:not(a.collapse)").attr("aria-expanded", false);
            $(".collapse.in").attr("aria-expanded", false).removeClass("in");
        }
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    onLogout(){
        this.authService.onLogout();
    }
}
