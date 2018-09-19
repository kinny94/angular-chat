import { LoadUserThreadsActions, LOAD_USER_THREADS_ACTION } from './actions';
import { ApplicationState, INITITAL_APPLICATION_STATE } from './application-state';
import { ActionReducerMap } from '@ngrx/store';
import * as _ from 'lodash';

export function storeReducer( state: ApplicationState, action: LoadUserThreadsActions ) : ApplicationState {

	switch( action.type ){
		case LOAD_USER_THREADS_ACTION:
			return handleLoadUserThreadsAction( state, action )
		default:
			return state;
	}
}

function handleLoadUserThreadsAction( state: ApplicationState = INITITAL_APPLICATION_STATE, action: LoadUserThreadsActions ): ApplicationState {
	const userData = action.payload;
	const newState: ApplicationState = Object.assign({}, state );

	newState.storeData = {
		participant: _.keyBy( userData.participants, 'id' ),
		messages: _.keyBy( userData.messages, 'id' ),
		threads: _.keyBy( userData.threads, 'id' )
	}
	return newState;
}


export const reducers: ActionReducerMap<any> = {
	state: storeReducer
};
