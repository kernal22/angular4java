import { Routes } from '@angular/router';

import { GenealogyTreeComponent } from './genealogy-tree/genealogy-tree.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { DownlineComponent } from './downline/downline.component';
import { LeftUsersComponent } from './left-users/left-users.component';
import { RightUsersComponent } from './right-users/right-users.component';

export const networksRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'genealogy-tree',
        component: GenealogyTreeComponent
    }]}, {
      path: '',
      children: [ {
        path: 'referrals',
        component: ReferralsComponent
      }]
    }, {
      path: '',
      children: [ {
        path: 'downline',
        component: DownlineComponent
      }]
    },{
      path: '',
      children: [ {
        path: 'left-users',
        component: LeftUsersComponent
      }]
    },{
      path: '',
      children: [ {
        path: 'right-users',
        component: RightUsersComponent
      }]
    }
];
