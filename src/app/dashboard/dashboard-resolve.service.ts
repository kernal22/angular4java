/*import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../shared/service/api/apiservice.service';
import { TableData } from '../md/md-datatable/md-datatable.component';

@Injectable()
export class DashboardResolve implements Resolve<any> {

  public dashboard;
  public tableData: TableData;

  public data: any;

  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot) {

  	var t = this;
  	t.dashboard = {};
  	t.api.get('/user/dashboard-cards').subscribe(data=>{

        t.data = data.data;

        t.dashboard.membersData = [
          { logo: 'perm_identity', class: 'material-icons', title: 'Direct Referrals', value: t.data["tot-direct"], color: 'orange' },
          { logo: 'subdirectory_arrow_left', class: 'material-icons', title: 'Left Members', value: t.data["tot-left"], color: 'rose' },
          { logo: 'subdirectory_arrow_right', class: 'material-icons', title: 'Right Members', value: t.data["tot-right"], color: 'green' },
          { logo: '', class: 'fa fa-sitemap', title: 'All Downline', value: t.data["tot-downline"], color: 'blue' }
        ];

        t.api.get('/user/dashboard-all-income').subscribe(data=>{

          t.data = data.data;

          t.dashboard.allIncomes = [
            {logo: 'account_balance_wallet', class: 'material-icons', title: 'Manager Income', value: (t.data["manager-income"]).toLocaleString('en'), color: 'rose'},
            {logo: 'pan_tool', class: 'material-icons', title: 'Binary Income', value: (t.data["binary-income"]).toLocaleString('en'), color: 'blue'},
            {logo: 'account_balance', class: 'material-icons', title: 'Royalty Income', value: (t.data["royalty-income"]).toLocaleString('en'), color: 'purple'},
            {logo: 'card_travel', class: 'material-icons', title: 'Direct Income', value: (t.data["direct-income"]).toLocaleString('en'), color: 'green'},
            {logo: 'trending_up', class: 'material-icons', title: 'Booster Binary Income', value: (t.data["booster-binary-income"]).toLocaleString('en'), color: ''}
          ];

          t.api.get('/user/dashboard-wallet-balance').subscribe(data=>{

            t.data = data.data;

            t.dashboard.allWallets = [
              { img: 'wallet_1', title: 'Fund Wallet', value: (t.data["fund-wallet"]).toLocaleString('en'), color: 'green' },
              { img: 'wallet_2', title: 'Incentive Wallet', value: (t.data["incentive-wallet"]).toLocaleString('en'), color: 'orange' },
              { img: 'wallet_3', title: 'Purchase Wallet', value: (t.data["purchase-wallet"]).toLocaleString('en'), color: 'red' }
            ];

            t.api.get('/user/me').subscribe(data=>{

              t.data = data.data;

              t.dashboard.profileData = {
                name: t.data.membername ,
                userId: t.data.memberid,
                doj: '',
                sponsorId: t.data.introid,
                package: '',
                country: t.data.country,
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

                t.dashboard.tableData = {
                  headerRow: Object.keys(t.data[0]),
                  footerRow: null,
                  dataRows: rowArr
                };

              });
            });
          });
        });
      });

  		return t.dashboard;
  	}

}*/