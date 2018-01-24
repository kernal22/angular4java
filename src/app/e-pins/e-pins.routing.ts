import { Routes } from '@angular/router';

import { PurchaseEPinComponent } from './purchase-e-pin/purchase-e-pin.component';
import { TransferEPinComponent } from './transfer-e-pin/transfer-e-pin.component';
import { PurchaseEPinReportComponent } from './purchase-e-pin-report/purchase-e-pin-report.component';
import { EPinRequestStatusComponent } from './e-pin-request-status/e-pin-request-status.component';

export const ePinsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'purchase-e-pin',
        component: PurchaseEPinComponent
    }]}, {
      path: '',
      children: [ {
        path: 'transfer-e-pin',
        component: TransferEPinComponent
    }]}, {
      path: '',
      children: [ {
        path: 'purchase-e-pin-report',
        component: PurchaseEPinReportComponent
    }]}, {
      path: '',
      children: [ {
        path: 'e-pin-request-status',
        component: EPinRequestStatusComponent
    }]}  
];
