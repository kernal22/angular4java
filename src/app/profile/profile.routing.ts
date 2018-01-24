import { Routes } from '@angular/router';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateCoinAddressComponent } from './update-coin-address/update-coin-address.component';

export const ProfileRoutes: Routes = [
    {
      path: '',
      children: [ 
        {
          path: 'edit-profile',
          component: EditProfileComponent
        }
      ]
    }, 
    {
      path: '',
      children: [ 
        {
          path: 'change-password',
          component: ChangePasswordComponent
        }
      ]
    }, 
    {
      path: '',
      children: [ 
        {
          path: 'update-wallet-address',
          component: UpdateCoinAddressComponent
        }
      ]
    }
];
