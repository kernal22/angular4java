import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TableData } from '../../md/md-datatable/md-datatable.component';
// declare interface DataTable{
// 	headerRow: string[];
// 	footerRow: string[];
// 	dataRows: string[][];
// }
declare const $: any;

@Component({
  selector: 'purchase-e-pin',
  templateUrl: './purchase-e-pin.component.html'
})

export class PurchaseEPinComponent implements OnInit {

	public dataTable: TableData;
    public data: any;
    
	ngOnInit(){
		this.dataTable = {

			headerRow: [ 'S.no', 'Package', 'No. of Pin', 'Amount', 'Total Price', 'Action' ],
            footerRow: [ 'S.no', 'Package', 'No. of Pin', 'Amount', 'Total Price', 'Action' ],

            dataRows: [
               	 ['1', 'Pckage1', '2', '$1000', ' $2000', 'Action1'],
                 ['2', 'Pckage2', '2', '$1000', ' $2000', 'Action1'],
                 ['3', 'Pckage3', '2', '$1000', ' $2000', 'Action1'],
                 ['4', 'Pckage4', '2', '$1000', ' $2000', 'Action1'],
                 ['5', 'Pckage5', '2', '$1000', ' $2000', 'Action1'],
               	 ['6', 'Pckage6', '2', '$1000', ' $2000', 'Action1'],
                 ['7', 'Pckage7', '2', '$1000', ' $2000', 'Action1'],
                 ['8', 'Pckage8', '2', '$1000', ' $2000', 'Action1']
               
                
            ]
		
		};

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