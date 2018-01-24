import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { MdModule } from '../md/md.module';
import { packageRoutes } from './package.routing';

import { UpgradePackageComponent } from './upgrade-package/upgrade-package.component';
import { UpgradeDetailsComponent } from './upgrade-details/upgrade-details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(packageRoutes),
    FormsModule,
    MaterialModule,
    MdModule
  ],
  declarations: [
    UpgradePackageComponent,
    UpgradeDetailsComponent
  ]
})

export class PackageModule {}
