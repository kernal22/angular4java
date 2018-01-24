import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutes } from './profile.routing';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateCoinAddressComponent } from './update-coin-address/update-coin-address.component';
import { FieldErrorDisplayComponent } from '../shared/field-error-display/field-error-display.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditProfileComponent,
    ChangePasswordComponent,
    UpdateCoinAddressComponent,
    FieldErrorDisplayComponent
  ]
})

export class ProfileModule {}
