import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData} from '../../md/md-datatable/md-datatable.component';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'upgrade-details',
    templateUrl: 'upgrade-details.component.html'
})

export class UpgradeDetailsComponent implements OnInit, AfterViewInit {

    public dataTable: TableData;
  	public data: any;
    ngOnInit() {
    	 this.dataTable = {
            headerRow: [ 'S.No', 'Package Name', 'Amount', 'DOP', 'Booster Status', 'ROI Details' ],

            dataRows: [
               	 // ['1', 'TYCOON', '$1000', '22-Dec-2017', 'Success'],
                 // ['2', 'INFINITY', '$5000', '29-Dec-2017', 'Pending' ]
                
            ]
         };
      // this.dataTable = {
      //       headerRow: ["-"],
      //       dataRows: []
      //    }
    }
    showPop(){
    	swal({
                title: 'Here is a message!',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).catch(swal.noop)
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
