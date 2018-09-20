import { Thread } from './../../../../shared/model/thread';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadUserThreadsActions } from './../../store/actions';
import { ApplicationState } from './../../store/application-state';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';

export interface State {
	state: ApplicationState
}


@Component({
	selector: 'app-thread-section',
	templateUrl: './thread-section.component.html',
	styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

	username$: Observable<string>;
	unreadMessages$: Observable<number>;

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

		this.username$ = this.store.pipe(
			filter( store => !!store.state ),
			map( store => {
				return store.state.storeData.participant[ store.state.uiState.userId ].name;
			})
		)

		this.unreadMessages$ = this.store.pipe(
			filter( store => !!store.state ),
			map( store => {
				let currentUserId = store.state.uiState.userId;
				return _.values<Thread>( store.state.storeData.threads ).reduce(
					( acc, thread ) => acc + thread.participants[ currentUserId ], 0);
			})
		)
	}
}
