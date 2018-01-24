import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthRoutes } from './auth.routing';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../app.module';

import { ValidationFormsComponent } from '../shared/validationforms/validationforms.component';
import { WizardComponent } from '../shared/wizard/wizard.component';
import { FieldErrorDisplayComponent } from '../shared/validationforms/field-error-display/field-error-display.component';
// import { ExtendedFormsComponent } from '../forms/extendedforms/extendedforms.component';
// import { RegularFormsComponent } from '../forms/regularforms/regularforms.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    PricingComponent,
    LockComponent,
    ValidationFormsComponent,
    WizardComponent,
    FieldErrorDisplayComponent
  ]
})
export class AuthModule {}
