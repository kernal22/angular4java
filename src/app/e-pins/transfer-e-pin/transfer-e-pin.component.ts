import { Component, OnInit, AfterViewInit } from '@angular/core';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'transfer-e-pin',
  templateUrl: './transfer-e-pin.component.html'
})

export class TransferEPinComponent implements OnInit {

	public dataTable: DataTable;

	ngOnInit() {
        this.dataTable = {
            headerRow: [ 'S.no', 'Transfer To', 'Transfer To Name', 'Date', 'Total-E-Code', 'Package' ],
            footerRow: [ 'S.no', 'Transfer To', 'Transfer To Name', 'Date', 'Total-E-Code', 'Package' ],

            dataRows: [
               	 ['1', 'Andrew Mike', 'Ankur', '22-Dec-2017', ' 1', 'Package1'],
                 ['2', ' Mike', 'Neha', '22-Dec-2017', ' 10', 'Package2'],
                 ['3', 'John carter', 'Pratayush', '22-Dec-2017', ' 15', 'Package1'],
                 ['4', 'Michael Vaughn', 'Nishant', '22-Dec-2017', ' 2', 'Package1'],
                 ['5', 'Clarke', 'Aashima', '22-Dec-2017', ' 100', 'Package1'],
               	 ['6', 'Symonds', 'Neha', '22-Dec-2017', ' 16', 'Package1'],
                 ['7', 'Hasim Amla', 'Neha', '22-Dec-2017', ' 12', 'Package1'],
                 ['8', 'Rohit', 'Neha', '22-Dec-2017', ' 13', 'Package1']
               
                
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