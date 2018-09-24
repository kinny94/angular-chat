import { ThreadSummary } from './../thread-section/thread-section.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-thread-list',
	templateUrl: './thread-list.component.html',
	styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

	@Input()
	threads: ThreadSummary[];

	@Input()
	currentSelectedThread: number

	@Output()
	threadSelected = new EventEmitter();

	constructor() {
	 }

	ngOnInit() {
		console.log( this.currentSelectedThread );
	}

	selectThread( threadId: number ){
		this.threadSelected.next( threadId );
	}

}
