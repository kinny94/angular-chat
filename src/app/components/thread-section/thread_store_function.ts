import { ThreadSummaryVM } from './thread-summary.vm';
import { ApplicationState } from './../../store/application-state';
import { Thread } from 'shared/model/thread';

import * as _ from 'lodash';
import { buildThreadParticipantsList } from 'shared/mapping/buildThreadParticipantsList';



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


const deepFreeze = require('deep-freeze-strict');

export function stateToThreadSummariesSelector(state: ApplicationState):ThreadSummaryVM[] {

    const threads = _.values<Thread>(state.storeData.threads);

    return deepFreeze(threads.map(_.partial(mapThreadToThreadSummary, state)));
}


function mapThreadToThreadSummary(state:ApplicationState, thread:Thread): ThreadSummaryVM {

    const lastMessageId = _.last(thread.messageIds),
        lastMessage = state.storeData.messages[lastMessageId];

    return {
        id: thread.id,
        participantNames: buildThreadParticipantsList(state, thread),
        lastMessageText: lastMessage.text,
        timestamp: lastMessage.timestamp,
        read: thread.id === state.uiState.currentThread || thread.participants[state.uiState.userId] === 0
    }
}
