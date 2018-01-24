import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api/apiservice.service';
import { TokenService } from '../api/tokenservice.service';
//import { User } from '../../../model/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthService{

	result: any;
	constructor( private apiService: ApiService,
				 private http: HttpClient,
				 private tokenService: TokenService,
				 private route: Router
				){}

	onLogin(user) {

		// var body = { username: username, password: password};
		//console.log(user);
		//return this.http.post('http://localhost:5300/login', user).map(result =>this.result = result);
		return this.apiService.post('/login', user);
	}

	onLogout() {
		this.tokenService.destroyToken();
		this.route.navigate(['/auth']);
	}

}