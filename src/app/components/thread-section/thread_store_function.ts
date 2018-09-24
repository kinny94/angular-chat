import { ThreadSummary } from './thread-section.component';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from './../../store/application-state';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Thread } from 'shared/model/thread';

import * as _ from 'lodash';



export function mapStateToUsername( state: ApplicationState ) : string{
	const currentUserId = state.uiState.userId,
    currentParticipant = state.storeData.participant[currentUserId];

    if (!currentParticipant) {
        return "";
    }

    return currentParticipant.name;
}

export function mapStateToUnreadMessages( state: ApplicationState ) : number {
	let unreadMessages: number = 0;
	if( state ){
		let currentUserId = state.uiState.userId;
		unreadMessages =  _.values<Thread>( state.storeData.threads ).reduce(
			( acc, thread ) => acc + (thread.participants[ currentUserId ] || 0), 0);
			return unreadMessages;
	}

	return unreadMessages;
}


export function mapStatetoThreadSummaries( store : Store<ApplicationState> ){
	let threadSummaries: Observable<ThreadSummary[]>;
	threadSummaries = store.pipe(
		filter( store => !!store ),
		select(
			store => {
				let summaries: ThreadSummary[] = [];
				const threads = _.values<Thread>(store.storeData.threads);

				threads.map( thread => {

					const names = _.keys( thread.participants ).map(
						participantId => store.storeData.participant[ participantId ].name
					);

					const lastMessageId = _.last( thread.messageIds );

					summaries.push( {
						id: thread.id,
						participantName: _.join( names, ", " ),
						lastMessage: store.storeData.messages[ lastMessageId ].text
					})
				});
				return summaries;
			}
		)
	)
	return threadSummaries;
}
