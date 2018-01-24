import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AuthGuardService } from './shared/service/authguard/authguard.service';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      canActivateChild: [AuthGuardService], 
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
    }, {
        path: 'package',
        loadChildren: './package/package.module#PackageModule'
    }, {
        path: '',
        loadChildren: './users/users.module#UsersModule'
    }, {
        path: 'my-wallet',
        loadChildren: './my-wallet/my-wallet.module#MyWalletModule'
    }, {
        path: 'purchase-wallet',
        loadChildren: './purchase-wallet/purchase-wallet.module#PurchaseWalletModule'
    }, /*{
        path: 'e-pins',
        loadChildren: './e-pins/e-pins.module#EPinsModule'
    },*/ {
        path: 'networks',
        loadChildren: './networks/networks.module#NetworksModule'
    }, {
        path: 'profit-share',
        loadChildren: './profit-share/profit-share.module#ProfitShareModule'
    }, {
        path: '',
        loadChildren: './profit-calculator/profit-calculator.module#ProfitCalculatorModule'
    }, {
        path: 'support',
        loadChildren: './support/support.module#SupportModule'
    }
  ]}, 
  {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }]
  }
];
