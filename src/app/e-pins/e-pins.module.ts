import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { PurchaseEPinComponent } from './purchase-e-pin/purchase-e-pin.component';
import { TransferEPinComponent } from './transfer-e-pin/transfer-e-pin.component';
import { PurchaseEPinReportComponent } from './purchase-e-pin-report/purchase-e-pin-report.component';
import { EPinRequestStatusComponent } from './e-pin-request-status/e-pin-request-status.component';
import { DataFilterPipe } from './data-filter.pipe';
import { ePinsRoutes } from './e-pins.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ePinsRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DataFilterPipe,
    	PurchaseEPinComponent,
    	TransferEPinComponent,
        PurchaseEPinReportComponent,
        EPinRequestStatusComponent
    ]
})

export class EPinsModule {}
