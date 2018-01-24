import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ApiService } from '../../shared/service/api/apiservice.service';
import swal from 'sweetalert2';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { PasswordValidation } from '../../shared/validationforms/password-validator.component';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

declare const $: any;

@Component({
	selector: 'submit-query',
	styleUrls: ['./submit-query.component.css'],
	templateUrl: './submit-query.component.html'
})
export class SubmitQueryComponent implements OnInit{
	queryForm: FormGroup;
	public user: any = {};

	constructor(){}
	ngOnInit(){

	}
	onSubmitQuery(){
		console.log(this.user);
		if(this.user.email!==undefined){
			swal({
                type: 'success',
                title: 'Your Query has been submitted Successfully!',
                text: 'We will get back to you soon...',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).catch(swal.noop);
		}
		
	}
}