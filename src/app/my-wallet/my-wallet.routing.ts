import { Routes } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferWalletComponent } from './transfer-wallet/transfer-wallet.component';

export const myWalletRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'transactions',
        component: TransactionsComponent
    }]}, {
      path: '',
      children: [ {
        path: 'withdraw',
        component: WithdrawComponent
      }]
    }, {
      path: '',
      children: [ {
        path: 'transfer-wallet',
        component: TransferWalletComponent
      }]
    }
];
