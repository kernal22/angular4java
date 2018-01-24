import { Routes } from '@angular/router';

import { UsersComponent } from './users.component';

export const usersRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'promotion',
        component: UsersComponent
    }]
}
];
