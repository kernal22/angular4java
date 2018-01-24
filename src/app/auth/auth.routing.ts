import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';

export const AuthRoutes: Routes = [

    {
        path: '',
        component: AuthComponent,
        children: [ {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'register',
            component: RegisterComponent
        },
        {
            path: 'forgot-password',
            component: ForgotPasswordComponent
        },
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        },
        {
            path: '**',
            redirectTo: 'login',
            pathMatch: 'full'
        }
        ]
    }
];
