import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { ApiService } from '../../shared/service/api/apiservice.service';

declare var $: any;

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {
    
    fpass: any;
    model: any = {};
	constructor(private api: ApiService){}
    ngOnInit() {
        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    OnForgotPassword(){
    	if(this.model.username){
    		this.api.post('/forgotpassword', this.model).subscribe(data=>{
    			this.fpass = data;
    			if(this.fpass.status === "success"){
	    			swal({  
	    				title: 'Password Send',
	                    text: 'Kindly check your registered mail',
	                    timer: 5000,
	                    showConfirmButton: false
	                }).catch(swal.noop);
	            }else{
	            	swal({  
	    				title: 'No such UserId/Email Exist',
	                    timer: 2000,
	                    showConfirmButton: false
	                }).catch(swal.noop);
	            }
    		});
    	}
    }
}