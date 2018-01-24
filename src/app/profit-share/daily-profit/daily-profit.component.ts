import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TableData } from '../../md/md-datatable/md-datatable.component';

declare const $: any;

@Component({
  selector: 'daily-profit',
  templateUrl: './daily-profit.component.html'
})

export class DailyProfitComponent implements OnInit, AfterViewInit {
	public dataTable: TableData;
    public data: any;

	ngOnInit(){
		/*this.dataTable = {
            headerRow: [ 'Sr.No.', 'Date', 'Description', 'Profit' ],
            footerRow: [ 'Sr.No.', 'Date', 'Description', 'Profit'  ],

            dataRows: [
                 ['1', '08/11/2017', 'REQ68528', '250.00000000'],
                 
                 ['3', '08/11/2017', 'REQ68528', '250.00000000'],
                 
                 ['5', '08/11/2017', 'REQ68528', '250.00000000'],
                 
                 ['7', '08/11/2017', 'REQ68528', '250.00000000'],
                 
                 ['9', '08/11/2017', 'REQ68528', '250.00000000']
                
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