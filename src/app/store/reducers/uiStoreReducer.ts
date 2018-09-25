import { Message } from 'shared/model/message';
import { Action } from '@ngrx/store';
import { StoreData } from './../store-data';
import { UserThreadsLoadedActions, USER_THREAD_ACTIONS_LOADED, SEND_NEW_MESSAGE_ACTION, SendNewMessageAction } from './../actions';
import * as _ from 'lodash';

const uuid = require('uuid/v4');
export function storeData( state: StoreData, action: Action ) : StoreData {

	switch( action.type ){
		case USER_THREAD_ACTIONS_LOADED:
			return handleLoadUserThreadsAction( state, <any>action )
		case SEND_NEW_MESSAGE_ACTION:
			return  handleSendNewMessageAction( state, <any>action );
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


const handleSendNewMessageAction = ( state: StoreData, action: SendNewMessageAction ) => {
	const newStoreState = { ...state };
	const currentThread = state.threads[ action.payload.threadId ];
	const newMessage: Message = {
		text: action.payload.text,
		threadId: action.payload.threadId,
		timestamp: new Date().getTime(),
		participantId: action.payload.participantId,
		id: uuid()
	}

	currentThread.messageIds.push( newMessage.id );
	newStoreState.messages[ newMessage.id ] = newMessage;
	return newStoreState;
}
