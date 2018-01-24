import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'add-fund',
  styleUrls: ['./add-fund.component.css'],
  templateUrl: './add-fund.component.html'
})
export class AddFundComponent implements OnInit{

  public data: any;
  public email = "";
  public model: any = {};
  public allWallets;
  public isSelect : boolean = true;
  public btcInUsd: number = 0;
  public ethInUsd: number = 0;
  public coinname: string = 'btc';
  public s : number;
  public presentTime: any;
  public timeArray: any = [];
  public m: number;
  public tab: boolean = false;
  public coppy: boolean = false;
  public count: number = 0;
  public flag: number = 0;
  public qrshow: number = 0;
  public error: boolean = false;
  public timing;

  constructor(  private api: ApiService,
                private route: Router,
                private tokenExpService: TokenExpiryService
              ){}

  ngOnInit() {
        var t = this;
        t.model.amount = 0;
        t.model.btcEqui = 0;
        t.model.ethEqui = 0;

        t.api.get('/user/dashboard-wallet-balance').subscribe(data=>{
            t.data = data.data;
            t.allWallets = [
              { img: 'wallet_1', title: 'Trading Wallet', value: (t.data["fund-wallet"]).toLocaleString('en'), color: 'green', selected: t.isSelect },
              { img: 'wallet_3', title: 'Incentive Wallet', value: (t.data["incentive-wallet"]).toLocaleString('en'), color: 'orange', selected: !t.isSelect  }
            ];

            t.api.get('/getbtctousd').subscribe(data=>{
                t.data = data;
                t.btcInUsd = t.data.data;
                t.api.get('/getethtousd').subscribe(data=>{
                    t.data = data;
                    t.ethInUsd = t.data.data;
                });
            });
        });

        $('.confirmDiv').hide();
        $('.btn-risk').hide();
    }
    startTimer() {
       
              this.presentTime = document.getElementById('timer').innerHTML;
              this.timeArray = this.presentTime.split(/[:]+/);
              this.m = parseInt(this.timeArray[0]) ;
              this.s = this.checkSecond(parseInt(this.timeArray[1]) - 1);
              if(this.s==59){this.m=this.m-1}
              document.getElementById('timer').innerHTML =
                this.m + ":" + this.s;
    }
     checkSecond(sec: number) : number{
      if (sec < 10 && sec >= 0) {sec = 0 + sec};
      if (sec < 0) {sec = 59};
      return sec;
    }
    conversionOnKeyPressBTC(){
        var t = this;
        t.coinname = 'btc';
        t.model.btcEqui = t.model.amount / t.btcInUsd;
    }
    conversionOnKeyPressETH(){
        var t = this;
        t.coinname = 'eth';
        t.model.ethEqui = t.model.amount / t.ethInUsd;
    }
    addFund(){
        var t = this;
        swal({
                title: 'Success',
                text: 'Your Transaction has been successfully done',
                type: 'success',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            }).then(()=> {
                clearTimeout(this.timing);
                $('#myModal').modal('hide');
                t.route.navigate(['/purchase-wallet/add-fund-history']);
            }).catch(swal.noop);
    }
    copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).val()).select();
        document.execCommand("copy");
        $temp.remove();
    }
    onWithdrawRequestTradingWallet(){
        var t = this;
        let obj = {
            coinname: t.coinname,
            amount: t.model.amount
        }
        if(obj.amount<=0){
            return ;
        }
        t.api.post('/profile/getdepositeaddress', obj ).subscribe(data=>{
            t.data = data;
            if(t.data.status==="success"){
                t.model.address = t.data.data.address;
                t.model.amt = t.data.data.amount;
                t.model.coinname = t.data.data.coinname;
                t.model.qr = t.data.data.qrcodesrc;
                t.model.invoiceno = t.data.data.invoiceno;
                $('#myModal').modal({show: true, backdrop: 'static', keyboard: false});
                document.getElementById('timer').innerHTML = '15' + ":" + '00';
                this.timing = setInterval(function(){
                    t.startTimer();
                }, 1000);
            }

        },
        error=> {
            this.tokenExpService.isTokenValid();
        })
    }
    selectTab(qrshow){
      var reEmail = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;

      if(!(this.email && this.email.match(reEmail))){
        this.error = true;
        return false;
      }
      this.qrshow = qrshow;
      this.tab = !this.tab;
      $('.btn-continue').hide();
    }
    showRskBtn(count){
      this.count = count+1;
      if(this.count===1){
        $('.btn-risk').show();
        $('.confirmDiv').hide();
      }
      else{
        this.coppy = !this.coppy;
        if(this.flag==1 && this.coppy){
          $('.confirmDiv').show();
          this.qrshow = 0
        }
      }  
    }
    showCopyTab(flag){
      this.flag = flag;
      this.coppy = true;
      this.qrshow = 0
      $('.riskcontent').hide();
      $('.riskcontent').empty();
      $('.btn-risk').hide();
      if(this.flag==1 && this.coppy){
        $('.confirmDiv').show();
      }
        
    }
    hideAddress(){
      this.coppy = false;
    }
}