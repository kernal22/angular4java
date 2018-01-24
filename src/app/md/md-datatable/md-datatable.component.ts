import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit} from '@angular/core';


declare const $: any;

export interface TableData {
  headerRow?: string[];
  footerRow?: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-md-datatable',
  templateUrl: './md-datatable.component.html',
  styleUrls: ['./md-datatable.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdDataTableComponent {
  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public cardClass: string;

  @Input()
  public data: TableData;

  constructor() { }

  // ngAfterViewInit() {
  //   $('#datatables').DataTable({

  //       'pagingType': 'full_numbers',
  //       'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
  //       responsive: true,
  //       language: {
  //       search: '_INPUT_',
  //       searchPlaceholder: 'Search records',
  //     }

  //   });

  //   const table = $('#datatables').DataTable();

  //   // Edit record
  //   table.on( 'click', '.edit', function () {
  //       const $tr = $(this).closest('tr');

  //       const data = table.row($tr).data();
  //       alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
  //   } );

  //   // Delete a record
  //   table.on( 'click', '.remove', function (e: any) {
  //       const $tr = $(this).closest('tr');
  //       table.row($tr).remove().draw();
  //       e.preventDefault();
  //   } );

  //   // Like record
  //   table.on( 'click', '.like', function () {
  //       alert('You clicked on Like button');
  //   });
  // }

}
