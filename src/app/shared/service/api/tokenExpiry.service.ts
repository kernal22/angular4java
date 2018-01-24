import { Injectable } from '@angular/core';
import { TokenService } from './tokenservice.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenExpiryService{

	constructor(
		private tokenService: TokenService,
		private router: Router
	){}

	isTokenValid(){
		this.tokenService.destroyToken();
        this.router.navigateByUrl('/login');
	}

}