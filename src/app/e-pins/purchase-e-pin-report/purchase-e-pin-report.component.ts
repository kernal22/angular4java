import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TableData } from '../../md/md-datatable/md-datatable.component';
import { ApiService } from '../../shared/service/api/apiservice.service';


declare interface DataTable{
	headerRow: string[];
	footerRow: string[];
	dataRows: string[][];
}
declare const $: any;

@Component({
  selector: 'purchase-e-pin-report',
  templateUrl: './purchase-e-pin-report.component.html'
})


export class PurchaseEPinReportComponent implements OnInit {

	public dataTable: TableData;
  private data: any;
  public touch: boolean;
    
	package = [
		      {value: 'package1', viewValue: 'package1'},
		      {value: 'package2', viewValue: 'package2'},
		      {value: 'package3', viewValue: 'package3'}
		    ];

	status = [
		      {value: 'status1', viewValue: 'status1'},
		      {value: 'status2', viewValue: 'status2'},
		      {value: 'status3', viewValue: 'status3'}
		    ];

            constructor(private api: ApiService){}

	ngOnInit(){
		this.dataTable = {

			headerRow: [ 'S.no', 'Date', 'E-Pin', 'Status', 'Used By', 'Package', 'Upgrade', 'Register' ],
            footerRow: [ 'S.no', 'Date', 'E-Pin', 'Status', 'Used By', 'Package', 'Upgrade', 'Register' ],

            dataRows: [
               	 ['1', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
                 ['2', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
                 ['3', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
                 ['4', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
                 ['5', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
               	 ['6', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
                 ['7', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ],
                 ['8', '22-Dec-2017', '2', 'Not Used', '', ' Registeration', '' ]
               
                
            ]
		
		};
        // var t = this; 

        // t.api.get('/user/dashboard-latest-signups').subscribe(data=>{

        //         t.data = data.data;
        //         let rowArr = [];

        //         t.data.forEach(function(item){
        //           rowArr.push((<any>Object).values(item));
        //         });

        //         t.dataTable = {
        //           headerRow: Object.keys(t.data[0]),
        //           footerRow: Object.keys(t.data[0]),
        //           dataRows: rowArr
        //         };
        //       });


	}

	ngAfterViewInit() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
            search: '_INPUT_',
            searchPlaceholder: 'Search records',
            }

        });

        const table = $('#datatables').DataTable();
    }

    register(){
    	alert('register');
    }

}