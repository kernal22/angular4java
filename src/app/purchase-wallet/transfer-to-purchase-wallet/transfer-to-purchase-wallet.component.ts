import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'transfer-to-purchase-wallet',
  styleUrls: ['./transfer-to-purchase-wallet.component.css'],
  templateUrl: './transfer-to-purchase-wallet.component.html'
})

export class TransferToPurchaseWalletComponent implements OnInit {

	public model: any = {};
  data: any;
  public allWallets;
  resendBtn: boolean;
  otpTransfer: FormGroup;
  uId: boolean = false;

  constructor( 
    private formBuilder: FormBuilder,
    private api: ApiService,
    private tokenService: TokenService,
    private router: Router,
    private tokenExpService: TokenExpiryService
  ){}

	ngOnInit(){
		var t = this;

    this.otpTransfer = this.formBuilder.group({
      otpVal: ['', [Validators.required]]
    });

		t.api.post('/profile/getbalance', {wtype: 'purchase'}).subscribe(data=>{
      t.data = data.data;
      t.allWallets = [
        { img: 'wallet_3', title: 'Purchase Wallet', value: (t.data.balance).toLocaleString('en'), color: 'red' }
      ];
    },
    err=> {
      this.tokenExpService.isTokenValid();
    });
	}
  onFundTransfer(){
    var t = this;
    var obj = {
      toid: t.model.userid,
      amount: t.model.amount,
      wtypefrom: 'purchase',
      wtypeto: 'purchase'
    };
    if(obj.toid && obj.amount && t.uId){
      t.api.post('/profile/transferwalletstep1', obj).subscribe(data=>{
        t.data = data;
        if(t.data.status === 'success'){
          t.tokenService.setOTP(t.data.data);
          t.resendBtn = true;
          $('#myModal4').modal({show: true, backdrop: 'static', keyboard: false});
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
      }, err=>{
        this.tokenExpService.isTokenValid();
      });
    }else {
      swal({
          type: 'warning',
          title: !t.uId ? 'Invalid User Id' :'Invalid fields!',
          timer: 2000,
          buttonsStyling: false,
          showConfirmButton: false
      }).catch(swal.noop);
    }
 	}

  sendOTP(){
    let data = this.otpTransfer.value;
    var t = this;
    if(data.otpVal){
      var obj = {
        token: t.tokenService.getOTP(),
        otp: data.otpVal
      };
      t.api.post('/profile/transferwalletstep3', obj).subscribe(data=>{
        t.data = data;
        if(t.data.status === "success"){
          $('#myModal4').modal('hide');
          t.tokenService.destroyOTP();
          swal({
                type: 'success',
                title: 'Success!',
                text: 'Transaction Done Successfully!',
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
    this.api.post('/profile/transferwalletotpresend', { token: this.tokenService.getOTP() }).subscribe(data=>{
      this.data = data;
        if(this.data.status === "success"){
          this.tokenService.setOTP(this.data.data);
          swal({
              title: 'OTP has been resend!',
              text: 'Check your mail...',
              timer: 2000,
              buttonsStyling: false,
              showConfirmButton: false
          }).catch(swal.noop);
        }
    }, err=>{
      this.tokenExpService.isTokenValid();
    });
  }
  getUserName(obj){
    var t = this;
    t.api.get('/getusername/'+obj.value).subscribe(data=>{
      t.data = data;
      t.model.username = t.data.data;
      if(t.data.status === 'success') t.uId = true;
    });
  }

}