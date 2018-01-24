import { Routes } from '@angular/router';

import { UpgradePackageComponent } from './upgrade-package/upgrade-package.component';
import { UpgradeDetailsComponent } from './upgrade-details/upgrade-details.component';

export const packageRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'upgrade-package',
        component: UpgradePackageComponent
    }]
    }, {
    path: '',
    children: [ {
      path: 'upgrade-details',
      component: UpgradeDetailsComponent
    }]
    }
];
