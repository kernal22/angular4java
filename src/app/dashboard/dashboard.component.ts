import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ApiService } from '../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../shared/service/api/tokenExpiry.service';
import { CommonService } from '../shared/service/common/common.service';
import  cc from '../../assets/scripts/countries.json';
import swal from 'sweetalert2';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import {TimerObservable} from "rxjs/observable/TimerObservable";

declare const $: any;

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  public tableData: TableData;
  public tableData2: string[];
  public membersData;
  public referralData;
  public socialData;
  public profileData;
  public allIncomes;
  public allWallets;
  public profilePics: string[];
  public celebPics: string[];
  public chosen: boolean = false;
  public chosenpic: string;
  public chosenPrev: string;
  public data: any;

  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  url: string;
  location: Location;
  

  constructor(
    private api: ApiService,
    private router: Router,
    private tokenExpService: TokenExpiryService,
    public common: CommonService,
    location: Location
  ){
    this.location = location;
  }

  public ngOnInit() {

      var t = this;

      let i;
      t.profilePics = [];
      for(i=1;i<=8;i++){
        t.profilePics.push('i'+i);
      }

      t.celebPics = [];
      for(i=1;i<=8;i++){
        t.celebPics.push(''+i);
      }

      const signUps = <HTMLElement>document.querySelector('#style-3');
      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             }
             else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           signUps.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(signUps);
      }

      t.api.get('/user/dashboard-cards').subscribe(data=>{

        t.data = data.data;

        t.membersData = [
          { logo: 'perm_identity', class: 'material-icons', title: 'Direct Referrals', value: t.data["tot-direct"], color: 'orange' },
          { logo: 'subdirectory_arrow_left', class: 'material-icons', title: 'Left Members', value: t.data["tot-left"], color: 'rose' },
          { logo: 'subdirectory_arrow_right', class: 'material-icons', title: 'Right Members', value: t.data["tot-right"], color: 'green' },
          { logo: '', class: 'fa fa-sitemap', title: 'All Downline', value: t.data["tot-downline"], color: 'blue' }
        ];

        t.api.get('/user/dashboard-all-income').subscribe(data=>{

          t.data = data.data;

          t.allIncomes = [
            {logo: 'account_balance_wallet', class: 'material-icons', title: 'Manager Income', value: (t.data["manager-income"]).toLocaleString('en'), color: 'rose'},
            {logo: 'pan_tool', class: 'material-icons', title: 'Binary Income', value: (t.data["binary-income"]).toLocaleString('en'), color: 'blue'},
            {logo: 'account_balance', class: 'material-icons', title: 'Royalty Income', value: (t.data["royalty-income"]).toLocaleString('en'), color: 'purple'},
            {logo: 'card_travel', class: 'material-icons', title: 'Direct Income', value: (t.data["direct-income"]).toLocaleString('en'), color: 'green'},
            {logo: 'trending_up', class: 'material-icons', title: 'Booster Binary Income', value: (t.data["booster-binary-income"]).toLocaleString('en'), color: ''}
          ];

          t.api.get('/user/dashboard-wallet-balance').subscribe(data=>{

            t.data = data.data;

            t.allWallets = [
              { img: 'wallet_1', title: 'Trading Wallet', value: (t.data["fund-wallet"]).toLocaleString('en'), color: 'green' },
              { img: 'wallet_2', title: 'Incentive Wallet', value: (t.data["incentive-wallet"]).toLocaleString('en'), color: 'orange' },
              { img: 'wallet_3', title: 'Purchase Wallet', value: (t.data["purchase-wallet"]).toLocaleString('en'), color: 'red' }
            ];

            t.api.get('/user/me').subscribe(data=>{

              t.data = data.data;
              let country = cc.find(data => t.data.country === data.code)

              t.profileData = {
                name: t.data.membername,
                userId: t.data.memberid,
                doj: t.data.doj.substr(4, 11),
                sponsorId: t.data.introid,
                package: t.data.packagename,
                profilepic: t.data.profileimg,
                country: country.name,
                contact: t.data.mobile,
                reflink1: t.data.reflink1,
                reflink2: t.data.reflink2
              };

              t.api.get('/user/dashboard-latest-signups').subscribe(data=>{

                t.data = data.data;
                let rowArr = [];

                t.data.forEach(function(item){
                  rowArr.push((<any>Object).values(item));
                });

                t.tableData2 = Object.keys(t.data[0]);  //only header

                t.tableData = {
                  /*headerRow: Object.keys(t.data[0]),
                  footerRow: null,*/
                  dataRows: rowArr
                };
              });
            });
          });
        });
      }, err=>{
          this.tokenExpService.isTokenValid();
      });
   }

   ngAfterViewInit() {
       const breakCards = true;
       if (breakCards === true) {
           // We break the cards headers if there is too much stress on them :-)
           $('[data-header-animation="true"]').each(function(){
               const $fix_button = $(this);
               const $card = $(this).parent('.card');
               $card.find('.fix-broken-card').click(function(){
                   const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                   $header.removeClass('hinge').addClass('fadeInDown');

                   $card.attr('data-count', 0);

                   setTimeout(function(){
                       $header.removeClass('fadeInDown animate');
                   }, 480);
               });

               $card.mouseenter(function(){
                   const $this = $(this);
                   const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                   $this.attr('data-count', hover_count);
                   if (hover_count >= 20) {
                       $(this).children('.card-header, .card-image').addClass('hinge animated');
                   }
               });
           });
       }
   }

   copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  chosePic(pic){
    var t = this;
    t.chosen = true;
    t.chosenPrev = t.chosenpic;
    t.chosenpic = pic;
    $("#img-"+pic).css({"transform": "scale(1.1, 1.1)", "z-index": 2, "border-color": "#000"});
    $("#img-"+t.chosenPrev).css({"transform": "scale(1,1)", "z-index": 1, "border-color": "#ddd"}); 
  }

  savePic(){
    var t = this;
    console.log(t.chosenpic);
    t.api.post('/profile/setprofileimg', {profileimg: t.chosenpic}).subscribe(data=>{
      t.data = data;
      if(t.data.status === 'success'){
        $('#myModal').modal("hide");
        t.common.pic = t.chosenpic;
        t.profileData.profilepic = t.chosenpic;
        swal({
            type: 'success',
            title: 'Success!',
            text: t.data.data,
            buttonsStyling: false,
            showConfirmButton: false,
            timer: 1500
        }).catch(swal.noop);
      }
    }, err=>{
        this.tokenExpService.isTokenValid();
    });
  }

  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}
