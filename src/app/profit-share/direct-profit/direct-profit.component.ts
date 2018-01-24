import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TableData } from '../../md/md-datatable/md-datatable.component';

declare const $: any;

@Component({
  selector: 'direct-profit',
  templateUrl: './direct-profit.component.html'
})

export class DirectProfitComponent implements OnInit, AfterViewInit {
	public dataTable: TableData;
    private data: any;

	ngOnInit(){
		/*this.dataTable = {
            headerRow: [ 'Sr.No.', 'User ID', 'Name', 'Date', 'Amount' ],
            footerRow: [ 'Sr.No.', 'User ID', 'Name', 'Date', 'Amount'  ],

            dataRows: [
                 ['1', 'AKI56', 'Aakash', '08/11/2017', '100'],
                 
                 ['3', 'KERNAL', 'Kunal', '08/11/2016', '1'],
                 
                 ['5', 'ZOMBIE', 'zampa', '08/11/2016', '1000']
                
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