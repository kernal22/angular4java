import { Routes } from '@angular/router';

import { DailyProfitComponent } from './daily-profit/daily-profit.component';
import { DirectProfitComponent } from './direct-profit/direct-profit.component';
import { BinaryProfitComponent } from './binary-profit/binary-profit.component';
import { BoosterBinaryProfitComponent } from './booster-binary-profit/booster-binary-profit.component';

export const profitShareRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'daily-profit',
        component: DailyProfitComponent
    }]}, {
      path: '',
      children: [ {
        path: 'direct-profit',
        component: DirectProfitComponent
      }]
    }, {
      path: '',
      children: [ {
        path: 'binary-profit',
        component: BinaryProfitComponent
      }]
    }, {
      path: '',
      children: [ {
          path: 'booster-binary-profit',
          component: BoosterBinaryProfitComponent
      }]
    }
];
