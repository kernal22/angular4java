import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SupportRoutes } from './support.routing';

import { SubmitQueryComponent } from './submit-query/submit-query.component';
import { TicketSummaryComponent } from './ticket-summary/ticket-summary.component';
import { TimelineComponent } from './timeline/timeline.component';
// import { FieldErrorDisplayComponent } from '../shared/field-error-display/field-error-display.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SupportRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SubmitQueryComponent,
    TicketSummaryComponent,
    TimelineComponent
    // FieldErrorDisplayComponent
  ]
})

export class SupportModule {}
