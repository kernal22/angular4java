import { Component, OnInit } from '@angular/core';

import { ApiService } from "../../shared/service/api/apiservice.service";
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

declare const $: any;

@Component({
  selector: 'genealogy-tree',
  styleUrls: ['./genealogy-tree.component.css', './custom.component.css', './main-new.component.css'],
  templateUrl: './genealogy-tree.component.html'
})

export class GenealogyTreeComponent implements OnInit {

	treeUsers: object;
	allUsers: any;
	data: any;

	constructor(
		private api: ApiService,
		private tokenExpService: TokenExpiryService
	){}

	ngOnInit(){
		var t = this;
		t.api.get('/user/me').subscribe(data=>{
			t.data = data;
			if(t.data.status === 'success'){
				this.treeLoader(t.data.data.memberid);
			}
		}, err=>{
	        this.tokenExpService.isTokenValid();
	    });
		
		$('[data-toggle="tooltip"]').tooltip();
	}

	treeLoader(id){
		var t = this;
		if(id){
			this.api.get('/genealogy/genealogy-binary-kv/'+id).subscribe(data=>{
				this.treeUsers = data.data;
				$(".full-content").removeClass("full-content");
			}, err=>{
		          this.tokenExpService.isTokenValid();
		      });
		}
	}

}