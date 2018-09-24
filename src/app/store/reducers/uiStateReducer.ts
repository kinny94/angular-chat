import { THREAD_SELECTED_ACTION } from './../actions';
import { UiState } from './../ui-state';

export function uiState( state: UiState, action: any ) : UiState{
	switch( action.type ){
		case THREAD_SELECTED_ACTION:

			const newState = { ...state };
			newState.currentThread = action.payload;
			return newState;
		default:
			return state;
	}
}
