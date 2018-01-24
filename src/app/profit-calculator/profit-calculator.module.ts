import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { NouisliderModule } from 'ng2-nouislider';
// import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';

import { ProfitCalculatorComponent } from './profit-calculator.component';
import { ProfitCalculatorRoutes } from './profit-calculator.routing';

@NgModule({
	imports: [
		CommonModule,
        RouterModule.forChild(ProfitCalculatorRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        NouisliderModule,
        // TagInputModule

	],
	declarations: [
		ProfitCalculatorComponent
	]
})
export class ProfitCalculatorModule {}