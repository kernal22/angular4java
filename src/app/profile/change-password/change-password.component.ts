import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ApiService } from '../../shared/service/api/apiservice.service';
import swal from 'sweetalert2';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { PasswordValidation } from '../../shared/validationforms/password-validator.component';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

declare const $: any;

declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

@Component({
	selector: 'change-password',
	templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit{

	loginPassword: FormGroup;
	walletPassword: FormGroup;
	otpTransfer: FormGroup;
	loginData: any;
	resendBtn: boolean;
	wallet: string = '';
	
	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService,
		private tokenService: TokenService,
		private router: Router,
		private tokenExpService: TokenExpiryService
	){}

	ngOnInit(){

		this.loginPassword = this.formBuilder.group({
	        
	        currentPassword: ['', [Validators.required]],
	        
	        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
	        confirmPassword: ['', Validators.required],
	       }, {
	         validator: PasswordValidation.MatchPassword 
	     });

		this.walletPassword = this.formBuilder.group({
	        
	        currentPassword: ['', [Validators.required]],
	        
	        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
	        confirmPassword: ['', Validators.required],
	       }, {
	         validator: PasswordValidation.MatchPassword 
	     });

		this.otpTransfer = this.formBuilder.group({
			otpVal: ['', [Validators.required]]
		});

	}

	onUpdate(pwdtype) {
		var t = this;
		let validform;
		if(pwdtype==='login'){
			validform = this.loginPassword;
		}
		else if(pwdtype==='transaction'){
			validform = this.walletPassword;
		}
		if (validform.valid) {
			let formVal = validform.value;
			var obj = {
				oldpassword: formVal.currentPassword,
				newpassword: formVal.password,
				pwdtype: pwdtype
			};
			this.api.post('/profile/changepasswordstep1', obj).subscribe(data=>{
				this.loginData = data;
				if(this.loginData.status === 'success'){
					this.tokenService.setOTP(this.loginData.data);
					t.resendBtn = true;
					$('#myModal').modal({show: true, backdrop: 'static', keyboard: false});
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
			this.validateAllFormFields(validform);
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
			this.api.post('/profile/changepasswordstep3', obj).subscribe(data=>{
				this.loginData = data;
        		if(this.loginData.status === "success"){
        			$('#myModal').modal('hide');
        			this.tokenService.destroyOTP();
        			swal({
		                type: 'success',
		                title: 'Success!',
		                text: 'Password Changed Successfully!',
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
		this.api.post('/profile/changepwdotpresend', { token: this.tokenService.getOTP() }).subscribe(data=>{
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