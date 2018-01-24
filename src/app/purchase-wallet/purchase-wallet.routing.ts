import { Routes } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransferToPurchaseWalletComponent } from './transfer-to-purchase-wallet/transfer-to-purchase-wallet.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { AddFundHistoryComponent } from './add-fund-history/add-fund-history.component';

export const purchaseWalletRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'transactions',
        component: TransactionsComponent
    }]},{
      path: '',
      children: [ {
        path: 'transfer-to-purchase-wallet',
        component: TransferToPurchaseWalletComponent
      }]
    },{
      path: '',
      children: [ {
        path: 'add-fund',
        component: AddFundComponent
      }]
    },{
      path: '',
      children: [ {
        path: 'add-fund-history',
        component: AddFundHistoryComponent
      }]
    }
];
