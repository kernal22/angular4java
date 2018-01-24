import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-timeline-cmp',
    styleUrls: ['./timeline.component.css'],
    templateUrl: 'timeline.component.html'
})

export class TimelineComponent {
	public reply;

	public fullChat = [
		// { user: 'user', talk: 'hi hello', replyTime: 'Jan 15, 2015, 9:03:01 AM' },
		// { user: 'user', talk: 'horse', replyTime: 'Jan 17, 2015, 9:03:01 AM' },
		// { user: 'admin', talk: 'love india', replyTime: 'Jan 20, 2015, 9:03:01 AM' },
		// { user: 'user', talk: 'no prob', replyTime: 'Jan 21, 2015, 9:03:01 AM' },
		// { user: 'admin', talk: 'fine done', replyTime: 'Jan 21, 2015, 9:03:01 AM' },
		// { user: 'user', talk: 'bye bye', replyTime: 'Jan 22, 2015, 9:03:01 AM' },
	];
	onReply(replyData){
		if(this.reply){
			this.fullChat.push({ user:'user', talk: replyData, replyTime: new Date().toLocaleDateString("en-us")});
			this.reply='';
		}	
	}
}
