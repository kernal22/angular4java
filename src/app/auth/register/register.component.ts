import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from '../../shared/validationforms/password-validator.component';
import { DateAdapter } from '@angular/material';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../shared/service/api/apiservice.service';
import  cc from '../../../assets/scripts/countries.json';

declare const $: any;

declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}


@Component({
    selector: 'app-register-cmp',
    styleUrls:['./register.component.css'],
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	 
   private model: any = {};
    register : FormGroup;
    data: any;
    regData: object;
    countries= cc;
    currentCountry: string;
    hsponsor: string;
    userid: string;

    constructor( private formBuilder: FormBuilder,
                 private apiService: ApiService,
                 private router: Router,
                 private http: Http,
                 private route: ActivatedRoute) {}

  isFieldValid(form: FormGroup, field: string) {
   return !form.get(field).valid && form.get(field).touched;
 }

  displayFieldCss(form: FormGroup, field: string) {
   return {
     'has-error': this.isFieldValid(form, field),
     'has-feedback': this.isFieldValid(form, field)
   };
  }

  onRegister() {
   let data = this.register.value;
   if (this.register.valid) {
     this.regData = {
      "sponsorid": this.hsponsor,
      "email": data.email,
      "name": data.name,
      "loginid": this.userid,
      "country": data.country,
      "mobile": data.mobile,
      "password": data.password,
      "placement": data.placement
     }
    this.apiService.post('/register', this.regData).subscribe(result=>{
      this.data = result;
      if(this.data.status === "success"){
        swal({  buttonsStyling: false,
                confirmButtonText: "Login",
                confirmButtonClass: 'btn btn-rose btn-sm',
                html: '<div style="line-height:150%;font-family:Verdana,Arial,Helvetica;margin:0 auto; max-width:600px; min-width: 300px;font-size:14px;border-radius:0px;"><div style=" background-image:url(assets/img/1.jpg); padding:25px; color: #fff;"><div class="login_1" style="margin-left: 204px; margin-bottom: 44px;"><a href="#" target="_blank"><img style="height:80px;margin:0 auto;" alt="jaavatrade.com" src="assets/img/logo1.png" style="text-align:center;"></a></div><p style="font-size: 16px; text-align:center"><b>CONGRATULATIONS !!!!!</b></p><p style="text-align:center;">Welcome to JAAVATRADE..........The Revolution</p><p style="text-align:center;">Thanks for registering with us.Your login credentials are sent to your registered Email address. </p><br/><p style="text-align:center;"><b>What is next ? </b></p><p style="text-align:center;">Click below to login your Jaavatrade Account and enjoy your Crypto life.</p><p></p><p> </p><br/><br/><br/><div style="text-align: center;"></div></div></div>'
            }).then(()=> {
              this.router.navigate(['/login']);
            });
        
      }else{
        this.showNotification('top', 'center', this.data.data, 'danger');
      }

    });
   } else {
     this.validateAllFormFields(this.register);
   }
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
  ngOnInit() {
      this.hsponsor = this.route.snapshot.queryParams["id"];
      this.http.get('http://freegeoip.net/json/').map(res=> res.json()).subscribe(data=>{
        this.currentCountry = data.country_code;
      });
      this.register = this.formBuilder.group({
     
        email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],

        mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern("^(?=.*[0-9]).{10,20}$")]],

        placement: ['', Validators.required],

        sponsorid: [this.hsponsor, Validators.required],

        name: ['', [Validators.required, Validators.pattern("^(?![.])[a-zA-Z\. ]{1,100}$")]],

        loginid: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_\-]{4,20}$"), Validators.minLength(4), Validators.maxLength(20)]],

        country: ['', Validators.required],

        password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],

        confirmPassword: ['', Validators.required],
       }, {
         validator: PasswordValidation.MatchPassword 
     });  
  }
  showNotification(from: any, align: any, message: string, status: string) {
      $.notify({
          icon: 'notifications',
          message: message
      }, {
          type: status,
          timer: 3000,
          placement: {
              from: from,
              align: align
          }
      });
  }
  getUserName(obj, condition){ 
    this.apiService.get('/getusername/'+obj.value).subscribe(result => {
      this.data = result;
      if(condition){
         if(this.data.status === "success"){
            this.hsponsor = obj.value;
            obj.value = obj.value + '[' + this.data.data+ ']';
         }else if(this.data.status !== "success"){
            this.hsponsor = obj.value;
            obj.value = obj.value + '[Sponsor Not Exists]';
         }
      }else if(!condition){
        if(this.data.status !== "success"){
          this.userid = obj.value;
          obj.value = obj.value + '[OK]';
        }else{
          this.userid = obj.value;
          obj.value = obj.value + '[User Already Exists]';
        }
      }
     
    });
  }
  setUserNameOnFocus(obj, condition){
    if(condition && obj.value){
      obj.value = this.hsponsor;
    }else if(!condition && obj.value){
      obj.value = this.userid;
    }
  }
}
