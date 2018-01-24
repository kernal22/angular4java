import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*import { MdModule } from '../md/md.module';*/
import { MaterialModule } from '../app.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferWalletComponent } from './transfer-wallet/transfer-wallet.component';
/*import { EscapeHtmlPipe } from '../shared/service/pipes/keep-html.pipe';*/
import { myWalletRoutes } from './my-wallet.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(myWalletRoutes),
        FormsModule,
        ReactiveFormsModule,
        /*MdModule,*/
        MaterialModule
    ],
    declarations: [
    	TransactionsComponent,
    	WithdrawComponent,
    	TransferWalletComponent,
        /*EscapeHtmlPipe*/
    ]
})

export class MyWalletModule {}
