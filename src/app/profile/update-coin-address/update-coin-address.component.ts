import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ApiService } from '../../shared/service/api/apiservice.service';
import swal from 'sweetalert2';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

declare const $: any;

declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

@Component({
    selector: 'update-coin-address',
    templateUrl: './update-coin-address.component.html'
})

export class UpdateCoinAddressComponent implements OnInit{

	title: string = "Bitcoin";
	btcAddress: FormGroup;
	ethAddress: FormGroup;
	otpTransfer: FormGroup;
	loginData: any;
	resendBtn: boolean;
	
	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService,
		private tokenService: TokenService,
		private router: Router,
		private tokenExpService: TokenExpiryService
	){}


	ngOnInit(){

		this.btcAddress = this.formBuilder.group({
	        address: ['', Validators.required]
	    });

	    this.ethAddress = this.formBuilder.group({
	        address: ['', Validators.required]
	    });

		this.otpTransfer = this.formBuilder.group({
			otpVal: ['', Validators.required]
		});
	}

	onUpdate(cointyp) {
		var t = this;
		let coinvalid;
		if(cointyp==='btc'){
			coinvalid = this.btcAddress;
		}
		else if(cointyp==='eth'){
			coinvalid = this.ethAddress;
		}
		if (coinvalid.valid) {
			let formVal = coinvalid.value;
			var obj = {
				address: formVal.address,
				//password: formVal.password,
				coinname: cointyp
			};
			this.api.post('/profile/changeaddressstep1', obj).subscribe(data=>{
				this.loginData = data;
				if(this.loginData.status === 'success'){
					this.tokenService.setOTP(this.loginData.data);
					t.resendBtn = true;
					$('#myModal2').modal({show: true, backdrop: 'static', keyboard: false});
					setTimeout(function(){t.resendBtn = false}, 10000);
				}else if(this.loginData.status === 'fail'){
					swal({
		                type: 'warning',
		                text: this.loginData.data,
		                timer: 2000,
		                buttonsStyling: false,
		                showConfirmButton: false
		            }).catch(swal.noop);
				}
			}, err=>{
				this.tokenExpService.isTokenValid();
		    });

		} else {
			this.validateAllFormFields(coinvalid);
		}
	}

	sendOTP(){
		let data = this.otpTransfer.value;
		var t = this;
		if(data.otpVal){
			var obj = {
				token: this.tokenService.getOTP(),
				otp: data.otpVal
			};
			this.api.post('/profile/changeaddressstep3', obj).subscribe(data=>{
				this.loginData = data;
        		if(this.loginData.status === "success"){
        			$('#myModal2').modal('hide');
        			this.tokenService.destroyOTP();
        			swal({
		                type: 'success',
		                title: 'Success!',
		                text: 'BTC Address Changed Successfully!',
		                buttonsStyling: false,
		                confirmButtonClass: 'btn btn-success'
		            }).then(function(){
		            	t.router.navigateByUrl("/dashboard");
		            }).catch(swal.noop);
        		} else if(this.loginData.status === "fail"){
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
		this.api.post('/profile/changeaddressotpresend', { token: this.tokenService.getOTP() }).subscribe(data=>{
			this.loginData = data;
    		if(this.loginData.status === "success"){
    			this.tokenService.setOTP(this.loginData.data);
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

	validateAllFormFields(formGroup: FormGroup) {
	   Object.keys(formGroup.controls).forEach(field => {
	     const control = formGroup.get(field);
	     if (control instanceof FormControl) {
	       control.markAsTouched({ onlySelf: true });
	     } else if (control instanceof FormGroup) {
	       this.validateAllFormFields(control);
	     }
	   });
	}

	displayFieldCss(form: FormGroup, field: string) {
	   return {
	     'has-error': this.isFieldValid(form, field),
	     'has-feedback': this.isFieldValid(form, field)
	   };
	}

	isFieldValid(form: FormGroup, field: string) {
	   return !form.get(field).valid && form.get(field).touched;
	}
}
