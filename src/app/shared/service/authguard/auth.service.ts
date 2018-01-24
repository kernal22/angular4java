import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../api/tokenservice.service';
import { ApiService } from '../api/apiservice.service';

@Injectable()
export class AuthgService{

	//private token: Array<any> = [] ;
	//private data: any;
	//private check: boolean;
	constructor(
		private tokenService: TokenService,
		private api: ApiService
	){}

	public isAuthenticate(): boolean{
		 /*this.token['usertoken'] = localStorage.getItem('X-UserToken');
		 this.token['usertokensign'] = localStorage.getItem('X-UserTokenSign');

		 if(this.token['usertokensign'] && this.token['usertoken'])
			return true;

		 else
		 	return false;*/

		return (!!this.tokenService.getToken() && !!this.tokenService.getSign());
		/*let chk: boolean;
		if(!!this.tokenService.getToken() && !!this.tokenService.getSign()){
			console.log("hello");
			this.api.get('/user/me').subscribe(data=>{
				this.data = data;
				console.log("hello1");
				console.log(this.data);
				if(this.data.status === "success"){
					console.log("hello2");
					chk = true;
				}else if(this.data.message === "Token is invalid"){
					console.log("hello3");
					chk = false;
				}
				console.log(chk);
				return chk;
			});
		} else {
			console.log("hello4");
			chk = false;
			console.log(chk);
			return chk;
		}*/
		
		//return chk;
	}
}