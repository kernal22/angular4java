import { Component, OnInit } from '@angular/core';

import { TableData } from '../../md/md-datatable/md-datatable.component';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../shared/service/api/tokenservice.service';

declare const $: any;

@Component({
  selector: 'downline',
  templateUrl: './downline.component.html'
})

export class DownlineComponent implements OnInit {

	tableData: any[];
	title: string = "Downline List";

	constructor(
		private api: ApiService,
		private tokenService: TokenService,
		private tokenExpService: TokenExpiryService
	){}

	ngOnInit(){
		var t = this;
		t.tableData = ['-'];

	    $('#datatablesDownline')
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
            "serverSide": true,
            "ajax": {
                "url": `${environment.api_url}/genealogy/referal-allnew`,
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
                { "data": "DOJ" },
                { "data": "Investment" },
                { "data": "Country" },
                { "data": "Package" }
            ]

        });
	}
	
}