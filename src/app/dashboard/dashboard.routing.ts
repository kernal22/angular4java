import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
/*import { DashboardResolve } from './dashboard-resolve.service';*/

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent/*,
        resolve: {
          dashboard: DashboardResolve
        }*/
    }]
}
];
