import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { GenealogyTreeComponent } from './genealogy-tree/genealogy-tree.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { DownlineComponent } from './downline/downline.component';
import { LeftUsersComponent } from './left-users/left-users.component';
import { RightUsersComponent } from './right-users/right-users.component';

import { networksRoutes } from './networks.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(networksRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
    	GenealogyTreeComponent,
        ReferralsComponent,
        DownlineComponent,
        LeftUsersComponent,
        RightUsersComponent
    ]
})

export class NetworksModule {}
