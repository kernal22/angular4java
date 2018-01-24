import { Component, OnInit } from '@angular/core';
import { TableData} from '../../md/md-datatable/md-datatable.component';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../shared/service/api/tokenservice.service';

declare const $: any;

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: [ './transactions.component.css' ]
})

export class TransactionsComponent implements OnInit {
    
    tableData: any[];

    constructor(
        private api: ApiService,
        private tokenService: TokenService,
    ){}

	ngOnInit() {
        var t = this;
        t.tableData = ['-'];

        $('#datatables')
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
                "url": `${environment.api_url}/profile/getwallettransactionsnew`,
                "data": function (d) {
                    d.wtype = "trading";
                },
                "headers": {
                    "Content-Type": "application/json",
                    "X-UserToken": this.tokenService.getToken(),
                    "X-UserTokenSign": this.tokenService.getSign()
                }
            },
            "columns": [
                { "data": "Sno" },
                { "data": "Amount" },
                { "data": "Description" },
                { "data": "ondate" },
                { "data": "TType" }
            ]

        });

        $('#datatables2')
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
                "url": `${environment.api_url}/profile/getwallettransactionsnew`,
                "data": function (d) {
                    d.wtype = "incentive";
                },
                "headers": {
                    "Content-Type": "application/json",
                    "X-UserToken": this.tokenService.getToken(),
                    "X-UserTokenSign": this.tokenService.getSign()
                }
            },
            "columns": [
                { "data": "Sno" },
                { "data": "Amount" },
                { "data": "Description" },
                { "data": "ondate" },
                { "data": "TType" }
            ]

        });

        $.fn.dataTable.ext.errMode = 'throw';

    }

}