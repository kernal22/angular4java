import { Component, OnInit } from '@angular/core';

import { TokenService } from '../shared/service/api/tokenservice.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/authservice/authservice.service';

@Component({
    selector: 'auth-app',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {

	constructor(
		private tokenService: TokenService,
		private router: Router,
		private authService: AuthService
	){}

	ngOnInit(){
		if(this.tokenService.getToken()){
			this.router.navigate(['/dashboard']);
		}
	}

}
