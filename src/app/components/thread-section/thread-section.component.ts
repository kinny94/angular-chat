import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadUserThreadsActions } from './../../store/actions';
import { ApplicationState } from './../../store/application-state';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Store, select } from '@ngrx/store';


import { mapStateToUsername, mapStateToUnreadMessages } from './thread_store_function';
import { Thread } from 'shared/model/thread';
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

		this.threadSummaries$ =  this.store.pipe(
			filter( store => !!store.state ),
			select(
				store => {
					let summaries: ThreadSummary[];
					const threads = _.values<Thread>(store.state.storeData.threads);

					threads.map( thread => {

						const names = _.keys( thread.participants ).map(
							participantId => store.state.storeData.participant[ participantId ].name
						);

						const lastMessageId = _.last( thread.messageIds );

						summaries.push( {
							id: thread.id,
							participantName: _.join( names, "," ),
							lastMessage: store.state.storeData.messages[ lastMessageId ].text
						})
					});
					return summaries;
				}
			)
		)
	}
}
