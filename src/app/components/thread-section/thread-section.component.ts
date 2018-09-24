import { Observable } from 'rxjs';
import { LoadUserThreadActions, ThreadSelectedAction } from './../../store/actions';
import { ApplicationState } from './../../store/application-state';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';


import { mapStateToUsername, mapStateToUnreadMessages, mapStatetoThreadSummaries } from './thread_store_function';
import * as _ from 'lodash';

export interface ThreadSummary{
	participantName: string,
	id: number,
	lastMessage: string
}

@Component({
	selector: 'app-thread-section',
	templateUrl: './thread-section.component.html',
	styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

	username$: Observable<string>;
	unreadMessages$: Observable<number>;
	threadSummaries$: Observable<ThreadSummary[]>;

	constructor(
		private store: Store<ApplicationState>
	) {}

	ngOnInit() {

		this.store.dispatch( new LoadUserThreadActions());
		this.username$ =  this.store.select( mapStateToUsername );
		this.unreadMessages$ = mapStateToUnreadMessages( this.store );
		this.threadSummaries$ = mapStatetoThreadSummaries( this.store );

	}

	onThreadSelected( selectedThreadId: number ){
		this.store.dispatch( new ThreadSelectedAction( selectedThreadId ))
	}
}
