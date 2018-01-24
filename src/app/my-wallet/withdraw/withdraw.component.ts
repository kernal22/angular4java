import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { TableData} from '../../md/md-datatable/md-datatable.component';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'withdraw',
  styleUrls: ['./withdraw.component.css'],
  templateUrl: './withdraw.component.html'
})
export class WithdrawComponent implements OnInit{
	 public dataTable: TableData;
     otpTransfer: FormGroup;
	 public data: any;
     private model: any = {};
     private user: any = {};
     public allWallets;
     public isChecked = true;
     public isCheckedAddrsBtc = true;
     public isCheckedAddrsEtc = false;
     public isSelect : boolean = true;
     resendBtn: boolean;
     btcInUsd: number = 0;
     ethInUsd: number = 0;
     tradingW: number;
     incentiveW: number;
	constructor(
        private formBuilder: FormBuilder,
        private api: ApiService,
        private router: Router,
        private tokenService: TokenService,
        private tokenExpService: TokenExpiryService
    ){}

	ngOnInit() {
        var t = this;
        t.model.amount = 0;
        t.model.btcEqui = 0;
        t.model.ethEqui = 0;
        t.user.amount = 0;
        t.user.btcEqui = 0;
        t.user.ethEqui = 0;
        t.api.get('/user/me').subscribe(data=>{
            t.data = data.data;
            t.model.btcaddress = t.data.bitcoinaddress;
            t.user.btcaddress = t.data.bitcoinaddress;
            t.model.ethaddress = t.data.ethereumaddress;
            t.user.ethaddress = t.data.ethereumaddress;

            t.api.post('/profile/getbalance', {"wtype":"incentive"}).subscribe(data=>{
                t.incentiveW = data.data.balance;
                t.api.post('/profile/getbalance', {"wtype":"trading"}).subscribe(data=>{
                    //t.data = data.data;
                    t.tradingW = data.data.balance;
                    t.allWallets = [
                      { img: 'wallet_1', title: 'Trading Wallet', value: (t.tradingW).toLocaleString('en'), color: 'green', selected: t.isSelect },
                      { img: 'wallet_3', title: 'Incentive Wallet', value: (t.incentiveW).toLocaleString('en'), color: 'orange', selected: !t.isSelect  }
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
            });
        });

        this.otpTransfer = this.formBuilder.group({
            otpVal: ['', [Validators.required]]
        });

    }

    conversionOnKeyPressBTC(val){
        var t = this;
        if(val === 1){
            t.model.btcEqui = t.model.amount / t.btcInUsd;
            t.model.ethEqui = 0;
        }
        else if(val === 2){
            t.user.btcEqui = t.user.amount / t.btcInUsd;
            t.user.ethEqui = 0;
        }
        
    }

    conversionOnKeyPressETH(val){
        var t = this;
        if(val === 1){
            t.model.ethEqui = t.model.amount / t.ethInUsd;
            t.model.btcEqui = 0;
        }
        else if(val === 2){
            t.user.ethEqui = t.user.amount / t.ethInUsd;
            t.user.btcEqui = 0;
        }
    }

    onWithdrawRequestTradingWallet(){
        var t = this;
        var obj = {
            coinname: t.model.ethEqui === 0 ? 'btc': 'eth',
            amount: t.model.amount,
            wtype: 'trading'
        };

        if(!(t.model.hasOwnProperty(obj.coinname+'address') /*&& (t.model[obj.coinname+'address'] >= 30 && t.model[obj.coinname+'address'] <= 40)*/)){
            swal({
                title: 'Error! Wallet Address Invalid/Empty!',
                type: 'warning',
                text: 'Update Wallet Address!',
                showConfirmButton: false,
                timer: 5000,
                buttonsStyling: false
            }).catch(swal.noop);
            return;
        }

        if(t.model.amount === 0 || t.model.amount > t.tradingW){
            swal({
                title: 'Error!',
                type: 'warning',
                text: 'Withdrawal amount can\'t be 0 or greater than wallet balance!',
                showConfirmButton: false,
                timer: 5000,
                buttonsStyling: false
            }).catch(swal.noop);
            return;
        }

        t.api.post('/profile/withdrawalstep1', obj).subscribe(data=>{
            t.data = data;
            
            if(this.data.status === 'success'){
                this.tokenService.setOTP(this.data.data);
                t.resendBtn = true;
                $('#myModal3').modal({show: true, backdrop: 'static', keyboard: false});
                setTimeout(function(){t.resendBtn = false}, 10000);
            }else if(this.data.status === 'fail'){
                swal({
                    type: 'warning',
                    text: this.data.data,
                    timer: 2000,
                    buttonsStyling: false,
                    showConfirmButton: false
                }).catch(swal.noop);
            }
            
        });
    }

    onWithdrawRequestIncentiveWallet(){
        var t = this;
        var obj = {
            coinname: t.user.ethEqui === 0 ? 'btc': 'eth',
            amount: t.user.amount,
            wtype: 'incentive'
        };

        if(!(t.user.hasOwnProperty(obj.coinname+'address') /*&& (t.user[obj.coinname+'address'] >= 30 && t.user[obj.coinname+'address'] <= 40)*/)){
            swal({
                title: 'Error! Wallet Address Invalid/Empty!',
                type: 'warning',
                text: 'Update Wallet Address!',
                showConfirmButton: false,
                timer: 5000,
                buttonsStyling: false
            }).catch(swal.noop);
            return;
        }

        if(t.user.amount === 0 || t.user.amount > t.incentiveW){
            swal({
                title: 'Error!',
                type: 'warning',
                text: 'Withdrawal amount can\'t be 0 or greater than wallet balance!',
                showConfirmButton: false,
                timer: 5000,
                buttonsStyling: false
            }).catch(swal.noop);
            return;
        }

        t.api.post('/profile/withdrawalstep1', obj).subscribe(data=>{
            t.data = data;
           
            if(t.data.status === 'success'){
                t.tokenService.setOTP(t.data.data);
                t.resendBtn = true;
                $('#myModal3').modal({show: true, backdrop: 'static', keyboard: false});
                setTimeout(function(){t.resendBtn = false}, 10000);
            }else if(t.data.status === 'fail'){
                swal({
                    type: 'warning',
                    text: t.data.data,
                    timer: 2000,
                    buttonsStyling: false,
                    showConfirmButton: false
                }).catch(swal.noop);
            }
        })
    }

    sendOTP(){
        let data = this.otpTransfer.value;
        var t = this;
        if(data.otpVal){
            var obj = {
                token: t.tokenService.getOTP(),
                otp: data.otpVal
            };
            t.api.post('/profile/withdrawalstep3', obj).subscribe(data=>{
                t.data = data;
                if(t.data.status === "success"){
                    $('#myModal3').modal('hide');
                    t.tokenService.destroyOTP();
                    swal({
                        type: 'success',
                        title: 'Success!',
                        text: 'Withdrawal Request has been submitted successfully!',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).then(function(){
                        t.router.navigateByUrl("/dashboard");
                    }).catch(swal.noop);
                } else if(t.data.status === "fail"){
                    swal({
                        type: 'warning',
                        title: 'Wrong OTP',
                        timer: 2000,
                        buttonsStyling: false,
                        showConfirmButton: false
                    }).catch(swal.noop);
                }
            }, err=>{
                this.tokenExpService.isTokenValid();
            });
        }
    }

    resendOTP(){
        this.resendBtn = false;
        this.api.post('/profile/withdrawalotpresend', { token: this.tokenService.getOTP() }).subscribe(data=>{
            this.data = data;
            if(this.data.status === "success"){
                this.tokenService.setOTP(this.data.data);
                swal({
                    title: 'OTP has been resend!',
                    text: 'Check your mail...',
                    timer: 1500,
                    buttonsStyling: false,
                    showConfirmButton: false
                }).catch(swal.noop);
            }
        }, err=>{
            this.tokenExpService.isTokenValid();
        });
    }

}