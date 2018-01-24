import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { DailyProfitComponent } from './daily-profit/daily-profit.component';
import { DirectProfitComponent } from './direct-profit/direct-profit.component';
import { BinaryProfitComponent } from './binary-profit/binary-profit.component';
import { BoosterBinaryProfitComponent } from './booster-binary-profit/booster-binary-profit.component';

import { profitShareRoutes } from './profit-share.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(profitShareRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
    	DailyProfitComponent,
    	DirectProfitComponent,
    	BinaryProfitComponent,
    	BoosterBinaryProfitComponent
    ]
})

export class ProfitShareModule {}
