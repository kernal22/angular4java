import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransferToPurchaseWalletComponent } from './transfer-to-purchase-wallet/transfer-to-purchase-wallet.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { AddFundHistoryComponent } from './add-fund-history/add-fund-history.component';

import { purchaseWalletRoutes } from './purchase-wallet.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(purchaseWalletRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
    	TransactionsComponent,
        TransferToPurchaseWalletComponent,
        AddFundComponent,
        AddFundHistoryComponent
    ]
})

export class PurchaseWalletModule {}
