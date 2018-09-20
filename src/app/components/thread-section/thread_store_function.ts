import { ThreadSummary } from './thread-section.component';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from './../../store/application-state';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Thread } from 'shared/model/thread';

import * as _ from 'lodash';


export interface State {
	state: ApplicationState
}


export function mapStateToUsername( store: Store<State> ){
	let username: Observable<string>;
	username = store.pipe(
		filter( store => !!store.state ),
		map( store => {
			return store.state.storeData.participant[ store.state.uiState.userId ].name;
		})
	)
	return username;
}


export function mapStateToUnreadMessages( store: Store<State> ){
	let unreadMessages: Observable<number>;
	unreadMessages = store.pipe(
		filter( store => !!store.state ),
		map( store => {
			let currentUserId = store.state.uiState.userId;
			return _.values<Thread>( store.state.storeData.threads ).reduce(
				( acc, thread ) => acc + thread.participants[ currentUserId ], 0);
		})
	)
	return unreadMessages;
}


export function mapStatetoThreadSummaries( store : Store<State> ){
	let threadSummaries: Observable<ThreadSummary[]>;
	threadSummaries = store.pipe(
		filter( store => !!store.state ),
		select(
			store => {
				let summaries: ThreadSummary[] = [];
				const threads = _.values<Thread>(store.state.storeData.threads);

				threads.map( thread => {

					const names = _.keys( thread.participants ).map(
						participantId => store.state.storeData.participant[ participantId ].name
					);

					const lastMessageId = _.last( thread.messageIds );

					summaries.push( {
						id: thread.id,
						participantName: _.join( names, ", " ),
						lastMessage: store.state.storeData.messages[ lastMessageId ].text
					})
				});
				return summaries;
			}
		)
	)
	return threadSummaries;
}
