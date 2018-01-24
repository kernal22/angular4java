import { Routes } from '@angular/router';

import { SubmitQueryComponent } from './submit-query/submit-query.component';
import { TicketSummaryComponent } from './ticket-summary/ticket-summary.component';
import { TimelineComponent } from './timeline/timeline.component';

export const SupportRoutes: Routes = [
    {
      path: '',
      children: [ 
        {
          path: 'submit-query',
          component: SubmitQueryComponent
        }
      ]
    }, 
    {
      path: '',
      children: [ 
        {
          path: 'ticket-summary',
          component: TicketSummaryComponent
        }
      ]
    }, 
    {
      path: '',
      children: [ 
        {
          path: 'timeline',
          component: TimelineComponent
        }
      ]
    }
];
