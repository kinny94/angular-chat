import { THREAD_SELECTED_ACTION, SELECT_USER_ACTION, SelectUserAction } from './../actions';
import { UiState } from './../ui-state';

export function uiState( state: UiState, action: any ) : UiState{
	switch( action.type ){
		case THREAD_SELECTED_ACTION:

			const newState = { ...state };
			newState.currentThread = action.payload;
			return newState;

		case SELECT_USER_ACTION:
			return handleSelectUserAction( state, action );
		default:
			return state;
	}
}

const handleSelectUserAction = ( state: UiState, action: SelectUserAction) => {
	const newState = { ...state };
	newState.userId = action.payload;
	newState.currentThread = undefined;
	return newState
}
