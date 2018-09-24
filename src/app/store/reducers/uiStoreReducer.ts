import { StoreData } from './../store-data';
import { UserThreadsLoadedActions, USER_THREAD_ACTIONS_LOADED } from './../actions';
import * as _ from 'lodash';

export function storeData( state: StoreData, action: UserThreadsLoadedActions ) : StoreData {

	switch( action.type ){
		case USER_THREAD_ACTIONS_LOADED:
			return handleLoadUserThreadsAction( state, action )
		default:
			return state;
	}
}

function handleLoadUserThreadsAction( state: StoreData, action: UserThreadsLoadedActions ): StoreData {
	return {
        participant: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
        threads: _.keyBy(action.payload.threads, 'id')
    };
}
