import { Store } from '@ngrx/store';
import { ApplicationState } from './../../store/application-state';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
