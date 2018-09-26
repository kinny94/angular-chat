import { ThreadSummaryVM } from './thread-summary.vm';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ThreadSelectedAction } from './../../store/actions';
import { ApplicationState } from './../../store/application-state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { mapStateToUsername, mapStateToUnreadMessages, stateToThreadSummariesSelector } from './thread_store_function';
import * as _ from 'lodash';


@Component({
	selector: 'app-thread-section',
	templateUrl: './thread-section.component.html',
	styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

	username$: Observable<string>;
	unreadMessages$: Observable<number>;
	threadSummaries$: Observable<ThreadSummaryVM[]>;
	currentSelectedThread: Observable<number>;

	constructor(
		private store: Store<ApplicationState>
	) {}

	ngOnInit() {

		this.username$ =  this.store.select( mapStateToUsername );
		this.unreadMessages$ = this.store.select( mapStateToUnreadMessages );
		this.threadSummaries$ = this.store.select( stateToThreadSummariesSelector );
		this.store.pipe(
			map( state => {
				this.currentSelectedThread = of( state.uiState.currentThread );
			})
		).subscribe();
	}

	onThreadSelected( selectedThreadId: number ){
		this.store.dispatch( new ThreadSelectedAction( selectedThreadId ))
	}
}
