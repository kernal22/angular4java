import { Routes } from '@angular/router';

import { ProfitCalculatorComponent } from './profit-calculator.component';

export const ProfitCalculatorRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'profit-calculator',
        component: ProfitCalculatorComponent
    }]
}
];
