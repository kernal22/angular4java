import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TableData } from '../../md/md-datatable/md-datatable.component';

declare const $: any;

@Component({
  selector: 'binary-profit',
  templateUrl: './binary-profit.component.html'
})

export class BinaryProfitComponent implements OnInit, AfterViewInit {

	public dataTable: TableData;
    public data: any;

	ngOnInit(){
		/*this.dataTable = {
            headerRow: [ 'Sr.No.', 'Date', 'LEFT $', 'RIGHT $', 'Matching', 'Amount' ],
            footerRow: [ 'Sr.No.', 'Date', 'LEFT $', 'RIGHT $', 'Matching', 'Amount'  ],

            dataRows: [
                 // ['1', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Confirm'],
                 // ['2', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Cancelled'],
                 // ['3', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Confirm'],
                 // ['4', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Cancelled'],
                 // ['5', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Confirm'],
                 // ['6', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Cancelled'],
                 // ['7', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Confirm'],
                 // ['8', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Cancelled'],
                 // ['9', '08/11/2017', 'REQ68528', '250.00000000', '125.00000000', ' 08/11/2017', 'Confirm']
                
            ]
         };*/

         this.dataTable = {
            headerRow: ["-"],
            dataRows: []
         }
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

}