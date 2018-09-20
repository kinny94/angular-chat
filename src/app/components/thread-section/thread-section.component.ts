import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadUserThreadsActions } from './../../store/actions';
import { ApplicationState } from './../../store/application-state';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Store, select } from '@ngrx/store';


import { mapStateToUsername, mapStateToUnreadMessages, mapStatetoThreadSummaries } from './thread_store_function';
import * as _ from 'lodash';

export interface State {
	state: ApplicationState
}

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
		private threadsService: ThreadsService,
		private store: Store<State>
	) {}

	ngOnInit() {

		this.threadsService.loadUserThreads()
		.subscribe(
			allUserData => {
				this.store.dispatch( new LoadUserThreadsActions( allUserData ));
			}
		);

		this.username$ = mapStateToUsername( this.store );
		this.unreadMessages$ = mapStateToUnreadMessages( this.store );
		this.threadSummaries$ = mapStatetoThreadSummaries( this.store );
	}
}
