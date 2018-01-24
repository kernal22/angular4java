import { Component, OnInit } from '@angular/core';

import { TableData } from '../../md/md-datatable/md-datatable.component';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../shared/service/api/tokenservice.service';

declare const $: any;

@Component({
  selector: 'left-users',
  templateUrl: 'left-users.component.html'
})

export class LeftUsersComponent implements OnInit {

	tableData: any[];
	data: any;
	title: string = "Left User List";
	constructor(
		private api: ApiService,
		private tokenService: TokenService,
		private tokenExpService: TokenExpiryService
	){}

	ngOnInit(){		// /genealogy/referal-all-sidewise/left/
		var t = this;
		t.tableData = ['-'];

	    $('#datatablesLeft')
        .on( 'processing.dt', function ( e, settings, processing ) {
            $('.table-loader').css( 'display', processing ? 'block' : 'none' );
        })
        .DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
	            search: '_INPUT_',
	            searchPlaceholder: 'Search records',
            },
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": `${environment.api_url}/genealogy/referal-all-sidewisenew`,
                "data": function (d) {
                    d.side = "left";
                },
                "headers": {
                	"Content-Type": "application/json",
                	"X-UserToken": this.tokenService.getToken(),
                	"X-UserTokenSign": this.tokenService.getSign()
                }
            },
            "columns": [
            	{ "data": "sno" },
                { "data": "ID" },
                { "data": "Name" },
                { "data": "Sponsor" },
                { "data": "Sponsor Name" },
                { "data": "Joining On" },
                { "data": "Package" },
                { "data": "Investment" }
            ]

        });
	}
	
}